"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
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

            {/* Organizer Logo - Top Left */}
            <div className="absolute top-4 left-4 z-50 md:top-8 md:left-8">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <img
                        src="/organizer_logo.jpg"
                        alt="Organizing Committee"
                        className="relative w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-red-500/50 shadow-[0_0_15px_rgba(255,0,0,0.5)] animate-pulse-slow"
                    />
                </div>
            </div>

            {/* Live Registration Indicator */}
            <div className="absolute top-5 md:top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 animate-pulse">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ff0000] shadow-[0_0_10px_#ff0000] animate-ping"></div>
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ff0000] shadow-[0_0_10px_#ff0000] absolute ml-0"></div>
                <span className="font-retro text-[10px] md:text-xs text-[#ff0000] tracking-[0.2em] shadow-[#ff0000] drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">
                    LIVE REGISTRATION
                </span>
            </div>

            {/* Glitch Overlay for Text */}
            <div className="relative mb-8 group mt-20 md:mt-0">
                <h2 className="text-loki font-retro tracking-[0.2em] text-[10px] md:text-xs border border-loki/30 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,255,65,0.2)] group-hover:shadow-[0_0_25px_rgba(0,255,65,0.4)] transition-all duration-500">
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
                    className="group relative px-6 md:px-10 py-3 md:py-4 bg-transparent inline-block min-w-max transition-all duration-300 transform hover:scale-105"
                >
                    {/* Stranger Things Red Glow Container */}
                    <div className="absolute inset-0 border border-[#ff1100]/80 rounded hover:rounded-lg shadow-[0_0_15px_rgba(255,17,0,0.3),inset_0_0_5px_rgba(255,17,0,0.1)] group-hover:shadow-[0_0_30px_rgba(255,17,0,0.6),inset_0_0_15px_rgba(255,17,0,0.3)] transition-all duration-300 bg-black/80 backdrop-blur-md"></div>

                    {/* Text content */}
                    <div className="relative z-10 flex items-center justify-center px-2">
                        <span className="font-cinematic font-bold tracking-[0.15em] text-sm md:text-xl text-white/90 drop-shadow-[0_0_5px_rgba(255,0,0,0.5)] group-hover:text-[#ff1100] group-hover:tracking-[0.2em] transition-all duration-300 uppercase whitespace-nowrap pt-1">
                            Start Registration
                        </span>
                    </div>
                </Link>

                <Link
                    href="https://chat.whatsapp.com/G6MasRM8AK08WJq7KDifNq"
                    className="group relative px-6 md:px-10 py-3 md:py-4 bg-transparent inline-block min-w-max transition-all duration-300 transform hover:scale-105"
                >
                    {/* Loki/Time Stone Green Glow Container */}
                    <div className="absolute inset-0 border border-[#00ff41]/80 rounded hover:rounded-lg shadow-[0_0_15px_rgba(0,255,65,0.3),inset_0_0_5px_rgba(0,255,65,0.1)] group-hover:shadow-[0_0_30px_rgba(0,255,65,0.5),inset_0_0_15px_rgba(0,255,65,0.2)] transition-all duration-300 bg-black/80 backdrop-blur-md"></div>

                    <span className="relative z-10 flex items-center justify-center gap-3 px-2">
                        <span className="font-cinematic font-bold tracking-[0.15em] text-sm md:text-xl text-white/90 drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] group-hover:text-[#00ff41] group-hover:tracking-[0.2em] transition-all duration-300 uppercase whitespace-nowrap pt-1">
                            JOIN COMMUNITY
                        </span>
                        <MessageCircle className="w-5 h-5 text-white/90 group-hover:text-[#00ff41] group-hover:rotate-12 transition-all duration-300 filter drop-shadow-[0_0_5px_#00ff41]" />
                    </span>
                </Link>
            </div>

        </section>
    );
}
