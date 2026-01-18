"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QRCodeSVG } from 'qrcode.react';
import gsap from 'gsap';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
    Users,
    CreditCard,
    FileText,
    Download,
    Edit3,
    LogOut,
    Check,
    AlertCircle,
    Clock,
    Home
} from 'lucide-react';

interface RegistrationData {
    teamName: string;
    teamSize: number;
    leaderDetails: {
        fullName: string;
        email: string;
        mobile: string;
        city: string;
        state: string;
        qualification: string;
        branch: string;
        institution: string;
        enrollmentNumber: string;
        currentlyStudying: string;
        year: string;
    };
    members: Array<{
        fullName: string;
        email: string;
        mobile: string;
        city: string;
        state: string;
        qualification: string;
        branch: string;
        institution: string;
        enrollmentNumber: string;
        currentlyStudying: string;
        year: string;
    }>;
    payment: {
        status: string;
        amount: number;
        transactionId: string;
        paymentDate: string;
    };
    uniqueHexId: string;
    qrCodeData: string;
}

function DashboardContent() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [data, setData] = useState<RegistrationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setData(docSnap.data() as RegistrationData);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            setLoading(false);
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        gsap.fromTo('.dashboard-content',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
    }, [activeTab]);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    const downloadInvoice = async () => {
        if (!data) return;

        try {
            // Dynamic imports
            const [jsPDFModule, QRCodeModule] = await Promise.all([
                import('jspdf'),
                import('qrcode')
            ]);

            const jsPDF = jsPDFModule.jsPDF;
            const QRCode = QRCodeModule.default || QRCodeModule;

            // Generate QR Code
            const qrCodeDataUrl = await QRCode.toDataURL(data.uniqueHexId, {
                width: 100,
                margin: 0,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            });

            // Fetch Logo
            let logoDataUrl = null;
            try {
                const response = await fetch('/hwi_logo_2.jpg');
                const blob = await response.blob();
                logoDataUrl = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob);
                });
            } catch (error) {
                console.error("Failed to load logo", error);
            }

            const doc = new jsPDF();

            // === CONSTANTS ===
            const pageWidth = 210;
            const pageHeight = 297;
            const margin = 20;

            // === COLORS ===
            const black = "#000000";
            const darkGray = "#444444";
            const lightGray = "#f9fafb";
            const borderColor = "#e5e7eb";
            const brandOrange = "#FF8C00"; // HackWithIndia Orange
            const brandBlue = "#000000";
            const hackathonRed = "#dc2626";

            // === HEADER ===
            // Logo (Replaced placeholder with Image)
            if (logoDataUrl) {
                doc.addImage(logoDataUrl, 'JPEG', margin, 20, 24, 24);
            } else {
                // Fallback
                doc.setFillColor(black);
                doc.rect(margin, 20, 24, 24, 'F');
                doc.setTextColor("#FFFFFF");
                doc.setFontSize(10);
                doc.setFont("helvetica", "bold");
                doc.text("HWI", margin + 6, 33.5);
            }


            // Organization Name (Right Aligned)
            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            const orgName = "HACKWITH MUMBAI";
            const orgSuffix = " 2.0";
            const nameWidth = doc.getTextWidth(orgName);
            const suffixWidth = doc.getTextWidth(orgSuffix);

            const headerRightX = pageWidth - margin;

            doc.setTextColor(black);
            doc.text(orgName, headerRightX - suffixWidth - nameWidth, 30);
            doc.setTextColor(hackathonRed);
            doc.text(orgSuffix, headerRightX - suffixWidth, 30);

            // Address
            doc.setFontSize(9);
            doc.setTextColor(darkGray);
            doc.setFont("helvetica", "normal");
            const address = [
                "BVUDET Campus, Navi Mumbai",
                "Maharashtra, India - 400614",
                "hackwithindia.bvdu@gmail.com"
            ];
            address.forEach((line, i) => {
                doc.text(line, headerRightX, 38 + (i * 5), { align: "right" });
            });

            // Invoice Title & Details
            doc.setTextColor(black);
            doc.setFontSize(32);
            doc.setFont("helvetica", "bold");
            doc.text("INVOICE", margin, 65);

            doc.setFontSize(10);
            doc.setTextColor(darkGray);
            doc.setFont("helvetica", "normal");

            doc.text(`#${data.uniqueHexId}`, margin, 74);
            doc.text("ISSUED: " + new Date(data.payment.paymentDate).toLocaleDateString().toUpperCase(), margin, 79);


            // Divider
            doc.setDrawColor(black);
            doc.setLineWidth(0.5);
            doc.line(margin, 88, pageWidth - margin, 88);


            // === BILLING INFO (Grid Layout) ===
            const gridY = 105;
            const col2X = 130;

            // Column 1: Billed To
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150); // Light label
            doc.setFont("helvetica", "bold");
            doc.text("BILLED TO", margin, gridY);

            doc.setFontSize(12);
            doc.setTextColor(black);
            doc.text(data.leaderDetails.fullName.toUpperCase(), margin, gridY + 8);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(data.teamName, margin, gridY + 14);

            doc.setTextColor(darkGray);
            doc.setFontSize(9);
            doc.text(data.leaderDetails.email, margin, gridY + 20);
            doc.text(data.leaderDetails.mobile, margin, gridY + 25);

            // Column 2: Payment Details
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.setFont("helvetica", "bold");
            doc.text("PAYMENT METHOD", col2X, gridY);

            // Razorpay Check
            doc.setFillColor(lightGray);
            doc.roundedRect(col2X, gridY + 4, 35, 16, 1, 1, 'F');
            doc.setTextColor(black);
            doc.setFontSize(7);
            doc.text("VIA RAZORPAY", col2X + 17.5, gridY + 13, { align: "center" });

            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text("TRANSACTION ID", col2X, gridY + 30);

            doc.setFontSize(10);
            doc.setTextColor(black);
            doc.text(data.payment.transactionId, col2X, gridY + 36);


            // === TABLE ===
            const tableY = 155;

            // Table Header
            doc.setFillColor(lightGray);
            doc.rect(margin, tableY, pageWidth - (2 * margin), 10, 'F');

            doc.setFontSize(8);
            doc.setTextColor(darkGray);
            doc.setFont("helvetica", "bold");
            doc.text("DESCRIPTION", margin + 5, tableY + 6.5);
            doc.text("AMOUNT", pageWidth - margin - 5, tableY + 6.5, { align: "right" });

            // Table Row
            const rowY = tableY + 20;

            doc.setFontSize(11);
            doc.setTextColor(black);
            doc.setFont("helvetica", "bold");
            doc.text(`Registration Fee - Team of ${data.teamSize}`, margin + 5, rowY);

            // Tag
            doc.setFillColor("#fee2e2");
            doc.roundedRect(margin + 5, rowY + 4, 28, 6, 1, 1, 'F');
            doc.setTextColor("#991b1b");
            doc.setFontSize(7);
            doc.text("HWI 2.0 ENTRY", margin + 19, rowY + 8, { align: "center" });

            // Amount
            doc.setFontSize(11);
            doc.setTextColor(black);
            doc.setFont("helvetica", "bold");
            doc.text(`INR ${data.payment.amount}`, pageWidth - margin - 5, rowY, { align: "right" });

            // Subtext
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(darkGray);
            doc.text("Official entry pass for HackWithMumbai 2.0", margin + 5, rowY + 16);
            doc.text("Includes participation rights, sway, and meals.", margin + 5, rowY + 21);

            // Divider
            doc.setDrawColor(borderColor);
            doc.line(margin, rowY + 30, pageWidth - margin, rowY + 30);


            // === TOTAL ===
            const totalY = rowY + 45;

            // Thick Line
            doc.setDrawColor(black);
            doc.setLineWidth(1);
            // Draw line shorter and aligned to right
            doc.line(pageWidth - margin - 80, totalY - 5, pageWidth - margin, totalY - 5);

            doc.setFontSize(14);
            doc.setTextColor(black);
            doc.setFont("helvetica", "bold");
            // Right align label with some padding from amount
            doc.text("TOTAL PAID", pageWidth - margin - 50, totalY + 5, { align: "right" });

            doc.setFontSize(16);
            doc.setTextColor(brandOrange);
            doc.setFont("courier", "bold");
            doc.text(`INR ${data.payment.amount}.00`, pageWidth - margin - 5, totalY + 5, { align: "right" });

            doc.setFontSize(7);
            doc.setTextColor(150, 150, 150);
            doc.setFont("helvetica", "normal");
            doc.text("Inclusive of all applicable taxes", pageWidth - margin - 5, totalY + 12, { align: "right" });


            // === FOOTER (QR & Sign) ===
            const footerY = 250;

            // QR Code
            try {
                doc.addImage(qrCodeDataUrl, 'PNG', margin, footerY, 25, 25);
            } catch (err) {
                console.error("QR Error", err);
                // Fallback box
                doc.setDrawColor(black);
                doc.rect(margin, footerY, 25, 25);
            }

            // Terms
            doc.setFontSize(7);
            doc.setTextColor(150, 150, 150);
            const termsX = margin + 35;
            doc.text("TERMS & CONDITIONS", termsX, footerY + 5);
            doc.setTextColor(100, 100, 100);
            doc.text("1. This receipt is valid proof of registration.", termsX, footerY + 10);
            doc.text("2. Please present the QR code at the registration desk.", termsX, footerY + 14);
            doc.text("3. Registration is non-transferable.", termsX, footerY + 18);

            // Signature
            const signX = pageWidth - margin - 40;
            doc.setFillColor(lightGray);
            doc.rect(signX, footerY + 5, 40, 15, 'F');

            doc.setDrawColor(darkGray);
            doc.setLineWidth(0.5);
            doc.line(signX + 5, footerY + 15, signX + 35, footerY + 15);

            doc.setFontSize(5);
            doc.setTextColor(darkGray);
            doc.text("AUTHORIZED SIGNATORY", signX + 20, footerY + 19, { align: "center" });
            doc.text("HACKWITH MUMBAI", signX + 20, footerY + 12, { align: "center" });

            doc.save(`HWI_Invoice_${data.uniqueHexId}.pdf`);

        } catch (error) {
            console.error("Failed to generate PDF", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-hackathon-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-hackathon-orange font-mono">LOADING DATA...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
                <div className="fixed inset-0 vignette pointer-events-none" />
                <div className="scanline" />

                <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                    <div className="tva-terminal max-w-md w-full p-8 text-center">
                        <AlertCircle className="w-16 h-16 text-hackathon-orange mx-auto mb-4" />
                        <h2 className="text-2xl font-orbitron text-hackathon-orange mb-4">No Registration Found</h2>
                        <p className="text-gray-400 font-courier mb-6">
                            You haven't registered for the hackathon yet.
                        </p>
                        <button
                            onClick={() => router.push('/register')}
                            className="btn-primary font-orbitron"
                        >
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const isPaid = data.payment.status === 'paid';

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Users },
        { id: 'team', label: 'Team Details', icon: Users },
        { id: 'payment', label: 'Payment', icon: CreditCard },
        { id: 'documents', label: 'Documents', icon: FileText },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden pt-20 pb-10">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
            <div className="fixed inset-0 vignette pointer-events-none" />
            <div className="scanline" />

            <div className="relative z-10 min-h-screen">
                {/* Header */}
                <header className="border-b border-hackathon-orange/30 bg-black/50 backdrop-blur-sm mb-8">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-cinzel font-bold gradient-text">Dashboard</h1>
                            <p className="text-sm text-gray-400 font-courier">Welcome, {data.leaderDetails.fullName}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => router.push('/')}
                                className="btn-secondary flex items-center gap-2 text-sm"
                            >
                                <Home className="w-4 h-4" />
                                Home
                            </button>
                            <button
                                onClick={handleLogout}
                                className="btn-secondary flex items-center gap-2 text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="hackathon-card text-center">
                            <p className="text-gray-400 font-courier text-sm mb-1">Team</p>
                            <p className="text-xl font-orbitron text-hackathon-orange">{data.teamName}</p>
                        </div>
                        <div className="hackathon-card text-center">
                            <p className="text-gray-400 font-courier text-sm mb-1">Size</p>
                            <p className="text-xl font-orbitron text-hackathon-orange">{data.teamSize}</p>
                        </div>
                        <div className="hackathon-card text-center">
                            <p className="text-gray-400 font-courier text-sm mb-1">Unique ID</p>
                            <p className="text-xl font-orbitron text-hackathon-orange">{data.uniqueHexId}</p>
                        </div>
                        <div className="hackathon-card text-center">
                            <p className="text-gray-400 font-courier text-sm mb-1">Status</p>
                            <div className={`flex items-center justify-center gap-2 ${isPaid ? 'text-hackathon-loki' : 'text-yellow-500'}`}>
                                {isPaid ? <Check className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                                <span className="text-xl font-orbitron">{isPaid ? 'Paid' : 'Pending'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-courier text-sm whitespace-nowrap transition-all ${activeTab === tab.id
                                        ? 'bg-[#ff8c00] text-black font-bold'
                                        : 'bg-black/50 text-gray-400 hover:text-[#ff8c00] border border-[#ff8c00]/30'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab Content */}
                    <div className="dashboard-content tva-terminal p-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center border-b border-hackathon-orange/30 pb-4">
                                    <h2 className="text-xl font-orbitron text-hackathon-orange">Registration Overview</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="hackathon-card">
                                            <h3 className="text-hackathon-orange font-courier mb-3">Team Information</h3>
                                            <div className="space-y-2 text-sm font-courier">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Team Name:</span>
                                                    <span>{data.teamName}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Team Size:</span>
                                                    <span>{data.teamSize} members</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-400">Unique ID:</span>
                                                    <span className="text-hackathon-orange">{data.uniqueHexId}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="hackathon-card">
                                            <h3 className="text-hackathon-orange font-courier mb-3">Payment Status</h3>
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isPaid ? 'bg-hackathon-loki/20' : 'bg-yellow-500/20'
                                                    }`}>
                                                    {isPaid ? <Check className="w-6 h-6 text-hackathon-loki" /> : <Clock className="w-6 h-6 text-yellow-500" />}
                                                </div>
                                                <div>
                                                    <p className={`font-orbitron ${isPaid ? 'text-hackathon-loki' : 'text-yellow-500'}`}>
                                                        {isPaid ? 'Payment Confirmed' : 'Payment Pending'}
                                                    </p>
                                                    <p className="text-sm text-gray-400 font-courier">₹{data.payment.amount}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hackathon-card flex flex-col items-center justify-center">
                                        <p className="text-gray-400 font-courier mb-4">Your Entry QR Code</p>
                                        <div className="bg-white p-4 rounded-lg">
                                            <QRCodeSVG value={data.qrCodeData} size={180} />
                                        </div>
                                        <p className="text-xs text-gray-500 font-courier mt-4 text-center">
                                            Show this at the venue for verification
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'team' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center border-b border-hackathon-orange/30 pb-4">
                                    <h2 className="text-xl font-orbitron text-hackathon-orange">Team Details</h2>
                                    {!isPaid && (
                                        <button className="btn-secondary flex items-center gap-2 text-sm">
                                            <Edit3 className="w-4 h-4" />
                                            Edit
                                        </button>
                                    )}
                                </div>

                                {isPaid && (
                                    <div className="bg-hackathon-orange/10 border border-hackathon-orange/30 rounded-lg p-4 mb-4">
                                        <p className="text-sm font-courier text-hackathon-orange flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4" />
                                            Team details are locked after payment. Contact support for changes.
                                        </p>
                                    </div>
                                )}

                                <div className="space-y-6">
                                    {/* Leader */}
                                    <div className="hackathon-card">
                                        <h3 className="text-hackathon-orange font-courier mb-4 flex items-center gap-2">
                                            <Users className="w-5 h-5" />
                                            Member 01 (Team Leader)
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4 text-sm font-courier">
                                            <div><span className="text-gray-400">Name:</span> {data.leaderDetails.fullName}</div>
                                            <div><span className="text-gray-400">Email:</span> {data.leaderDetails.email}</div>
                                            <div><span className="text-gray-400">Mobile:</span> {data.leaderDetails.mobile}</div>
                                            <div><span className="text-gray-400">City:</span> {data.leaderDetails.city}</div>
                                            <div><span className="text-gray-400">State:</span> {data.leaderDetails.state}</div>
                                            <div><span className="text-gray-400">Institution:</span> {data.leaderDetails.institution}</div>
                                            <div><span className="text-gray-400">Qualification:</span> {data.leaderDetails.qualification}</div>
                                            <div><span className="text-gray-400">Branch:</span> {data.leaderDetails.branch}</div>
                                        </div>
                                    </div>

                                    {/* Other Members */}
                                    {data.members.map((member, index) => (
                                        <div key={index} className="hackathon-card">
                                            <h3 className="text-hackathon-orange font-courier mb-4 flex items-center gap-2">
                                                <Users className="w-5 h-5" />
                                                Member {String(index + 2).padStart(2, '0')}
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-4 text-sm font-courier">
                                                <div><span className="text-gray-400">Name:</span> {member.fullName}</div>
                                                <div><span className="text-gray-400">Email:</span> {member.email}</div>
                                                <div><span className="text-gray-400">Mobile:</span> {member.mobile}</div>
                                                <div><span className="text-gray-400">City:</span> {member.city}</div>
                                                <div><span className="text-gray-400">State:</span> {member.state}</div>
                                                <div><span className="text-gray-400">Institution:</span> {member.institution}</div>
                                                <div><span className="text-gray-400">Qualification:</span> {member.qualification}</div>
                                                <div><span className="text-gray-400">Branch:</span> {member.branch}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'payment' && (
                            <div className="space-y-6">
                                <div className="border-b border-hackathon-orange/30 pb-4">
                                    <h2 className="text-xl font-orbitron text-hackathon-orange">Payment History</h2>
                                </div>

                                <div className="hackathon-card">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPaid ? 'bg-hackathon-loki/20' : 'bg-yellow-500/20'
                                                }`}>
                                                {isPaid ? <Check className="w-5 h-5 text-hackathon-loki" /> : <Clock className="w-5 h-5 text-yellow-500" />}
                                            </div>
                                            <div>
                                                <p className="font-orbitron text-white">Registration Fee</p>
                                                <p className="text-sm text-gray-400 font-courier">
                                                    {new Date(data.payment.paymentDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-orbitron text-hackathon-orange">₹{data.payment.amount}</p>
                                            <p className={`text-sm font-courier ${isPaid ? 'text-hackathon-loki' : 'text-yellow-500'}`}>
                                                {data.payment.status.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-t border-hackathon-orange/30 pt-4">
                                        <div className="text-sm font-courier space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Transaction ID:</span>
                                                <span>{data.payment.transactionId}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Payment Date:</span>
                                                <span>{new Date(data.payment.paymentDate).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {!isPaid && (
                                    <button className="btn-primary w-full font-orbitron">
                                        Complete Payment
                                    </button>
                                )}
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="space-y-6">
                                <div className="border-b border-hackathon-orange/30 pb-4">
                                    <h2 className="text-xl font-orbitron text-hackathon-orange">Documents</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="hackathon-card">
                                        <h3 className="text-hackathon-orange font-courier mb-4">Official Receipt</h3>
                                        <div className="text-sm font-courier text-gray-400 mb-4">
                                            <p>• Team Size: {data.teamSize} members</p>
                                            <p>• Amount: ₹{data.payment.amount}</p>
                                            <p>• Transaction ID: {data.payment.transactionId}</p>
                                            <p>• Unique ID: {data.uniqueHexId}</p>
                                        </div>
                                        <button
                                            onClick={downloadInvoice}
                                            className="btn-secondary w-full flex items-center justify-center gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download Receipt
                                        </button>
                                    </div>

                                    <div className="hackathon-card flex flex-col items-center">
                                        <h3 className="text-hackathon-orange font-courier mb-4">Entry QR Code</h3>
                                        <div className="bg-white p-4 rounded-lg mb-4">
                                            <QRCodeSVG value={data.qrCodeData} size={150} />
                                        </div>
                                        <p className="text-xs text-gray-500 font-courier text-center">
                                            Digitally signed by<br />
                                            HACKWITHINDIA BVUDET NM CHAPTER
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
                <DashboardContent />
            </Suspense>
        </ProtectedRoute>
    );
}
