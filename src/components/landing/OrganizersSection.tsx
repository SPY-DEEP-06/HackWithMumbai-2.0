"use client";

import { motion } from "framer-motion";

const ORGANIZERS = [
    { name: "Agent Alpha", role: "Mission Commander", color: "border-red-600" },
    { name: "Agent Beta", role: "Tech Lead", color: "border-blue-600" },
    { name: "Agent Gamma", role: "Ops Lead", color: "border-purple-600" },
    { name: "Agent Delta", role: "Intel Officer", color: "border-yellow-500" },
];

export default function OrganizersSection() {
    return (
        <section id="organizers" className="py-20 px-8 bg-black/90 relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(var(--primary),0.1),transparent)] pointer-events-none"></div>

            <div className="container mx-auto">
                <h2 className="text-4xl font-bold mb-16 text-center text-white tracking-widest uppercase">
                    Ops Command
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ORGANIZERS.map((org, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`bg-white/5 border-l-4 ${org.color} p-6 rounded-r-lg hover:bg-white/10 transition-colors group`}
                        >
                            <div className="w-20 h-20 rounded-full bg-gray-800 mb-4 mx-auto overflow-hidden relative border-2 border-white/20 group-hover:border-white transition-colors">
                                {/* Placeholder for organizer image */}
                                <div className="absolute inset-0 flex items-center justify-center text-2xl font-mono text-muted-foreground">
                                    {org.name[0]} {org.name.split(" ")[1][0]}
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-center text-white mb-1 group-hover:text-glow transition-all">{org.name}</h3>
                            <p className="text-sm text-center text-muted-foreground uppercase font-mono">{org.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
