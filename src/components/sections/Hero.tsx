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
                <h1
                    className="text-fluid-h1 font-cinematic font-bold text-white relative z-10 glitch-text break-words"
                    data-text="HACKWITHMUMBAI 2.0"
                >
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
                    className="group relative px-12 py-5 bg-transparent inline-block min-w-max transition-transform hover:scale-105 duration-500"
                >
                    {/* Stranger Things Red Glow Container */}
                    <div className="absolute inset-0 border-2 border-[#ff1100] rounded-sm shadow-[0_0_15px_rgba(255,17,0,0.5),inset_0_0_10px_rgba(255,17,0,0.2)] group-hover:shadow-[0_0_30px_rgba(255,17,0,0.8),inset_0_0_20px_rgba(255,17,0,0.4)] transition-shadow duration-500 bg-black/80 backdrop-blur-sm"></div>

                    {/* Atmospheric Fog Effect inside button */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 mix-blend-color-dodge"></div>

                    {/* Text content */}
                    <div className="relative z-10 flex items-center justify-center px-4">
                        <span className="font-cinematic font-bold tracking-[0.2em] text-sm md:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-[#ff4433] to-[#990000] drop-shadow-[0_0_8px_rgba(255,0,0,0.8)] group-hover:drop-shadow-[0_0_15px_rgba(255,0,0,1)] transition-all duration-300 uppercase whitespace-nowrap pt-1">
                            Start Registration
                        </span>
                    </div>

                    {/* Upside Down Particles (Corner flickers) */}
                    <div className="absolute top-0 right-0 w-2 h-2 bg-[#ff1100] rounded-full shadow-[0_0_10px_#ff1100] opacity-0 group-hover:opacity-100 animate-ping"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#ff1100] rounded-full shadow-[0_0_10px_#ff1100] opacity-0 group-hover:opacity-100 animate-ping delay-300"></div>
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
