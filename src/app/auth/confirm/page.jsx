"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmPage() {
    const router = useRouter();

    useEffect(() => {
        // Refresh the router to pick up the new session cookies
        router.refresh();
        // Redirect to home page
        router.push("/");
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Completing sign in...</p>
            </div>
        </div>
    );
}
