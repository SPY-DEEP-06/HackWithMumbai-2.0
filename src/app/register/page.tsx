"use client";

import Navbar from "@/components/common/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RegistrationForm from "@/components/registration/RegistrationForm"; // Will create next

export default function RegisterPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login"); // Redirect if not logged in
        }
    }, [user, loading, router]);

    if (loading || !user) return <div className="h-screen bg-black flex items-center justify-center text-primary animate-pulse">AUTHENTICATING...</div>;

    return (
        <main className="min-h-screen pb-20 overflow-x-hidden">
            <Navbar />
            <div className="pt-24 container mx-auto px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center text-primary uppercase tracking-widest text-glow">
                    Operative Registration
                </h1>
                <RegistrationForm user={user} />
            </div>
        </main>
    );
}
