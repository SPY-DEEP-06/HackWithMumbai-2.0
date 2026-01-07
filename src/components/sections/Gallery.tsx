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
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (section && triggerRef.current) {
            const totalPanels = archives.length + 1; // Title + Images
            const pin = gsap.fromTo(section,
                { translateX: 0 },
                {
                    translateX: `-${(totalPanels - 1) * 100}vw`,
                    ease: "none",
                    duration: 1,
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: `${totalPanels * 1000} top`,
                        scrub: 0.6,
                        pin: true,
                    }
                }
            );
            return () => {
                pin.kill();
            };
        }
    }, []);

    return (
        <section className="overflow-hidden bg-black relative z-20">
            <div ref={triggerRef}>
                <div
                    ref={sectionRef}
                    className="h-screen flex flex-row relative"
                    style={{ width: `${(archives.length + 1) * 100}vw` }}
                >

                    {/* Title Panel */}
                    <div className="w-screen h-full flex flex-col items-center justify-center px-4 md:px-20 border-r border-white/10 relative text-center">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                        <h2 className="text-5xl md:text-7xl font-cinematic text-transparent bg-clip-text bg-gradient-to-r from-tva to-scarlet mb-4 md:mb-8 font-bold tracking-wider">
                            PAST ARCHIVES
                        </h2>
                        <p className="font-retro text-base md:text-xl text-gray-400 px-4">
                            Recovered footage from previous timelines.
                        </p>
                        <div className="mt-8 md:mt-12 animate-bounce text-loki text-sm md:text-base">
                            Scroll to Access Database &rarr;
                        </div>
                    </div>

                    {/* Archive Panels */}
                    {archives.map((archive, index) => (
                        <div key={index} className="w-screen h-full flex items-center justify-center p-4 md:p-20 border-r border-white/5 relative bg-[#050505]">

                            {/* Card Container */}
                            <div className="group relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 hover:border-scarlet/50 transition-all duration-500 overflow-hidden flex flex-col md:flex-row h-[70vh] md:h-[60vh]">

                                {/* Image Half */}
                                <div className="relative w-full md:w-2/3 h-1/2 md:h-full overflow-hidden">
                                    <div className="absolute inset-0 bg-scarlet/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <img
                                        src={archive.image}
                                        alt={archive.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/90 border border-scarlet px-2 py-1 z-20">
                                        <span className="text-scarlet font-retro text-xs font-bold tracking-widest uppercase">
                                            {archive.date}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Half */}
                                <div className="w-full md:w-1/3 h-1/2 md:h-full p-6 md:p-8 flex flex-col justify-between relative bg-dotted-spacing-4 bg-dotted-white/[0.05]">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-cinematic text-white mb-4 group-hover:text-scarlet transition-colors leading-tight">
                                            {archive.title}
                                        </h3>
                                        <div className="w-12 h-1 bg-white/20 group-hover:bg-scarlet transition-colors mb-6"></div>
                                        <p className="font-retro text-xs text-gray-500 leading-relaxed">
                                            &gt; ACCESSING_MEMORY_BLOCK...<br />
                                            &gt; DECRYPTING_VISUALS...<br />
                                            &gt; STATUS: RESTORED
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-white/10">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="font-retro text-xs text-gray-600 uppercase tracking-widest">
                                                ID: {archive.id}
                                            </span>
                                        </div>
                                        <button className="w-full py-3 bg-white/5 border border-white/10 text-white font-retro text-xs uppercase tracking-widest hover:bg-scarlet hover:border-scarlet transition-all group-hover:shadow-[0_0_15px_rgba(255,42,42,0.3)]">
                                            ACCESS DATA
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
