"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
    "https://placehold.co/600x400/101010/ff8c00?text=Event+Highlight+1",
    "https://placehold.co/600x400/101010/00ff41?text=Event+Highlight+2",
    "https://placehold.co/600x400/101010/ff2a2a?text=Event+Highlight+3",
    "https://placehold.co/600x400/101010/ededed?text=Event+Highlight+4",
    "https://placehold.co/600x400/101010/ff8c00?text=Event+Highlight+5",
];

export default function Gallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;

        if (section && triggerRef.current) {
            const pin = gsap.fromTo(section,
                { translateX: 0 },
                {
                    translateX: "-300vw",
                    ease: "none",
                    duration: 1,
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: "2000 top",
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
        <section className="overflow-hidden bg-darkhold relative z-20">
            <div ref={triggerRef}>
                <div ref={sectionRef} className="h-screen w-[400vw] flex flex-row relative">

                    {/* Title Panel */}
                    <div className="w-screen h-full flex flex-col items-center justify-center px-4 md:px-20 border-r border-white/10 relative text-center">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                        <h2 className="text-fluid-h1 font-cinematic text-transparent bg-clip-text bg-gradient-to-r from-tva to-scarlet mb-4 md:mb-8 break-words max-w-full">
                            THE ARCHIVES
                        </h2>
                        <p className="font-retro text-base md:text-xl text-gray-400 px-4">
                            Recovered footage from previous timelines.
                        </p>
                        <div className="mt-8 md:mt-12 animate-bounce text-loki text-sm md:text-base">
                            Scroll to Explore &rarr;
                        </div>
                    </div>

                    {/* Image Panels */}
                    {images.map((src, index) => (
                        <div key={index} className="w-screen h-full flex items-center justify-center p-4 md:p-20 border-r border-white/5 relative">
                            <div className="relative group w-full max-w-4xl aspect-video transform transition-transform hover:scale-105 duration-500">
                                <div className="absolute inset-0 bg-scarlet blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <img
                                    src={src}
                                    alt={`Archive ${index + 1}`}
                                    className="relative w-full h-full object-cover rounded-sm border-2 border-white/10 group-hover:border-tva transition-colors"
                                />
                                <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 font-retro text-tva text-xs md:text-sm bg-black/80 px-2 py-1">
                                    IMG_SEQ_00{index + 1}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
