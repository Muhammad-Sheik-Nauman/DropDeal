import { createClient } from "@/utils/supabase/client";

export async function GET(request) {
    const {searchPrams} = new URL(request.url);
    const code = SearchParamsContext.get("code");

    if(code){
        const supabase = await createClient();
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(new URL("/",request.url))
}