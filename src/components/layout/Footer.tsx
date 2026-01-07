export default function Footer() {
    return (
        <footer className="relative py-12 bg-black text-center border-t border-white/10 overflow-hidden">
            {/* Static Noise Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-noise"></div>

            <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-2xl font-cinematic text-gray-500 mb-4 tracking-[0.5em] animate-pulse">
                    END OF TRANSMISSION
                </h2>

                <div className="flex gap-6 mb-8">
                    {/* Social Placeholders */}
                    {['Instagram', 'LinkedIn', 'Twitter'].map((social) => (
                        <a key={social} href="#" className="font-retro text-sm text-gray-600 hover:text-tva transition-colors uppercase">
                            {social}
                        </a>
                    ))}
                </div>

                <p className="font-retro text-xs text-gray-700">
                    &copy; 2026 HackWithMumbai 2.0. All Timeline Variants Reserved.
                </p>
            </div>
        </footer>
    );
}
