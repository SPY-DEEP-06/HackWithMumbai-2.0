"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronRight, Terminal, Activity, Zap } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";

gsap.registerPlugin(ScrollTrigger);

const archives = [
    {
        title: "BUILD IT TOUR 2.0",
        date: "SEP 27, 2025",
        id: "ARCHIVE 01",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=600&auto=format&fit=crop&grayscale",
        briefing: "A full day of learning, innovation, and networking at Microsoft HQ.",
        objectives: [
            "Exposure to cutting-edge technologies and entrepreneurial journeys.",
            "Inspire innovation through real-world success stories in tech and business.",
            "Platform for students to engage with industry leaders and professionals."
        ],
        highlights: [
            "Session by Siddhesh Shivdikar (Founder, Bootee) on AR-3D fashion.",
            "Industry insights by Purvi Patel (Zain Global UK) on global education.",
            "120+ participants including tech enthusiasts and entrepreneurs."
        ],
        impact: "Students gained exposure to AR fashion tech and international career paths, fostering a spirit of entrepreneurship."
    },
    {
        title: "PRE-EVENT HACKWITHMUMBAI",
        date: "SEP 15, 2025",
        id: "ARCHIVE 02",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop&grayscale",
        briefing: "The exclusive curtain-raiser for the main HackWithMumbai initiative.",
        objectives: [
            "Introduce vision and goals of the HackWithMumbai initiative.",
            "Interaction with industry experts and mentors.",
            "Foster enthusiasm ahead of the main hackathon."
        ],
        highlights: [
            "Talks by Yash Mohite (CEO, DevTech) on leadership.",
            "Insights from Niraga Patil (Zain Global) on marketing & data science.",
            "Strong community engagement and networking."
        ],
        impact: "Inspired creativity and problem-solving, setting the tone for the main event with high enthusiasm."
    },
    {
        title: "HWI ORIENTATION",
        date: "AUG 23, 2025",
        id: "ARCHIVE 03",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop&grayscale",
        briefing: "Introducing 350+ students to the vision of HackWithIndia.",
        objectives: [
            "Introduce first-year students to HackWithIndia vision.",
            "Encourage early involvement in coding culture.",
            "Hands-on exposure to AI tools."
        ],
        highlights: [
            "Attendance of 350 students.",
            "Mentorship under Prof. Ahmer Usmani.",
            "Hands-on Replit AI Workshop for coding automation."
        ],
        impact: "First-year students gained clarity on the mission and were motivated to begin their technical journey."
    },
    {
        title: "HACKWITHMUMBAI HACKATHON",
        date: "SEP 21, 2025",
        id: "ARCHIVE 04",
        image: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=600&auto=format&fit=crop&grayscale",
        briefing: "55 Teams. 10 Hours. Infinite Innovation.",
        objectives: [
            "Platform to ideate, code, and innovate on real-world problems.",
            "Encourage teamwork and practical application.",
            "Foster a culture of problem-solving."
        ],
        highlights: [
            "55 teams and 60 student volunteers.",
            "Diverse problem statements and prototype development.",
            "Project presentations showcasing technical proficiency."
        ],
        impact: "Fostered a culture of innovation, hands-on experience in prototyping, and created a strong mentorship ecosystem."
    },
    {
        title: "LEARN IT TOUR",
        date: "JUL 16, 2025",
        id: "ARCHIVE 05",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf8e5fe?q=80&w=600&auto=format&fit=crop&grayscale",
        briefing: "A vibrant platform for learning with 220+ participants.",
        objectives: [
            "Exposure to latest trends and tools in tech.",
            "Networking with experts and peers.",
            "Inspire innovation within the student community."
        ],
        highlights: [
            "Sessions by Yash Mohite, Vikas Kumar Yadav (GitHub Expert), Saurabh Saini (PW Skills).",
            "Interactive Q&A rounds.",
            "Exciting giveaways and prizes."
        ],
        impact: "Students gained insights into open-source, design strategies, and entrepreneurial journeys."
    },
];

