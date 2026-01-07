"use client";

import { motion } from "framer-motion";

const STATS = [
    { label: "Operatives", value: "500+" },
    { label: "Bounty", value: "₹1.5L" },
    { label: "Sprint Time", value: "30 HRS" },
    { label: "Universes", value: "∞" },
];

export default function StatsSection() {
    return (
        <section className="py-20 bg-background border-y border-white/10 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-mono text-accent mb-12 text-center uppercase tracking-widest before:content-['//_'] before:mr-2">
                    System Intel
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="text-center p-6 bg-secondary/20 border border-secondary/30 rounded cursor-crosshair hover:bg-secondary/30 transition-colors"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-2 text-glow">{stat.value}</div>
                            <div className="text-sm md:text-base text-muted-foreground uppercase font-mono">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
