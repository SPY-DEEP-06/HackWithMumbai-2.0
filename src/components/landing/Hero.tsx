"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CountdownTimer from "./CountdownTimer";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
    const { theme } = useTheme();

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 pt-32 overflow-hidden">
            {/* Background Ambience handled by globals and theme context, but we can add specific hero layers */}

            <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-b from-transparent via-primary/10 to-background pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="z-10 max-w-5xl w-full"
            >
                <h2 className="text-lg md:text-xl font-bold tracking-[0.5em] text-accent mb-4 uppercase">
                    Initialize Protocol...
                </h2>

                <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-2 text-glow leading-none">
                    <span className="block text-stroke-sm md:text-stroke-lg text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                        HACKWITH
                    </span>
                    <span className="block text-primary">MUMBAI 2.0</span>
                </h1>

                <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
                    National Level Hackathon | 30 Hour Sprint
                </p>

                <CountdownTimer />

                <div className="flex flex-col md:flex-row gap-6 justify-center mt-12 items-center">
                    <Link href="/register">
                        <button className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold text-lg uppercase tracking-widest overflow-hidden rounded-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(var(--primary),0.6)]">
                            <span className="relative z-10">Start Registration</span>
                            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                        </button>
                    </Link>

                    <Link href="/dashboard">
                        <button className="px-8 py-4 border border-white/20 hover:border-accent hover:text-accent bg-transparent backdrop-blur-sm text-foreground font-bold text-lg uppercase tracking-widest rounded-sm transition-all hover:bg-accent/10">
                            Join Community
                        </button>
                    </Link>
                </div>

                <div className="mt-16 text-sm text-muted-foreground font-mono">
                    <p className="opacity-70">
                        Authorized By: HackWithIndia BVUDET NM Chapter
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
