"use client";

import { motion } from "framer-motion";
import { FileText, ShieldAlert } from "lucide-react";

export default function RulesSection() {
    return (
        <section id="rules" className="py-20 px-4 md:px-8 container mx-auto text-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-primary/5 to-black -z-10"></div>

            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold mb-8 text-primary uppercase tracking-widest text-glow"
            >
                The Protocol
            </motion.h1>

            <div className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed mb-12 font-mono border-l-2 border-primary/50 pl-6 text-left">
                <p className="mb-4">
            // SYSTEM_MESSAGE:
                    You are entering a controlled environment. The anomalies detected in the Mumbai sector require immediate intervention.
                </p>
                <p>
                    Adherence to the following directives is mandatory for all operatives. Deviation will result in immediate disqualification and dimensional exile.
                </p>
            </div>

            <div className="grid gap-6 max-w-4xl mx-auto text-left">
                {[
                    "Team Size: 2 to 4 Operatives strictly.",
                    "All code must be written during the 30-hour sprint.",
                    "Pre-written modules must be declared during inspection.",
                    "Any sabotage of other operatives' equipment is grounds for immediate termination.",
                    "Respect the venue and the timeline.",
                ].map((rule, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-secondary/10 border border-secondary/30 p-4 rounded flex items-start gap-4 hover:bg-secondary/20 transition-colors group"
                    >
                        <ShieldAlert className="text-accent shrink-0 mt-1 group-hover:animate-pulse" />
                        <div>
                            <h3 className="font-bold text-foreground mb-1">Directive {String(i + 1).padStart(2, '0')}</h3>
                            <p className="text-muted-foreground">{rule}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-16"
            >
                <a href="/Rulebook.pdf" download className="inline-block"> {/* Placeholder link */}
                    <button className="bg-primary/20 hover:bg-primary/30 border border-primary text-primary-foreground px-8 py-3 rounded uppercase font-bold tracking-widest flex items-center gap-2 mx-auto transition-all group shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                        <FileText size={20} />
                        Download Full Dossier
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </a>
            </motion.div>
        </section>
    );
}
