"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section id="about" className="min-h-screen py-20 px-8 flex items-center justify-center relative bg-black/80">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none"></div>
            <div className="max-w-4xl text-center z-10">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl font-bold mb-8 text-primary uppercase tracking-widest"
                >
                    Mission Briefing
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground leading-relaxed glass-panel p-8 rounded-lg"
                >
                    <p className="mb-6">
                        <span className="text-accent font-bold">HACKWITHMUMBAI 2.0</span> is not just a hackathon. It is a convergence of the brightest minds across the multiverse.
                        Operatives are tasked with solving critical anomalies in the fabric of technology.
                    </p>
                    <p>
                        From <span className="text-secondary-foreground font-semibold">AI/ML</span> to <span className="text-secondary-foreground font-semibold">Web3</span>,
                        your skills will be tested in a 30-hour sprint against time itself.
                        The protocol has been initialized. Are you ready?
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
