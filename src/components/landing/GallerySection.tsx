"use client";

import { motion } from "framer-motion";

export default function GallerySection() {
    const images = [1, 2, 3, 4, 5, 6, 7, 8]; // Placeholders

    return (
        <section id="gallery" className="py-20 px-8 container mx-auto relative">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none"></div>

            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-bold mb-12 text-center text-primary uppercase tracking-widest text-glow"
            >
                Mission Archives
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="aspect-video bg-black/50 border border-white/10 rounded-lg overflow-hidden relative group cursor-pointer hover:border-primary/50 transition-all"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-primary font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">
                            [ACCESS_GRANTED]
                        </div>
                        <div className="absolute bottom-2 left-2 text-[10px] text-gray-500 font-mono">
                            IMG_LOG_{String(img).padStart(3, '0')}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-12">
                <button className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary">
                    VIEW COMPLETE DATABASE +
                </button>
            </div>
        </section>
    );
}
