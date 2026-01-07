"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-02-07T00:00:00").getTime();

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = TARGET_DATE - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
                return;
            }

            setTimeLeft({
                d: Math.floor(distance / (1000 * 60 * 60 * 24)),
                h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                s: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!timeLeft) return <div className="h-24 md:h-32"></div>;

    const TimeBox = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center mx-2 md:mx-4">
            <motion.div
                key={value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-3xl md:text-5xl lg:text-7xl font-bold font-mono text-foreground border border-primary/30 bg-black/40 backdrop-blur-sm p-3 md:p-6 rounded-lg min-w-[70px] md:min-w-[120px] text-center shadow-[0_0_15px_rgba(var(--primary),0.3)]"
            >
                {String(value).padStart(2, "0")}
            </motion.div>
            <span className="text-xs md:text-sm font-semibold tracking-widest mt-2 uppercase text-muted-foreground">{label}</span>
        </div>
    );

    return (
        <div className="flex justify-center flex-wrap my-8">
            <TimeBox value={timeLeft.d} label="Days" />
            <TimeBox value={timeLeft.h} label="Hours" />
            <TimeBox value={timeLeft.m} label="Minutes" />
            <TimeBox value={timeLeft.s} label="Seconds" />
        </div>
    );
}
