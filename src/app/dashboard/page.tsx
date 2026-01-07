"use client";

import Navbar from "@/components/common/Navbar";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { RegistrationData } from "@/types/registration";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Download, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const [registration, setRegistration] = useState<RegistrationData & { teamId?: string; payment?: any } | null>(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        async function fetchRegistration() {
            if (user) {
                try {
                    const q = query(collection(db, "registrations"), where("userId", "==", user.uid));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        setRegistration(querySnapshot.docs[0].data() as any);
                    }
                } catch (err) {
                    console.error("Error fetching registration:", err);
                } finally {
                    setFetching(false);
                }
            }
        }
        if (!loading) fetchRegistration();
    }, [user, loading]);

    if (loading || fetching) return <div className="h-screen bg-black flex items-center justify-center text-primary animate-pulse">LOADING DASHBOARD...</div>;

    return (
        <main className="min-h-screen pb-20">
            <Navbar />

            <div className="pt-24 container mx-auto px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-8 text-secondary uppercase tracking-widest">
                    Mission Dashboard
                </h1>

                {!registration ? (
                    <div className="bg-white/5 border border-white/10 p-8 rounded-lg text-center">
                        <AlertTriangle className="mx-auto text-yellow-500 mb-4 w-12 h-12" />
                        <h2 className="text-2xl font-bold mb-4">No Active Mission Found</h2>
                        <Link href="/register">
                            <button className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 rounded font-bold uppercase transition-all">
                                Initialize Registration
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Status Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="col-span-1 md:col-span-2 bg-gradient-to-br from-black to-gray-900 border border-white/10 p-6 md:p-8 rounded-lg shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-4 right-4 animate-pulse">
                                <div className={`w-3 h-3 rounded-full ${registration.payment?.status === "paid" ? "bg-green-500" : "bg-yellow-500"}`}></div>
                            </div>

                            <h2 className="text-xl text-muted-foreground font-mono mb-2">OPERATIVE TEAM</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 text-glow">{registration.teamName}</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                                <div>
                                    <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Team Leader</span>
                                    <div className="text-lg font-semibold">{registration.leader.fullName}</div>
                                    <div className="text-sm text-gray-400">{registration.leader.email}</div>
                                </div>
                                <div>
                                    <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Team ID</span>
                                    <div className="text-lg font-semibold font-mono text-accent">{registration.teamId || "PENDING"}</div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                                <div>
                                    <span className="text-xs text-muted-foreground uppercase tracking-widest block mb-1">Status</span>
                                    <div className={`flex items-center gap-2 font-bold ${registration.payment?.status === "paid" ? "text-green-500" : "text-yellow-500"}`}>
                                        {registration.payment?.status === "paid" ? <CheckCircle size={18} /> : <Clock size={18} />}
                                        {registration.payment?.status === "paid" ? "MISSION AUTHORIZED" : "PAYMENT PENDING"}
                                    </div>
                                </div>

                                {registration.payment?.status === "paid" && (
                                    <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded transition-colors text-sm font-semibold">
                                        <Download size={16} /> Invoice
                                    </button>
                                )}

                                {registration.payment?.status !== "paid" && (
                                    <Link href="/register">
                                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold uppercase transition-all">
                                            Resume Payment
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </motion.div>

                        {/* QR Code Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="col-span-1 bg-white p-6 rounded-lg flex flex-col items-center justify-center text-black"
                        >
                            <h3 className="text-lg font-bold mb-4 uppercase tracking-widest text-center border-b border-black/10 pb-2 w-full">Access Pass</h3>
                            {/* Placeholder QR */}
                            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center mb-4">
                                <span className="font-mono text-xs text-gray-500 text-center px-2">
                                    QR CODE GENERATED FOR TEAM: {registration.teamId}
                                </span>
                            </div>
                            <p className="text-xs text-center font-mono text-gray-600">
                                Present this code at check-in.
                                <br />
                                DO NOT SHARE.
                            </p>
                        </motion.div>
                    </div>
                )}
            </div>
        </main>
    );
}
