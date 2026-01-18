"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            router.replace(`/auth?from=${pathname}`);
        }
    }, [user, loading, router, pathname]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-hackathon-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-hackathon-orange font-mono">AUTHENTICATING...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // Or a loading spinner while redirecting
    }

    return <>{children}</>;
};

export default ProtectedRoute;
