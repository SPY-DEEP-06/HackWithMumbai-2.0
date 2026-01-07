"use client";

import { useTheme } from "@/context/ThemeContext";
import { Theme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { Zap, Skull, Globe2 } from "lucide-react";
import gsap from "gsap";

import { useSound } from "@/context/SoundContext";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const { play } = useSound();

    const handleThemeChange = (newTheme: Theme) => {
        if (newTheme === theme) return;

        play("themeSwitch");

        // Cinematic Theme Switch Timeline
        const tl = gsap.timeline();

        // 1. Freeze & Invert
        tl.to("body", { filter: "invert(1) hue-rotate(180deg)", duration: 0.2, ease: "power2.in" })
            .add(() => {
                // 2. Change State Mid-transition
                setTheme(newTheme);
            })
            // 3. Revert & Stabilize
            .to("body", { filter: "invert(0) hue-rotate(0deg)", duration: 0.4, ease: "power2.out", delay: 0.1 });
    };

    return (
        <div className="flex items-center bg-secondary/20 rounded-full p-1 border border-white/10 backdrop-blur-sm">
            <button
                onClick={() => handleThemeChange("stranger")}
                className={`p-2 rounded-full transition-all duration-300 relative ${theme === "stranger" ? "bg-red-900/50 text-red-500 shadow-[0_0_10px_rgba(220,38,38,0.5)]" : "text-muted-foreground hover:text-white"}`}
                aria-label="Upside Down Protocol"
            >
                <Skull size={18} />
                {theme === "stranger" && <motion.div layoutId="activeTheme" className="absolute inset-0 border border-red-500 rounded-full" />}
            </button>

            <button
                onClick={() => handleThemeChange("hybrid")}
                className={`p-2 rounded-full transition-all duration-300 relative ${theme === "hybrid" ? "bg-purple-900/50 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]" : "text-muted-foreground hover:text-white"}`}
                aria-label="Convergence Protocol"
            >
                <Zap size={18} />
                {theme === "hybrid" && <motion.div layoutId="activeTheme" className="absolute inset-0 border border-purple-500 rounded-full" />}
            </button>

            <button
                onClick={() => handleThemeChange("marvel")}
                className={`p-2 rounded-full transition-all duration-300 relative ${theme === "marvel" ? "bg-amber-900/50 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "text-muted-foreground hover:text-white"}`}
                aria-label="Multiverse Interface"
            >
                <Globe2 size={18} />
                {theme === "marvel" && <motion.div layoutId="activeTheme" className="absolute inset-0 border border-amber-500 rounded-full" />}
            </button>
        </div>
    );
}
