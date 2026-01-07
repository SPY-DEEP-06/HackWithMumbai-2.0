"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date("2026-02-07T09:00:00+05:30").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex gap-3 md:gap-8 font-retro text-tva text-xl md:text-4xl mt-6 md:mt-8 flex-wrap justify-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center min-w-[60px] md:min-w-[80px]">
                    <div className="bg-black/80 border border-tva/50 p-2 md:p-4 rounded shadow-[0_0_10px_rgba(255,140,0,0.3)] backdrop-blur-sm w-full">
                        <span className="font-bold">{String(value).padStart(2, '0')}</span>
                    </div>
                    <span className="text-[10px] md:text-sm uppercase tracking-widest text-white/60 mt-2">{unit}</span>
                </div>
            ))}
        </div>
    );
}

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-4 overflow-hidden z-10">

            {/* Glitch Overlay for Text */}
            <h2 className="text-loki font-retro tracking-widest text-lg md:text-xl mb-4 animate-pulse">
                &lt; NATIONAL LEVEL HACKATHON /&gt;
            </h2>

            <div className="relative px-4">
                <h1 className="text-fluid-h1 font-cinematic font-bold text-white relative z-10 mix-blend-difference text-shadow-multiverse break-words">
                    HACKWITHMUMBAI 2.0
                </h1>
                {/* Pseudo-element style glitches */}
                <h1 className="absolute top-0 left-0 w-full text-fluid-h1 font-cinematic font-bold text-scarlet opacity-50 animate-glitch z-0 blur-[1px] select-none pointer-events-none break-words">
                    HACKWITHMUMBAI 2.0
                </h1>
            </div>

            <p className="max-w-xl mx-auto text-gray-300 mt-6 text-lg md:text-xl font-light">
                Enter the Multiverse. Build the Future. Disrupt Reality.
            </p>

            <CountdownTimer />

            <div className="flex flex-col md:flex-row gap-6 mt-12">
                <Link
                    href="https://unstop.com/o/bXKrsvy?lb=0AZaud6X&utm_medium=Share&utm_source=deepagho48277&utm_campaign=Online_coding_challenge"
                    className="group relative px-8 py-4 bg-scarlet text-white font-bold font-cinematic tracking-wider overflow-hidden hover:scale-105 transition-transform"
                >
                    <span className="relative z-10 uppercase">Start Registration</span>
                    <div className="absolute inset-0 bg-black/20 group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute inset-0 border-2 border-white scale-110 group-hover:scale-100 transition-transform duration-300"></div>
                </Link>

                <Link
                    href="https://chat.whatsapp.com/G6MasRM8AK08WJq7KDifNq"
                    className="group relative px-8 py-4 bg-transparent border border-loki text-loki font-bold font-cinematic tracking-wider hover:bg-loki/10 transition-colors"
                >
                    <span className="flex items-center gap-2">
                        <span>JOIN COMMUNITY</span>
                        {/* Simple Portal Icon SVG */}
                        <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="4 4" />
                        </svg>
                    </span>
                </Link>
            </div>

        </section>
    );
}