export default function Gallery() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [selectedArchive, setSelectedArchive] = useState<typeof archives[0] | null>(null);
    const lenis = useLenis();

    // Lock body scroll and pause Lenis when modal is open
    useEffect(() => {
        if (selectedArchive) {
            lenis?.stop();
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }

        return () => {
            lenis?.start();
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
        }
    }, [selectedArchive, lenis]);

    useEffect(() => {
        const section = sectionRef.current;

        if (section && triggerRef.current) {
            const totalPanels = archives.length + 1; // Title + Images
            const scrollWidth = (totalPanels - 1) * 100;

            const pin = gsap.fromTo(section,
                { translateX: 0 },
                {
                    translateX: `-${scrollWidth}vw`, // Use calculated scroll width
                    ease: "none",
                    duration: 1,
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: `${totalPanels * 1000} top`,
                        scrub: 0.6,
                        pin: true,
                    }
                }
            );
            return () => {
                pin.kill();
            };
        }
    }, []);

    return (
        <section className="overflow-hidden bg-black relative z-20">
            <div ref={triggerRef}>
                <div
                    ref={sectionRef}
                    className="h-screen flex flex-row relative w-[600vw]"
                >

                    {/* Title Panel */}
                    <div className="w-screen h-full flex flex-col items-center justify-center px-4 md:px-20 border-r border-white/10 relative text-center">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                        <h2 className="text-5xl md:text-7xl font-cinematic text-transparent bg-clip-text bg-gradient-to-r from-tva to-scarlet mb-4 md:mb-8 font-bold tracking-wider">
                            PAST ARCHIVES
                        </h2>
                        <p className="font-retro text-base md:text-xl text-gray-400 px-4">
                            Recovered footage from previous timelines.
                        </p>
                        <div className="mt-8 md:mt-12 animate-bounce text-loki text-sm md:text-base">
                            Scroll to Access Database &rarr;
                        </div>
                    </div>

                    {/* Archive Panels */}
                    {archives.map((archive, index) => (
                        <div key={index} className="w-screen h-full flex items-center justify-center p-4 md:p-20 border-r border-white/5 relative bg-[#050505]">

                            {/* Card Container */}
                            <div className="group relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 hover:border-scarlet/50 transition-all duration-500 overflow-hidden flex flex-col md:flex-row h-[70vh] md:h-[60vh]">

                                {/* Image Half */}
                                <div className="relative w-full md:w-2/3 h-1/2 md:h-full overflow-hidden">
                                    <div className="absolute inset-0 bg-scarlet/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <img
                                        src={archive.image}
                                        alt={archive.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/90 border border-scarlet px-2 py-1 z-20">
                                        <span className="text-scarlet font-retro text-xs font-bold tracking-widest uppercase">
                                            {archive.date}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="bg-scarlet text-black font-retro text-xs font-bold px-2 py-1 uppercase tracking-wider">
                                            CASE FILE: {archive.id}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Half */}
                                <div className="w-full md:w-1/3 h-1/2 md:h-full p-6 md:p-8 flex flex-col justify-between relative bg-dotted-spacing-4 bg-dotted-white/[0.05]">
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-cinematic text-white mb-4 group-hover:text-scarlet transition-colors leading-tight">
                                            {archive.title}
                                        </h3>
                                        <div className="w-12 h-1 bg-white/20 group-hover:bg-scarlet transition-colors mb-6"></div>
                                        <p className="font-retro text-xs text-gray-500 leading-relaxed">
                                            &gt; ACCESSING_MEMORY_BLOCK...<br />
                                            &gt; DECRYPTING_VISUALS...<br />
                                            &gt; STATUS: RESTORED
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-white/10">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="font-retro text-xs text-gray-600 uppercase tracking-widest">
                                                ID: {archive.id}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setSelectedArchive(archive)}
                                            className="w-full py-3 bg-white/5 border border-white/10 text-white font-retro text-xs uppercase tracking-widest hover:bg-scarlet hover:border-scarlet transition-all group-hover:shadow-[0_0_15px_rgba(255,42,42,0.3)] flex items-center justify-center gap-2"
                                        >
                                            ACCESS DATA <Terminal size={14} />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Modal */}
            {selectedArchive && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-black border border-scarlet/30 shadow-[0_0_50px_rgba(255,42,42,0.1)] flex flex-col md:flex-row overflow-hidden">

                        {/* Modal Close Button */}
                        <button
                            onClick={() => setSelectedArchive(null)}
                            aria-label="Close details"
                            className="absolute top-4 right-4 z-50 text-white hover:text-scarlet transition-colors p-2 bg-black/50 rounded-full"
                        >
                            <X size={24} />
                        </button>

                        {/* Left: Image & Title */}
                        <div className="w-full md:w-2/5 h-64 md:h-full relative overflow-hidden group">
                            <img
                                src={selectedArchive.image}
                                alt={selectedArchive.title}
                                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="bg-scarlet/20 text-scarlet border border-scarlet/50 font-retro text-xs px-2 py-1 inline-block mb-4 backdrop-blur-md">
                                    CASE FILE: {selectedArchive.id}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-cinematic text-white leading-none mb-2 drop-shadow-lg">
                                    {selectedArchive.title}
                                </h2>
                                <div className="flex items-center gap-4 text-gray-400 font-retro text-xs">
                                    <span>🗓 {selectedArchive.date}</span>
                                    <span>📍 ARCHIVE_LOC_MUMBAI</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Content Information */}
                        <div
                            className="w-full md:w-3/5 h-full overflow-y-auto p-8 md:p-12 bg-[#050505] custom-scrollbar overscroll-contain"
                            data-lenis-prevent
                        >

                            {/* Briefing */}
                            <div className="mb-8">
                                <h4 className="text-scarlet font-retro text-xs uppercase tracking-[0.2em] mb-3">Briefing</h4>
                                <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
                                    {selectedArchive.briefing}
                                </p>
                            </div>

                            <div className="h-px w-full bg-white/10 my-8"></div>

                            {/* Objectives */}
                            <div className="mb-8">
                                <h4 className="text-gray-500 font-retro text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <ChevronRight size={14} className="text-scarlet" /> Objectives
                                </h4>
                                <ul className="space-y-3">
                                    {selectedArchive.objectives.map((obj, i) => (
                                        <li key={i} className="flex items-start text-gray-300 text-sm md:text-base pl-4 border-l border-white/20">
                                            {obj}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                                {/* Highlights */}
                                <div>
                                    <h4 className="text-gray-500 font-retro text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <Zap size={14} className="text-scarlet" /> Highlights
                                    </h4>
                                    <ul className="space-y-3">
                                        {selectedArchive.highlights.map((item, i) => (
                                            <li key={i} className="text-gray-400 text-sm list-disc list-inside">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Impact */}
                                <div>
                                    <h4 className="text-gray-500 font-retro text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <Activity size={14} className="text-scarlet" /> Impact
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {selectedArchive.impact}
                                    </p>
                                </div>
                            </div>

                            {/* Visual Evidence (Thumbnails) */}
                            <div>
                                <h4 className="text-scarlet font-retro text-xs uppercase tracking-[0.2em] mb-4">Visual Evidence</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    {[1, 2, 3].map((_, i) => (
                                        <div key={i} className="aspect-video relative overflow-hidden border border-white/10 group cursor-pointer hover:border-scarlet/50 transition-colors">
                                            <img
                                                src={selectedArchive.image}
                                                alt="Evidence"
                                                className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all"
                                            />
                                            <div className="absolute inset-0 bg-scarlet/10 mix-blend-overlay"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
