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
    { name: "Yash Mohite", role: "Head Operations", contact: "+91 9967053816", variantId: "VAR-892" },
    { name: "Shubham Bhat", role: "Tech Lead", contact: "+91 9082193612", variantId: "VAR-114" },
    { name: "Aayush Pandey", role: "Logistics", contact: "+91 9820883125", variantId: "VAR-773" },
    { name: "Ansh Verma", role: "Sponsorship", contact: "+91 6261681932", variantId: "VAR-002" },
];

export default function Organizers() {
    return (
        <section className="relative py-20 px-4 md:px-10 bg-black/90 border-t border-tva/20">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-cinematic text-white mb-4">THE COUNCIL</h2>
                    <p className="font-retro text-tva">"Authorized Variant Overseers"</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {organizers.map((org, index) => (
                        <div key={index} className="group relative bg-[#1a1a1a] rounded-lg overflow-hidden border border-white/5 hover:border-tva transition-all duration-300">
                            {/* ID Badge Style Header */}
                            <div className="bg-tva/10 p-4 border-b border-tva/20 flex justify-between items-center">
                                <span className="font-retro text-xs text-tva">TVA ACCREDITED</span>
                                <span className="font-retro text-xs text-white/50">{org.variantId}</span>
                            </div>

                            <div className="p-6 text-center">
                                <div className="w-24 h-24 mx-auto bg-gray-800 rounded-full mb-4 border-2 border-white/10 group-hover:border-tva transition-colors flex items-center justify-center overflow-hidden">
                                    {/* Placeholder Avatars */}
                                    <span className="font-cinematic text-3xl text-white/20 group-hover:text-tva transition-colors">
                                        {org.name.charAt(0)}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold font-cinematic text-white mb-1">{org.name}</h3>
                                <p className="text-sm text-gray-400 mb-6">{org.role}</p>

                                <Link
                                    href={`https://wa.me/${org.contact.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 text-[#25D366] rounded-full hover:bg-[#25D366] hover:text-white transition-all text-sm font-bold"
                                >
                                    <MessageCircle size={16} />
                                    Chat
                                </Link>
                            </div>

                            {/* Scanline overlay only on card */}
                            <div className="absolute inset-0 bg-transparent pointer-events-none group-hover:bg-tva/5 transition-colors"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
