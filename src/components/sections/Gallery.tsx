"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const archives = [
    {
        title: "BUILD IT TOUR 2.0",
        date: "SEP 27, 2025",
        id: "ARCHIVE 01",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600&auto=format&fit=crop&grayscale",
    },
    {
        title: "PRE-EVENT HACKWITHMUMBAI",
        date: "SEP 15, 2025",
        id: "ARCHIVE 02",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop&grayscale",
    },
    {
        title: "HWI ORIENTATION",
        date: "AUG 23, 2025",
        id: "ARCHIVE 03",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop&grayscale",
    },
    {
        title: "HACKWITHMUMBAI HACKATHON",
        date: "SEP 21, 2025",
        id: "ARCHIVE 04",
        image: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=600&auto=format&fit=crop&grayscale",
    },
    {
        title: "LEARN IT TOUR",
        date: "JUL 16, 2025",
        id: "ARCHIVE 05",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf8e5fe?q=80&w=600&auto=format&fit=crop&grayscale",
    },
];

export default function Gallery() {
    return (
        <section className="relative py-20 px-4 md:px-10 bg-black z-20 overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-7xl font-cinematic text-white tracking-wider mb-2">
                        PAST ARCHIVES
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-scarlet to-transparent mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {archives.map((archive, index) => (
                        <div
                            key={index}
                            className="group relative bg-[#0a0a0a] border border-white/10 hover:border-scarlet/50 transition-colors duration-300 overflow-hidden"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-video overflow-hidden">
                                <div className="absolute inset-0 bg-scarlet/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img
                                    src={archive.image}
                                    alt={archive.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                                />
                                {/* Date Badge */}
                                <div className="absolute top-4 right-4 bg-black/90 border border-scarlet px-2 py-1 z-20">
                                    <span className="text-scarlet font-retro text-xs font-bold tracking-widest uppercase">
                                        {archive.date}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl md:text-2xl font-cinematic text-white mb-8 group-hover:text-scarlet transition-colors">
                                    {archive.title}
                                </h3>

                                <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-scarlet/30 transition-colors">
                                    <span className="font-retro text-xs text-gray-500 uppercase tracking-widest">
                                        ID: {archive.id}
                                    </span>
                                    <button className="flex items-center gap-1 text-scarlet text-xs font-bold font-retro uppercase tracking-wider group-hover:gap-2 transition-all">
                                        ACCESS DATA <span className="text-sm">&rsaquo;</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
