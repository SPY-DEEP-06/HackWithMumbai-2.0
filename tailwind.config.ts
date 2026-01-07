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
            animation: {
                "glitch": "glitch 1s linear infinite",
                "flicker": "flicker 2s linear infinite",
            },
            keyframes: {
                glitch: {
                    "2%, 64%": { transform: "translate(2px,0) skew(0deg)" },
                    "4%, 60%": { transform: "translate(-2px,0) skew(0deg)" },
                    "62%": { transform: "translate(0,0) skew(5deg)" },
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
            },
        },
    },
    plugins: [],
} satisfies Config;
