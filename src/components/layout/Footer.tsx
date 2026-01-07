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

                <div className="mt-8 pt-8 border-t border-white/5 w-full max-w-md mx-auto flex flex-col items-center">
                    <p className="font-retro text-[10px] text-gray-600 uppercase tracking-widest mb-3">Designed & Developed by</p>
                    <a href="https://linktr.ee/adapts.co" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                        <img
                            src="/adapts_logo.png"
                            alt="ADAPTS.CO"
                            className="h-6 w-auto object-contain filter group-hover:brightness-125 transition-all"
                        />
                        <span className="font-cinematic text-sm text-tva font-bold tracking-widest group-hover:text-scarlet transition-colors">ADAPTS.CO</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
