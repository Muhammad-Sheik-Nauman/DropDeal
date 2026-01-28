"use server"
import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "../../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/");
}

export async function addProduct(formData) {
    const url = formData.get("url");

    if (!url) {
        return { error: "URL is required" }
    }
    try {
        const supabase = await createClient();
        const {
            data: { user },

        } = await supabase.auth.getUser();
        if (!user) {
            return { error: "Not authentcated" }
        }
        //scrape product data with firecrawl
        const productData = await scrapeProduct(url);
        if (!productData.productName || !productData.currentPrice) {
            console.log(productData, "productData");
            return { error: "Could not extract product information from this URL" };
        }

        const newPricw = parseFloat(productData.currentPrice);
        const currency = productData.currencyCode || "USD";

        const { data: existingProduct } = await supabase.from("products").select("id,current_price")
            .eq("uder_id", user.id)
            .eq("url", url)
            .single();

        const isUpdate = !!existingProduct

        const { data: product, error } = await supabase.from("products").upsert({
            user_id: user.id,
            url,
            name: productData.productName,
            current_price: newPrice,
            currency: currency,
            image_url: productData.productImageUrl,
            updated_at: new Date().toISOString(),
        },
            {
                onConflict: "user_id,url", // Unique constraint on user_id + url
                ignoreDuplicates: false, // Always update if exists
            })
            .select()
            .single();
        if (error) throw error;
        // Add to price history if it's a new product OR price changed
        const shouldAddHistory =
            !isUpdate || existingProduct.current_price !== newPrice;

    } catch (error) {

    }
}