"use client";

import React from "react";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { LogoCarousel, Logo } from "@/components/ui/logo-carousel";

// Helper component to wrap standard img tags for the carousel
const SponsorImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => (
    <img src={src} alt={alt} className={className} />
);

// Define sponsor logos using the wrapper
const CivoraNexusLogo = (props: { className?: string }) => <SponsorImage src="/Sponsorslogo/Civora_nexus.png" alt="Civora Nexus" {...props} />;
const GMCLogo = (props: { className?: string }) => <SponsorImage src="/Sponsorslogo/GMC.png" alt="GMC" {...props} />;
const InterviewBuddyLogo = (props: { className?: string }) => <SponsorImage src="/Sponsorslogo/InterviewBuddy.png" alt="InterviewBuddy" {...props} />;
const SPJainLogo = (props: { className?: string }) => <SponsorImage src="/Sponsorslogo/SP_Jain.png" alt="SP Jain" {...props} />;
const UnstopLogo = (props: { className?: string }) => <SponsorImage src="/Sponsorslogo/Unstop.png" alt="Unstop" {...props} />;
const AdaptsLogo = (props: { className?: string }) => <SponsorImage src="/Sponsorslogo/adapts.png" alt="Adapts" {...props} />;
const QualitySoftechLogo = (props: { className?: string }) => <SponsorImage src="/Sponsorslogo/qualitysoftech.png" alt="Quality Softech" {...props} />;

const sponsors: Logo[] = [
    { name: "Civora Nexus", id: 1, img: CivoraNexusLogo },
    { name: "GMC", id: 2, img: GMCLogo },
    { name: "InterviewBuddy", id: 3, img: InterviewBuddyLogo },
    { name: "SP Jain", id: 4, img: SPJainLogo },
    { name: "Unstop", id: 5, img: UnstopLogo },
    { name: "Adapts", id: 6, img: AdaptsLogo },
    { name: "Quality Softech", id: 7, img: QualitySoftechLogo },
    // Duplicate some to fill the carousel if needed, or let the carousel logic handle it (it does shuffle/distribute)
];

export default function Sponsors() {
    return (
        <section className="relative py-20 bg-darkhold border-t border-tva/20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10 flex flex-col items-center">

                <div className="text-center mb-12">
                    <GradientHeading size="lg" weight="bold" className="font-cinematic tracking-widest text-white mb-2">
                        OFFICIAL PARTNERS
                    </GradientHeading>
                    <p className="font-retro text-gray-400 max-w-2xl mx-auto">
                        Powering the innovation of tomorrow.
                    </p>
                </div>

                <div className="w-full">
                    <LogoCarousel columnCount={4} logos={sponsors} />
                </div>

            </div>
            {/* Background Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-scarlet/5 blur-[100px] pointer-events-none rounded-full"></div>
        </section>
    );
}
