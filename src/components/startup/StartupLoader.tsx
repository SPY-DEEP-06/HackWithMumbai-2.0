"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const SYSTEM_LOGS = [
    "INITIALIZING_PROTOCOL...",
    "ESTABLISHING_SECURE_CONNECTION...",
    "BYPASSING_FIREWALL_LAYER_7...",
    "ACCESS_GRANTED: LEVEL_5_CLEARANCE...",
    "LOADING_ASSETS: STRANGER_THINGS_MOD...",
    "SYNCING_WITH_UPSIDE_DOWN...",
    "DETECTING_DIMENSIONAL_RIFT...",
    "MULTIVERSE_GATEWAY: OPEN...",
    "WELCOME_OPERATIVE.",
];

export default function StartupLoader({ onComplete }: { onComplete?: () => void }) {
    const [logs, setLogs] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let delay = 0;
        SYSTEM_LOGS.forEach((log, index) => {
            delay += Math.random() * 500 + 200;
            setTimeout(() => {
                setLogs((prev) => [...prev, log]);
                if (logContainerRef.current) {
                    logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
                }
            }, delay);
        });

        // Final completion
        setTimeout(() => {
            gsap.to(containerRef.current, {
                scale: 20,
                opacity: 0,
                duration: 1.5,
                ease: "power4.in",
                onComplete: () => {
                    if (onComplete) onComplete();
                },
            });
        }, delay + 1500);
    }, [onComplete]);

    return (
        <motion.div
            exit={{ opacity: 0 }}
            ref={containerRef}
            className="fixed inset-0 z-[100] h-screen w-full bg-black flex flex-col items-center justify-center font-mono text-green-500 overflow-hidden"
        >
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('/noise.png')]"></div>

            <h1 className="text-3xl md:text-5xl font-bold mb-8 animate-pulse text-red-600 tracking-widest uppercase glitch-text" data-text="INITIALIZE PROTOCOL">
                INITIALIZE PROTOCOL
            </h1>

            <div className="w-64 h-2 bg-gray-900 rounded-full mb-8 overflow-hidden border border-red-900">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-red-600 shadow-[0_0_10px_red]"
                />
            </div>

            <div
                ref={logContainerRef}
                className="w-full max-w-lg h-48 overflow-y-auto bg-black/50 border border-green-900 p-4 font-xs text-green-400 font-mono shadow-[0_0_20px_rgba(0,255,0,0.1)] backdrop-blur-sm"
            >
                <AnimatePresence>
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-1"
                        >
                            {`> ${log}`}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <style jsx>{`
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 red;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 blue;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(12px, 9999px, 32px, 0); }
          20% { clip: rect(89px, 9999px, 86px, 0); }
          40% { clip: rect(6px, 9999px, 10px, 0); }
          60% { clip: rect(44px, 9999px, 91px, 0); }
          80% { clip: rect(2px, 9999px, 15px, 0); }
          100% { clip: rect(67px, 9999px, 32px, 0); }
        }
        @keyframes glitch-anim-2 {
          0% { clip: rect(65px, 9999px, 100px, 0); }
          20% { clip: rect(10px, 9999px, 2px, 0); }
          40% { clip: rect(23px, 9999px, 66px, 0); }
          60% { clip: rect(87px, 9999px, 15px, 0); }
          80% { clip: rect(3px, 9999px, 52px, 0); }
          100% { clip: rect(44px, 9999px, 33px, 0); }
        }
      `}</style>
        </motion.div>
    );
}
