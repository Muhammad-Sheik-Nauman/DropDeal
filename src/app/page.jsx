import { Button } from "@/components/ui/button";
import { Rabbit,Shield,Bell } from "lucide-react";
import Image from "next/image";
import AddProductForm from "@/components/AddProductForm";
import AuthButton from "@/components/AuthButton";
import { createClient } from "../../utils/supabase/server";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  console.log("User in page.jsx:", user ? user.email : "No user");

  const products=[];
  const FEATURES = [
    {
      icon: Rabbit,
      title: "Lightning Fast",
      description:
        "Deal Drop extracts prices in seconds, handling JavaScript and dynamic content",
    },
    {
      icon: Shield,
      title: "Always Reliable",
      description:
        "Works across all major e-commerce sites with built-in anti-bot protection",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Get notified instantly when prices drop below your target",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4  flex  justify-self-start gap-10  items-center">
          <div className="flex items-center gap-3">
            <Image
            src={"/drop-deal-logo.png"}
            alt="Drop deal logo"
            width={600}
            height={200}
            className="h-10 w-auto"
            />
          </div>
          {/* auth button */}
          <AuthButton user={user}/>
        </div>
      </header>
      <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounde
      rounded-full text-sm font-medium mb-6">
        Designed and Built by Nauman</div>
      <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">Never miss a Price Drop</h2>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        track prices from any e-commerce site.Get instant alerts when price drop,Save money effortlessly
      </p>
      {/* product form */}
      <AddProductForm user={user}/>


      {/* features */}
      {products.length === 0 && (
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          {FEATURES.map(({
            icon:Icon,title,description})=>
            (
            <div key={title}
            className="bg-white p-6 rounded-xl border border-gray-200"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Icon className="w-6 h-6 text-orange-500"/>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>

            ))}
          </div>
      )}
      </div>
      </section>
    </main>
  );
}
