"use client";

import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const themes = [
        { id: "stranger", icon: Moon, label: "Stranger", color: "text-red-600" },
        { id: "hybrid", icon: Zap, label: "Hybrid", color: "text-blue-500" },
        { id: "marvel", icon: Sun, label: "Marvel", color: "text-purple-500" },
    ] as const;

    return (
        <div className="flex bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-1 gap-1">
            {themes.map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`relative px-3 py-1.5 rounded-full text-xs font-bold transition-all ${theme === t.id ? "text-white" : "text-gray-500 hover:text-gray-300"
                        }`}
                >
                    {theme === t.id && (
                        <motion.div
                            layoutId="activeTheme"
                            className={`absolute inset-0 bg-white/10 rounded-full border border-white/20`}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        <t.icon size={12} className={theme === t.id ? t.color : ""} />
                        <span className="hidden md:inline">{t.label}</span>
                    </span>
                </button>
            ))}
        </div>
    );
}
