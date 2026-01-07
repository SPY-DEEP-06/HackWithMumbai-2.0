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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="aspect-video bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg overflow-hidden relative group cursor-pointer hover:border-primary/50 transition-all shadow-lg"
                    >
                        {/* Placeholder Content */}
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat transition-[background-position_0s] duration-0 group-hover:bg-[position:200%_0,0_0] group-hover:duration-[1500ms]"></div>

                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center">
                                <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                            </div>
                            <span className="font-mono text-[10px] tracking-widest text-primary">[ENCRYPTED_FILE]</span>
                        </div>

                        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end border-t border-white/10 pt-2">
                            <span className="text-[10px] text-gray-500 font-mono">IMG_LOG_{String(img).padStart(3, '0')}</span>
                            <span className="text-[10px] text-primary/50 font-mono">:: RESTRICTED</span>
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
