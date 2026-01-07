"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User as UserIcon } from "lucide-react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10 py-2" : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter text-glow group">
                    HWM<span className="text-primary group-hover:animate-pulse">2.0</span>
                </Link>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground mr-4">
                        <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                        <Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
                        <Link href="/rules" className="hover:text-primary transition-colors">Protocol</Link>
                    </div>
                    <ThemeToggle />

                    {user ? (
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard">
                                <button className="flex items-center gap-2 bg-secondary/30 hover:bg-secondary/50 border border-secondary text-secondary-foreground px-3 py-1.5 rounded text-sm font-bold transition-all">
                                    <UserIcon size={14} />
                                    <span className="hidden sm:inline">DASHBOARD</span>
                                </button>
                            </Link>
                            <button onClick={logout} className="text-muted-foreground hover:text-red-500 transition-colors" aria-label="Logout">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link href="/register" className="ml-2 hidden md:block">
                            <button className="bg-primary/20 hover:bg-primary/40 text-primary border border-primary px-4 py-1.5 rounded text-sm font-bold transition-all shadow-[0_0_10px_rgba(255,0,0,0.2)] hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                                JOIN_MISSION
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </motion.nav>
    );
}
