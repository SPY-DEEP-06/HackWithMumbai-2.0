"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Users, Shield, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: "OPERATIVES", value: "500+", icon: Users },
    { label: "BOUNTY", value: "₹1.5L", icon: Trophy },
    { label: "MENTORS", value: "20+", icon: Shield },
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".holo-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative py-10 md:py-20 px-4 md:px-10 z-10 bg-black/90 border-t border-tva/20 overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header Badge */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-scarlet animate-pulse"></div>
                    <span className="text-scarlet font-retro text-xs tracking-widest uppercase">SYSTEM INTEL</span>
                </div>

                {/* Main Title */}
                <h2 className="text-5xl md:text-7xl font-cinematic text-white mb-12 tracking-wide">
                    MISSION BRIEF
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Left Panel: Text Content */}
                    <div className="relative p-8 md:p-12 border border-white/20 rounded-3xl overflow-hidden bg-black/50 group hover:border-white/40 transition-colors">
                        {/* Grid Background */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10"></div>
                        {/* Decorative Circles */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 border border-white/10 rounded-full"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 border border-white/10 rounded-full"></div>

                        <div className="relative z-10 space-y-8">
                            <h3 className="text-2xl md:text-4xl font-cinematic text-white">
                                Initiating <span className="text-scarlet">HackwithMumbai2.0</span> Protocol.
                            </h3>

                            <div className="font-retro text-gray-400 space-y-6 text-sm md:text-base leading-relaxed">
                                <p>
                                    <span className="text-scarlet">[SYSTEM_LOG]:</span> A convergence of elite developers, designers, and innovators detected at Navi Mumbai Node.
                                </p>
                                <p className="pl-4 border-l-2 border-white/20">
                                    Mission: 30-hour sprint. Build the future. Disrupt the present. Survive deployment.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Live Feed Visual */}
                    <div className="relative h-full min-h-[300px] border border-scarlet/30 bg-black/80 rounded-sm overflow-hidden flex items-center justify-center">
                        <div className="absolute top-4 right-4 item-center gap-2">
                            <div className="w-6 h-6 text-scarlet animate-pulse">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                            </div>
                        </div>

                        {/* Sanctum/Eye Symbol */}
                        <div className="relative w-48 h-48 md:w-64 md:h-64 opacity-50">
                            <div className="absolute inset-0 border-4 border-scarlet/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute inset-4 border-2 border-scarlet/40 rounded-full"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-[2px] bg-scarlet/50"></div>
                                <div className="absolute h-full w-[2px] bg-scarlet/50"></div>
                            </div>
                            <div className="absolute inset-[35%] border-4 border-scarlet rounded-full shadow-[0_0_30px_#ff2a2a]"></div>
                        </div>

                        {/* Scanning Line */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-scarlet shadow-[0_0_10px_#ff2a2a] animate-[scan_3s_ease-in-out_infinite]"></div>

                        <div className="absolute bottom-4 left-4 font-retro text-[10px] text-gray-500 uppercase">
                            <div>LIVE FEED</div>
                            <div>LOC: NAVI_MUMBAI_NODE</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.slice(0, 3).map((stat, index) => (
                        <div key={index} className="relative p-6 border border-scarlet/20 bg-black/40 hover:bg-scarlet/5 transition-colors group text-center">
                            <div className="absolute top-2 right-2 text-scarlet/30">
                                <Shield size={12} />
                            </div>

                            <div className="flex flex-col items-center">
                                <stat.icon className="w-8 h-8 text-scarlet mb-3 group-hover:scale-110 transition-transform" />
                                <h4 className="text-3xl font-cinematic text-white mb-1 group-hover:text-scarlet transition-colors">{stat.value}</h4>
                                <p className="font-retro text-[10px] text-scarlet tracking-widest uppercase">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>


        </section>
    );
}
