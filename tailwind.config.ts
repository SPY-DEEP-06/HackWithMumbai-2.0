import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "scarlet": "#ff2a2a",
                "darkhold": "#050505",
                "loki": "#00ff41",
                "tva": "#ff8c00",
            },
            fontFamily: {
                "cinematic": ["var(--font-cinematic)", "serif"],
                "retro": ["var(--font-retro)", "monospace"],
            },

            keyframes: {
                glitch: {
                    "0%": { clipPath: "inset(40% 0 61% 0)", transform: "translate(-2px, 2px)" },
                    "20%": { clipPath: "inset(92% 0 1% 0)", transform: "translate(2px, -2px)" },
                    "40%": { clipPath: "inset(43% 0 1% 0)", transform: "translate(-2px, 2px)" },
                    "60%": { clipPath: "inset(25% 0 58% 0)", transform: "translate(2px, -2px)" },
                    "80%": { clipPath: "inset(54% 0 7% 0)", transform: "translate(-2px, 2px)" },
                    "100%": { clipPath: "inset(58% 0 43% 0)", transform: "translate(2px, -2px)" },
                },
                flicker: {
                    "0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%": {
                        opacity: "0.99",
                        filter: "drop-shadow(0 0 1px rgba(252, 211, 77, 1)) separate(0 0 15px rgba(245, 158, 11, 1)) drop-shadow(0 0 1px rgba(252, 211, 77, 1))",
                    },
                    "20%, 21.999%, 63%, 63.999%, 65%, 69.999%": {
                        opacity: "0.4",
                        filter: "none",
                    },
                },
                scan: {
                    "0%, 100%": { top: "0%", opacity: "0" },
                    "10%": { opacity: "1" },
                    "90%": { opacity: "1" },
                    "50%": { top: "100%" },
                },
                "radar-spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                "pulse-slow": {
                    "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
                    "50%": { opacity: "0.8", transform: "scale(1.1)" },
                }
            },
            animation: {
                "glitch": "glitch 1s linear infinite",
                "flicker": "flicker 2s linear infinite",
                "scan": "scan 3s ease-in-out infinite",
                "radar": "radar-spin 4s linear infinite",
                "pulse-slow": "pulse-slow 3s ease-in-out infinite",
            },
        },
    },
    plugins: [],
} satisfies Config;
