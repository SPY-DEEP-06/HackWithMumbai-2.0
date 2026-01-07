"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";

// Define strict SFX types as per prompt
export type SoundEffect =
    | "hover"
    | "click"
    | "error"
    | "success"
    | "startup"
    | "glitch"
    | "portal"
    | "themeSwitch"
    | "paymentStart"
    | "paymentSuccess";

interface SoundContextType {
    play: (sound: SoundEffect) => void;
    muted: boolean;
    toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [muted, setMuted] = useState(false); // Default ON as per prompt, but respecting user choice
    // In strict prompt it says Default ON.
    const audioContextRef = useRef<AudioContext | null>(null);

    // Initialize Audio Context on first interaction
    useEffect(() => {
        const initAudio = () => {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            if (audioContextRef.current.state === "suspended") {
                audioContextRef.current.resume();
            }
        };

        window.addEventListener("click", initAudio, { once: true });
        return () => window.removeEventListener("click", initAudio);
    }, []);

    const play = (sound: SoundEffect) => {
        if (muted) return;

        // In a real app, we would load buffers here.
        // For this implementation, since we rely on user assets, we'll try to play HTML5 Audio
        // from a standardized path: /sounds/[sound].mp3

        try {
            const audio = new Audio(`/sounds/${sound}.mp3`);
            audio.volume = 0.5; // -22 LUFS approximate logic (half volume)
            audio.play().catch(e => {
                // Ignore play interruption errors
                // console.warn("Audio play failed (interaction required first?)", e); 
            });
        } catch (e) {
            console.error("Audio error", e);
        }
    };

    const toggleMute = () => setMuted(prev => !prev);

    return (
        <SoundContext.Provider value={{ play, muted, toggleMute }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (context === undefined) {
        throw new Error("useSound must be used within a SoundProvider");
    }
    return context;
}
