"use client";

import Navbar from "@/components/common/Navbar";
import { motion } from "framer-motion";

export default function GalleryPage() {
    const images = [1, 2, 3, 4, 5, 6, 7, 8]; // Placeholders

    return (
        <main className="min-h-screen pb-20">
            <Navbar />

            <section className="pt-32 pb-16 px-8 container mx-auto">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-4xl md:text-6xl font-bold mb-12 text-center text-primary uppercase tracking-widest"
                >
                    Mission Archives
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="aspect-video bg-secondary/20 border border-secondary/30 rounded-lg overflow-hidden relative group cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-all duration-500"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">
                                [CLASSIFIED_IMAGE_{String(img).padStart(3, '0')}]
                            </div>
                            {/* In production, use next/image here */}
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
