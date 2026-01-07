"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Hero from "@/components/landing/Hero";
import StartupLoader from "@/components/startup/StartupLoader";
import AboutSection from "@/components/landing/AboutSection";
import StatsSection from "@/components/landing/StatsSection";
import OrganizersSection from "@/components/landing/OrganizersSection";
import RulesSection from "@/components/landing/RulesSection";
import GallerySection from "@/components/landing/GallerySection";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [showStartup, setShowStartup] = useState(true);

  useEffect(() => {
    // Determine if we should show startup
    const hasSeen = typeof window !== 'undefined' ? sessionStorage.getItem("hwm-startup-seen") : null;
    if (hasSeen) {
      setShowStartup(false);
    }
  }, []);

  const handleStartupComplete = () => {
    sessionStorage.setItem("hwm-startup-seen", "true");
    setShowStartup(false);
  };

  return (
    <main className="min-h-screen flex flex-col relative w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {showStartup ? (
          <StartupLoader onComplete={handleStartupComplete} key="startup" />
        ) : (
          <div key="content" className="w-full">
            <Navbar />
            <Hero />
            <AboutSection />
            <GallerySection />
            <RulesSection />
            <StatsSection />
            <OrganizersSection />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
