"use client";

import { ReactNode } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis root>
            {children as any}
        </ReactLenis>
    );
}
