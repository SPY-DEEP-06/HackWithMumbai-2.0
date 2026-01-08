"use client";

import {
    HeartPulse,
    GraduationCap,
    TrendingUp,
    Sprout,
    Building2,
    ShieldCheck,
    Bot,
    Smartphone,
    Lightbulb,
    Swords
} from "lucide-react";
import { CSSProperties } from "react";

const tracks = [
    {
        title: "HealthTech",
        icon: HeartPulse,
        description: "Innovating for a healthier tomorrow.",
        color: "text-red-500",
        shadowColor: "rgba(239, 68, 68, 0.5)",
        borderColor: "group-hover:border-red-500"
    },
    {
        title: "EdTech",
        icon: GraduationCap,
        description: "Revolutionizing the way we learn.",
        color: "text-yellow-500",
        shadowColor: "rgba(234, 179, 8, 0.5)",
        borderColor: "group-hover:border-yellow-500"
    },
    {
        title: "FinTech",
        icon: TrendingUp,
        description: "Disrupting the world of finance.",
        color: "text-green-500",
        shadowColor: "rgba(34, 197, 94, 0.5)",
        borderColor: "group-hover:border-green-500"
    },
    {
        title: "AgriTech",
        icon: Sprout,
        description: "Cultivating sustainable solutions.",
        color: "text-emerald-500",
        shadowColor: "rgba(16, 185, 129, 0.5)",
        borderColor: "group-hover:border-emerald-500"
    },
    {
        title: "Smart Cities",
        icon: Building2,
        description: "Building the cities of the future.",
        color: "text-blue-500",
        shadowColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "group-hover:border-blue-500"
    },
    {
        title: "CyberTech",
        icon: ShieldCheck,
        description: "Securing the digital frontier.",
        color: "text-purple-500",
        shadowColor: "rgba(168, 85, 247, 0.5)",
        borderColor: "group-hover:border-purple-500"
    },
    {
        title: "AI & ML",
        icon: Bot,
        description: "Unleashing the power of intelligence.",
        color: "text-cyan-500",
        shadowColor: "rgba(6, 182, 212, 0.5)",
        borderColor: "group-hover:border-cyan-500"
    },
    {
        title: "Web & App Dev",
        icon: Smartphone,
        description: "Crafting digital experiences.",
        color: "text-orange-500",
        shadowColor: "rgba(249, 115, 22, 0.5)",
        borderColor: "group-hover:border-orange-500"
    },
    {
        title: "Open Innovation",
        icon: Lightbulb,
        description: "Solving problems without boundaries.",
        color: "text-white",
        shadowColor: "rgba(255, 255, 255, 0.5)",
        borderColor: "group-hover:border-white"
    }
];

export default function EventTracks() {
    return (
        <section className="relative py-10 md:py-20 px-4 md:px-10 bg-darkhold border-t border-tva/20 overflow-hidden">

            {/* Background Decorative Elements - Lightning Storm Effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-cinematic text-tva flex items-center justify-center gap-4 drop-shadow-[0_0_10px_rgba(255,100,0,0.5)]">
                        <Swords className="w-8 h-8 md:w-12 md:h-12 text-scarlet animate-pulse drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]" />
                        EVENT TRACKS
                    </h2>
                    <p className="font-retro text-gray-400 mt-4 text-lg tracking-widest uppercase drop-shadow-md">
                        CHOOSE YOUR BATTLEFIELD
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {tracks.map((track, index) => (
                        <div
                            key={index}
                            className={`group relative p-6 bg-black/40 border border-white/5 ${track.borderColor} hover:border-opacity-100 transition-all duration-500 rounded-xl overflow-hidden hover:-translate-y-2 backdrop-blur-sm shadow-[0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_30px_var(--track-shadow),inset_0_0_10px_var(--track-shadow)]`}
                            style={{ "--track-shadow": track.shadowColor } as CSSProperties}
                        >
                            {/* Lightning/Energy Effect Container */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            {/* Animated Glitch/Scanline Background */}
                            <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-[0.03] pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                {/* Icon Container with Glow */}
                                <div className={`p-5 rounded-full bg-black/50 border border-white/10 mb-5 group-hover:bg-black/80 transition-all duration-500 relative`}>
                                    <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${track.color.replace('text-', 'bg-')}/30`}></div>
                                    <track.icon className={`w-10 h-10 ${track.color} relative z-10 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_15px_currentColor]`} />
                                </div>

                                <h3 className="text-xl font-cinematic text-white mb-3 tracking-wide group-hover:text-tva transition-colors duration-300 drop-shadow-md">
                                    {track.title}
                                </h3>
                                <p className="text-sm font-retro text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                                    {track.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
