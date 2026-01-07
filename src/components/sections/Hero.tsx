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
            <div className="relative mb-8 group">
                <h2 className="text-loki font-retro tracking-[0.3em] text-lg md:text-xl border border-loki/30 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full shadow-[0_0_20px_rgba(0,255,65,0.2)] group-hover:shadow-[0_0_35px_rgba(0,255,65,0.4)] transition-all duration-500">
                    &lt; NATIONAL LEVEL HACKATHON /&gt;
                </h2>
            </div>

            <div className="relative px-4 py-2">
                <h1
                    className="text-fluid-h1 font-cinematic font-bold text-white relative z-10 glitch-text break-words drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
                    data-text="HACKWITHMUMBAI 2.0"
                >
                    HACKWITHMUMBAI 2.0
                </h1>
                <div className="absolute -inset-10 bg-gradient-to-r from-scarlet/20 via-transparent to-loki/20 blur-3xl opacity-30 animate-pulse pointer-events-none"></div>
            </div>

            <p className="max-w-xl mx-auto text-gray-200 mt-8 text-lg md:text-2xl font-light tracking-wide drop-shadow-md">
                Enter the Multiverse. Build the Future. Disrupt Reality.
            </p>

            <CountdownTimer />

            <div className="flex flex-col md:flex-row gap-6 mt-16 z-20">
                <Link
                    href="https://unstop.com/o/bXKrsvy?lb=0AZaud6X&utm_medium=Share&utm_source=deepagho48277&utm_campaign=Online_coding_challenge"
                    className="group relative px-12 py-5 bg-transparent inline-block min-w-max transition-transform hover:scale-105 duration-500"
                >
                    {/* Stranger Things Red Glow Container */}
                    <div className="absolute inset-0 border border-[#ff1100] rounded hover:rounded-xl shadow-[0_0_20px_rgba(255,17,0,0.4),inset_0_0_10px_rgba(255,17,0,0.1)] group-hover:shadow-[0_0_40px_rgba(255,17,0,0.6),inset_0_0_20px_rgba(255,17,0,0.2)] transition-all duration-500 bg-black/90 backdrop-blur-md"></div>

                    {/* Text content */}
                    <div className="relative z-10 flex items-center justify-center px-4">
                        <span className="font-cinematic font-bold tracking-[0.2em] text-sm md:text-2xl text-white drop-shadow-[0_0_5px_rgba(255,0,0,0.5)] group-hover:text-[#ff1100] group-hover:drop-shadow-[0_0_15px_rgba(255,0,0,1)] transition-all duration-300 uppercase whitespace-nowrap pt-1">
                            Start Registration
                        </span>
                    </div>
                </Link>

                <Link
                    href="https://chat.whatsapp.com/G6MasRM8AK08WJq7KDifNq"
                    className="group relative px-12 py-5 bg-transparent inline-block min-w-max transition-transform hover:scale-105 duration-500"
                >
                    {/* Loki/Time Stone Green Glow Container */}
                    <div className="absolute inset-0 border border-[#00ff41] rounded hover:rounded-xl shadow-[0_0_20px_rgba(0,255,65,0.3),inset_0_0_10px_rgba(0,255,65,0.1)] group-hover:shadow-[0_0_40px_rgba(0,255,65,0.5),inset_0_0_20px_rgba(0,255,65,0.2)] transition-all duration-500 bg-black/90 backdrop-blur-md"></div>

                    <span className="relative z-10 flex items-center justify-center gap-3 px-4">
                        <span className="font-cinematic font-bold tracking-[0.2em] text-sm md:text-2xl text-white drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] group-hover:text-[#00ff41] group-hover:drop-shadow-[0_0_15px_rgba(0,255,65,1)] transition-all duration-300 uppercase whitespace-nowrap pt-1">
                            JOIN COMMUNITY
                        </span>
                        {/* Animated Portal Icon */}
                        <svg className="w-6 h-6 text-white group-hover:text-[#00ff41] group-hover:rotate-180 transition-all duration-700 filter drop-shadow-[0_0_5px_#00ff41]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" strokeWidth="2" strokeDasharray="4 4" className="animate-[spin_4s_linear_infinite]" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m-4-4h8" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </svg>
                    </span>
                </Link>
            </div>

        </section>
    );
}
