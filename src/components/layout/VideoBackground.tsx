export default function VideoBackground() {
    return (
        <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover opacity-60 mix-blend-screen"
            >
                <source src="/bgvid/bgtheme.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>
        </div>
    );
}
