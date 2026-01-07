"use client";

import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { AlertTriangle, Lock } from "lucide-react";
import Navbar from "@/components/common/Navbar";

export default function LoginPage() {
    const { signInWithGoogle, loading } = useAuth();

    return (
        <main className="min-h-screen flex flex-col relative overflow-hidden">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md bg-black/60 border border-primary/40 p-8 rounded-lg backdrop-blur-md relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />

                    <div className="text-center mb-8">
                        <Lock className="mx-auto text-primary mb-4 w-12 h-12" />
                        <h1 className="text-2xl font-bold uppercase tracking-widest text-primary">Restricted Access</h1>
                        <p className="text-muted-foreground mt-2 font-mono text-sm">
                            Authentication required to access the Registration Protocol.
                        </p>
                    </div>

                    <button
                        onClick={signInWithGoogle}
                        disabled={loading}
                        className="w-full bg-primary/20 hover:bg-primary/30 border border-primary text-primary-foreground font-bold py-4 rounded uppercase tracking-widest transition-all group relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            <span className="group-hover:animate-pulse">Authenticate with Google</span>
                        </span>
                        <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>

                    <div className="mt-6 text-xs text-center text-muted-foreground font-mono flex items-center justify-center gap-2">
                        <AlertTriangle size={12} className="text-yellow-500" />
                        <span>LEVEL 5 SECURITY CLEARANCE REQUIRED</span>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
