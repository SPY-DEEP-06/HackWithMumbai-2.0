"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "stranger" | "hybrid" | "marvel";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("stranger");

    useEffect(() => {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem("hwm-theme") as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute("data-theme", theme);
        localStorage.setItem("hwm-theme", theme);

        // Play sound effect on change? (TODO)
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
