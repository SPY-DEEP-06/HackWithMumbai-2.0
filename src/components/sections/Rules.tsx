"use client";

import { useState } from "react";
import { Lock, FileText, AlertTriangle, X } from "lucide-react";

export default function Rules() {
    const [showProblemModal, setShowProblemModal] = useState(false);

    return (
        <section className="relative py-20 px-4 md:px-10 bg-darkhold border-t border-tva/20 overflow-hidden">

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-scarlet/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-cinematic text-tva flex items-center justify-center gap-4">
                        <AlertTriangle className="w-8 h-8 md:w-12 md:h-12 text-scarlet animate-pulse" />
                        PROTOCOL & DIRECTIVES
                    </h2>
                    <p className="font-retro text-gray-400 mt-4">
                        "Strict adherence to the HackwithMumbai2.0 protocol is mandatory. Deviants will be pruned."
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Rulebook Card */}
                    <div className="group relative p-8 bg-black/50 border border-white/10 hover:border-loki/50 transition-all duration-300 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 bg-dotted-spacing-2 bg-dotted-white/[0.05]"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <FileText className="w-16 h-16 text-loki mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-cinematic text-white mb-2">MISSION RULEBOOK</h3>
                            <p className="text-sm text-gray-400 mb-6">Classified Information. Authorized Personnel Only.</p>
                            <a
                                href="https://drive.google.com/file/d/1MqzJ0RRwJ3k3rRMgiw6FxnyN5PI9S52j/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 bg-loki/10 border border-loki text-loki font-bold hover:bg-loki hover:text-black transition-all"
                            >
                                DOWNLOAD_METADATA
                            </a>
                        </div>
                    </div>

                    {/* Problem Statements Card */}
                    <div className="group relative p-8 bg-black/50 border border-white/10 hover:border-scarlet/50 transition-all duration-300 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 bg-dotted-spacing-2 bg-dotted-white/[0.05]"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <Lock className="w-16 h-16 text-scarlet mb-6 group-hover:shake" />
                            <h3 className="text-2xl font-cinematic text-white mb-2">PROBLEM STATEMENTS</h3>
                            <p className="text-sm text-gray-400 mb-6">Timeline Locked. Access Restricted until H-Hour.</p>
                            <button
                                onClick={() => setShowProblemModal(true)}
                                className="px-6 py-2 bg-scarlet/10 border border-scarlet text-scarlet font-bold hover:bg-scarlet hover:text-white transition-all cursor-not-allowed"
                            >
                                ACCESS_DENIED
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Modal */}
            {showProblemModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowProblemModal(false)}></div>
                    <div className="relative bg-black border-2 border-scarlet p-8 max-w-md w-full shadow-[0_0_50px_rgba(255,42,42,0.3)] animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setShowProblemModal(false)}
                            className="absolute top-2 right-2 text-white/50 hover:text-white"
                            aria-label="Close Modal"
                        >
                            <X size={24} />
                        </button>
                        <div className="text-center">
                            <Lock className="w-12 h-12 text-scarlet mx-auto mb-4" />
                            <h3 className="text-2xl font-cinematic text-white mb-2">TIMELINE LOCKED</h3>
                            <p className="font-retro text-red-400">
                                Problem statements are currently encrypted by the Time Variance Authority.
                                Decryption scheduled for Hackathon Launch.
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}
