"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

interface Organizer {
    name: string;
    role: string;
    contact: string;
    variantId: string;
    image?: string; // Optional image URL
}

const organizers: Organizer[] = [
    { name: "Yash Mohite", role: "Organizer", contact: "+91 9967053816", variantId: "VAR-892" },
    { name: "Deepanshu J. Ghosalkar", role: "Technical Head", contact: "+91 8108776019", variantId: "VAR-114" },
    { name: "Aayush Pandey", role: "Organizer", contact: "+91 9820883125", variantId: "VAR-773" },
    { name: "Ansh Verma", role: "Organizer", contact: "+91 6261681932", variantId: "VAR-002" },
];

export default function Organizers() {
    return (
        <section className="relative py-10 md:py-20 px-4 md:px-10 bg-black/90 border-t border-tva/20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-cinematic text-white mb-4">THE ORGANIZERS</h2>
                    <p className="font-retro text-tva">"Authorized Variant Overseers"</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {organizers.map((org, index) => (
                        <div key={index} className="group relative bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/10 hover:border-tva/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(200,80,0,0.1)]">
                            {/* ID Badge Style Header */}
                            <div className="bg-white/5 p-4 border-b border-white/5 flex justify-between items-center">
                                <span className="font-retro text-xs text-tva tracking-wider">TVA ACCREDITED</span>
                                <span className="font-retro text-xs text-white/30">{org.variantId}</span>
                            </div>

                            <div className="p-8 text-center">
                                <div className="w-24 h-24 mx-auto bg-[#050505] rounded-full mb-6 border border-white/10 group-hover:border-tva transition-colors flex items-center justify-center overflow-hidden relative">
                                    <div className="absolute inset-0 bg-tva/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    {/* Placeholder Avatars */}
                                    <span className="font-cinematic text-4xl text-white/20 group-hover:text-tva transition-colors">
                                        {org.name.charAt(0)}
                                    </span>
                                </div>

                                <h3 className="text-xl md:text-2xl font-bold font-cinematic text-white mb-2 tracking-wide">{org.name}</h3>
                                <p className="text-sm font-retro text-gray-500 mb-8 uppercase tracking-widest">{org.role}</p>

                                <Link
                                    href={`https://wa.me/${org.contact.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-6 py-2 bg-[#25D366]/5 border border-[#25D366]/20 text-[#25D366] rounded-full hover:bg-[#25D366] hover:text-white transition-all text-sm font-bold tracking-wide group-hover:shadow-[0_0_15px_rgba(37,211,102,0.2)]"
                                >
                                    <MessageCircle size={16} />
                                    Chat
                                </Link>
                            </div>

                            {/* Scanline overlay only on card */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
