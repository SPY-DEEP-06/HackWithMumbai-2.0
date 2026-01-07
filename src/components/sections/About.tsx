"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Users, Shield, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: "Operatives", value: "500+", icon: Users },
    { label: "Bounty Prize", value: "₹1.5L", icon: Trophy },
    { label: "Coalition Partners", value: "20+", icon: Shield },
    { label: "Hours Operations", value: "30h", icon: Zap },
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
        <section ref={containerRef} className="relative py-20 px-4 md:px-10 z-10 bg-black/50 backdrop-blur-sm border-t border-tva/20">
            <div className="max-w-7xl mx-auto">

                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-5xl font-cinematic text-tva mb-4 flex items-center justify-center gap-4">
                        <span className="w-12 h-[2px] bg-loki"></span>
                        SYSTEM INTEL
                        <span className="w-12 h-[2px] bg-loki"></span>
                    </h2>
                    <p className="font-retro text-loki max-w-2xl mx-auto">
                        "Initiating HackwithMumbai2.0 Protocol. A convergence of elite developers detected at Navi Mumbai Node."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="holo-card group relative p-6 bg-white/5 border border-white/10 rounded-xl hover:border-loki/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,65,0.2)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-loki/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>

                            <stat.icon className="w-10 h-10 text-tva mb-4 group-hover:text-loki transition-colors" />

                            <h3 className="text-4xl font-bold font-cinematic text-white mb-2">{stat.value}</h3>
                            <p className="font-retro text-sm text-gray-400 uppercase tracking-wider">{stat.label}</p>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 group-hover:border-loki transition-colors"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 group-hover:border-loki transition-colors"></div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-8 bg-white/5 backdrop-blur-md border border-white/10 border-l-4 border-l-scarlet relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <Shield className="w-32 h-32 text-scarlet" />
                    </div>
                    <h3 className="text-2xl font-cinematic text-white mb-4">MISSION DIRECTIVE</h3>
                    <p className="text-gray-300 font-light leading-relaxed max-w-4xl relative z-10">
                        The timeline is fracturing. We need the best minds to stabilize the reality.
                        Your mission is to build, disrupt, and deploy innovative solutions within a 30-hour sprint.
                        Deployments must survive the chaos. The multiverse depends on it.
                    </p>
                </div>

            </div>
        </section>
    );
}
