"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useSound } from "@/context/SoundContext";

interface StartupLoaderProps {
    onComplete: () => void;
}

export default function StartupLoader({ onComplete }: StartupLoaderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const portalRef = useRef<HTMLDivElement>(null);
    const { play } = useSound();

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: onComplete
        });

        // 0.2s: System Text Fades In
        tl.to(textRef.current, { opacity: 1, duration: 0.4, delay: 0.2, onStart: () => play("startup") })
            // 0.6s: Glitch Distortion
            .to(textRef.current, { skewX: 20, duration: 0.1, ease: "steps(2)", onStart: () => play("glitch") })
            .to(textRef.current, { skewX: 0, duration: 0.1, ease: "steps(2)" })
            .to(textRef.current, { opacity: 0, duration: 0.2, delay: 0.2 })

            // 1.0s: Portal Ring Forms
            .to(portalRef.current, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", onStart: () => play("portal") })

            // 1.8s: Portal Opens (Zooms in to cover screen)
            .to(portalRef.current, { scale: 50, duration: 0.8, ease: "power4.in" })
            .to(containerRef.current, { opacity: 0, duration: 0.2 }, "-=0.4");

        return () => {
            tl.kill();
        };
    }, [onComplete, play]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[100] h-screen w-full bg-black flex items-center justify-center overflow-hidden">
            <h1
                ref={textRef}
                className="text-4xl md:text-6xl font-black text-white tracking-widest uppercase opacity-0 font-mono"
                style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.8)" }}
            >
                Initialize Protocol...
            </h1>

            <div
                ref={portalRef}
                className="absolute w-32 h-32 rounded-full border-4 border-white opacity-0 shadow-[0_0_50px_rgba(255,255,255,0.8)]"
                style={{ transform: "scale(0)" }}
            ></div>
        </div>
    );
}
