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

const tracks = [
    {
        title: "HealthTech",
        icon: HeartPulse,
        description: "Innovating for a healthier tomorrow.",
        color: "text-red-500",
        border: "group-hover:border-red-500/50"
    },
    {
        title: "EdTech",
        icon: GraduationCap,
        description: "Revolutionizing the way we learn.",
        color: "text-yellow-500",
        border: "group-hover:border-yellow-500/50"
    },
    {
        title: "FinTech",
        icon: TrendingUp,
        description: "Disrupting the world of finance.",
        color: "text-green-500",
        border: "group-hover:border-green-500/50"
    },
    {
        title: "AgriTech",
        icon: Sprout,
        description: "Cultivating sustainable solutions.",
        color: "text-emerald-500",
        border: "group-hover:border-emerald-500/50"
    },
    {
        title: "Smart Cities",
        icon: Building2,
        description: "Building the cities of the future.",
        color: "text-blue-500",
        border: "group-hover:border-blue-500/50"
    },
    {
        title: "CyberTech",
        icon: ShieldCheck,
        description: "Securing the digital frontier.",
        color: "text-purple-500",
        border: "group-hover:border-purple-500/50"
    },
    {
        title: "AI & ML",
        icon: Bot,
        description: "Unleashing the power of intelligence.",
        color: "text-cyan-500",
        border: "group-hover:border-cyan-500/50"
    },
    {
        title: "Web & App Dev",
        icon: Smartphone,
        description: "Crafting digital experiences.",
        color: "text-orange-500",
        border: "group-hover:border-orange-500/50"
    },
    {
        title: "Open Innovation",
        icon: Lightbulb,
        description: "Solving problems without boundaries.",
        color: "text-white",
        border: "group-hover:border-white/50"
    }
];

export default function EventTracks() {
    return (
        <section className="relative py-10 md:py-20 px-4 md:px-10 bg-darkhold border-t border-tva/20 overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-loki/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-cinematic text-tva flex items-center justify-center gap-4">
                        <Swords className="w-8 h-8 md:w-12 md:h-12 text-scarlet animate-pulse" />
                        EVENT TRACKS
                    </h2>
                    <p className="font-retro text-gray-400 mt-4 text-lg tracking-widest uppercase">
                        CHOOSE YOUR BATTLEFIELD
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {tracks.map((track, index) => (
                        <div
                            key={index}
                            className={`group relative p-6 bg-black/50 border border-white/10 ${track.border} transition-all duration-300 rounded-lg overflow-hidden hover:transform hover:scale-105 hover:bg-black/80`}
                        >
                            <div className="absolute inset-0 bg-dotted-spacing-2 bg-dotted-white/[0.05]"></div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`p-4 rounded-full bg-white/5 mb-4 group-hover:bg-white/10 transition-colors`}>
                                    <track.icon className={`w-10 h-10 ${track.color}`} />
                                </div>
                                <h3 className="text-xl font-cinematic text-white mb-2 tracking-wide group-hover:text-tva transition-colors">
                                    {track.title}
                                </h3>
                                <p className="text-sm font-retro text-gray-400">
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
