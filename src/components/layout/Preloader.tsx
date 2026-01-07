"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [text, setText] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    const messages = [
        "Initialize Protocol...",
        "Loading Timeline...",
        "Buffering Reality...",
        "Access Granted."
    ];

    useEffect(() => {
        let currentMessageIndex = 0;
        let charIndex = 0;
        let timeout: NodeJS.Timeout;

        const typeWriter = () => {
            if (currentMessageIndex >= messages.length) {
                // Fade out
                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 1,
                    onComplete: onComplete
                });
                return;
            }

            const currentMessage = messages[currentMessageIndex];

            if (charIndex < currentMessage.length) {
                // Safe way to set text without relying on previous state accumulation potentially missing a beat
                setText(currentMessage.substring(0, charIndex + 1));
                charIndex++;
                timeout = setTimeout(typeWriter, 50); // Typing speed
            } else {
                // Pause between messages
                timeout = setTimeout(() => {
                    setText("");
                    charIndex = 0;
                    currentMessageIndex++;
                    typeWriter();
                }, 800);
            }
        };

        typeWriter();

        return () => clearTimeout(timeout);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div ref={containerRef} className="fixed inset-0 z-50 flex items-center justify-center bg-black font-retro text-loki text-xl md:text-2xl crt">
            <div className="w-full max-w-2xl p-8 border-2 border-tva rounded bg-black/80 shadow-[0_0_20px_rgba(255,140,0,0.5)]">
                <div className="flex justify-between mb-4 border-b border-tva/50 pb-2">
                    <span>TVA SYSTEM TERMINAL v2.0</span>
                    <span className="animate-pulse">ONLINE</span>
                </div>
                <div className="h-32">
                    <p className="whitespace-pre-wrap leading-relaxed">
                        <span className="text-scarlet">{">"}</span> {text}<span className="animate-flicker">_</span>
                    </p>
                </div>
                <div className="mt-4 h-1 w-full bg-gray-900 rounded overflow-hidden">
                    <div className="h-full bg-tva animate-[width_3s_ease-out_forwards] w-full"></div>
                </div>
            </div>
        </div>
    );
}
