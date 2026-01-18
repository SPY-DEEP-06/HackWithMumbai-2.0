"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Chrome, X } from 'lucide-react';
import gsap from 'gsap';

function AuthContent() {
    const { user, signInWithGoogle, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const from = searchParams.get('from') || '/dashboard';

    useEffect(() => {
        if (user && !loading) {
            router.replace(from);
        }
    }, [user, loading, router, from]);

    useEffect(() => {
        // GSAP animations
        gsap.fromTo('.auth-container',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );
        gsap.fromTo('.auth-title',
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.8, delay: 0.3, ease: 'back.out(1.7)' }
        );
        gsap.fromTo('.auth-button',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' }
        );
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error('Sign in failed:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-hackathon-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-hackathon-orange font-mono">INITIALIZING...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
            <div className="fixed inset-0 vignette pointer-events-none" />
            <div className="scanline" />

            {/* Close Button */}
            <Link
                href="/"
                className="absolute top-6 right-6 z-50 p-2 text-hackathon-orange hover:text-white transition-colors rounded-full hover:bg-white/10"
            >
                <X className="w-8 h-8" />
            </Link>

            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <div className="auth-container tva-terminal max-w-md w-full p-8">
                    {/* Terminal Header */}
                    <div className="flex justify-between items-center mb-6 border-b border-hackathon-orange/50 pb-4">
                        <span className="text-hackathon-orange font-courier text-sm">TVA AUTH TERMINAL v2.0</span>
                        <span className="text-hackathon-loki font-courier text-sm animate-pulse">● ONLINE</span>
                    </div>

                    {/* Logo & Title */}
                    <div className="text-center mb-8">
                        <h1 className="auth-title text-4xl font-cinzel font-bold gradient-text mb-2">
                            HackWithIndia
                        </h1>
                        <p className="text-hackathon-orange font-courier text-sm">
                            BVUDET NM CHAPTER
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-hackathon-orange to-transparent mx-auto mt-4" />
                    </div>

                    {/* Terminal Text */}
                    <div className="mb-8 font-courier text-gray-400 text-sm">
                        <p className="mb-2"><span className="text-hackathon-scarlet">&gt;</span> Authentication required</p>
                        <p className="mb-2"><span className="text-hackathon-scarlet">&gt;</span> Sign in to access the multiverse</p>
                        <p><span className="text-hackathon-scarlet">&gt;</span> Team leaders only<span className="animate-flicker">_</span></p>
                    </div>

                    {/* Google Sign In Button */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="auth-button w-full btn-primary flex items-center justify-center gap-3 text-lg font-orbitron"
                        title="Sign in with Google"
                        aria-label="Sign in with Google"
                    >
                        <Chrome className="w-6 h-6" />
                        Sign in with Google
                    </button>

                    {/* Footer */}
                    <p className="text-center text-gray-500 text-xs font-courier mt-8">
                        By signing in, you agree to the hackathon rules and code of conduct.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthContent />
        </Suspense>
    );
}
