"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import Rules from "@/components/sections/Rules";
import Organizers from "@/components/sections/Organizers";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";

// Dynamically import heavy 3D components
const MultiverseBackground = dynamic(() => import("@/components/canvas/MultiverseBackground"), {
  ssr: false,
});

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden selection:bg-scarlet selection:text-black">
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <MultiverseBackground />

          <Hero />
          <About />
          <Gallery />
          <Rules />
          <Organizers />
          <Footer />
        </>
      )}
    </main>
  );
}
