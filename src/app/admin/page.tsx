"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QRCodeSVG } from 'qrcode.react';
import gsap from 'gsap';
import {
    Users,
    DollarSign,
    CreditCard,
    Clock,
    Check,
    Search,
    Download,
    Eye,
    X,
    QrCode,
    Lock,
    AlertCircle
} from 'lucide-react';

interface TeamData {
    id: string;
    teamName: string;
    teamSize: number;
    leaderDetails: {
        fullName: string;
        email: string;
        mobile: string;
        city: string;
        state: string;
        institution: string;
    };
    members: Array<{
        fullName: string;
        email: string;
        mobile: string;
        institution: string;
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

import { useAuth } from '@/contexts/AuthContext';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const ADMIN_PASSWORD = 'HACK@2025';

export default function AdminPage() {
    const { user, signInWithGoogle } = useAuth();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [teams, setTeams] = useState<TeamData[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTeam, setSelectedTeam] = useState<TeamData | null>(null);
    const [showScanner, setShowScanner] = useState(false);
    const [scanResult, setScanResult] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            fetchTeams();
        }
    }, [isAuthenticated]);

    useEffect(() => {
        gsap.fromTo('.admin-content',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
    }, [isAuthenticated, selectedTeam]);

    const handleLogin = async () => {
        if (password === ADMIN_PASSWORD) {
            if (!user) {
                try {
                    await signInWithGoogle();
                } catch (error) {
                    console.error("Login failed", error);
                    return;
                }
            }
            setIsAuthenticated(true);
            setPasswordError('');
        } else {
            setPasswordError('Invalid password');
        }
    };

    const fetchTeams = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const teamData: TeamData[] = [];
            snapshot.forEach((doc) => {
                teamData.push({ id: doc.id, ...doc.data() } as TeamData);
            });
            setTeams(teamData);
        } catch (error: any) {
            console.error('Error fetching teams:', error);
            if (error.code === 'permission-denied') {
                toast.error(`Permission Denied! Logged in as: ${user?.email || 'Unknown'}. Update Firestore Rules to 'allow read: if request.auth != null;'`);
            } else if (error.code === 'failed-precondition') {
                toast.error('Missing Firestore Index! Check console for the creation link.');
                console.warn('Click this link to create the missing index:', error.message);
            } else {
                toast.error(`Failed to load teams: ${error.message}`);
            }
        }
        setLoading(false);
    };

    const filteredTeams = teams.filter((team) => {
        const matchesFilter =
            filter === 'all' ||
            (filter === 'paid' && team.payment.status === 'paid') ||
            (filter === 'pending' && team.payment.status !== 'paid');

        const matchesSearch =
            searchTerm === '' ||
            team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            team.uniqueHexId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            team.payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const metrics = {
        totalTeams: teams.length,
        totalAmount: teams.reduce((sum, t) => sum + (t.payment.status === 'paid' ? t.payment.amount : 0), 0),
        totalParticipants: teams.reduce((sum, t) => sum + t.teamSize, 0),
        paidTeams: teams.filter((t) => t.payment.status === 'paid').length,
        pendingTeams: teams.filter((t) => t.payment.status !== 'paid').length,
    };

    const exportCSV = () => {
        const headers = [
            'Team Name',
            'Unique ID',
            'Team Size',
            'Payment Status',
            'Amount',
            'Transaction ID',
            'Leader Name',
            'Leader Email',
            'Leader Mobile',
            'Leader Institution',
            'Member Names',
            'Member Emails',
        ];

        const rows = teams.map((t) => [
            t.teamName,
            t.uniqueHexId,
            t.teamSize,
            t.payment.status,
            t.payment.amount,
            t.payment.transactionId,
            t.leaderDetails.fullName,
            t.leaderDetails.email,
            t.leaderDetails.mobile,
            t.leaderDetails.institution,
            t.members?.map((m) => m.fullName).join('; ') || '',
            t.members?.map((m) => m.email).join('; ') || '',
        ]);

        const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `HackWithIndia_Teams_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const [scanner, setScanner] = useState<any>(null);

    useEffect(() => {
        let html5QrcodeScanner: any = null;

        if (showScanner) {
            // Dynamic import to avoid SSR issues with html5-qrcode
            import('html5-qrcode').then(({ Html5QrcodeScanner }) => {
                html5QrcodeScanner = new Html5QrcodeScanner(
                    "reader",
                    { fps: 10, qrbox: { width: 250, height: 250 } },
                    /* verbose= */ false
                );

                html5QrcodeScanner.render((decodedText: string) => {
                    handleQRVerify(decodedText);
                    // Optional: Stop scanning after success if desired
                    // html5QrcodeScanner.clear();
                }, (errorMessage: string) => {
                    // parse error, ignore usually
                });

                setScanner(html5QrcodeScanner);
            });
        }

        return () => {
            if (html5QrcodeScanner) {
                html5QrcodeScanner.clear().catch((error: any) => console.error("Failed to clear scanner", error));
            }
        };
    }, [showScanner]);

    const handleQRVerify = (scannedData: string) => {
        try {
            // Support both direct uniqueID scan or JSON scan
            let uniqueId = scannedData;
            try {
                const data = JSON.parse(scannedData);
                uniqueId = data.uniqueHexId || data.uniqueId; // Handle both potential formats
            } catch (e) {
                // Not JSON, assume direct ID string
            }

            const team = teams.find((t) => t.uniqueHexId === uniqueId);

            if (team) {
                setScanResult(`✓ Valid Team Found: ${team.teamName} (${team.uniqueHexId}) - Status: ${team.payment.status.toUpperCase()}`);
                toast.success("Team Verified Successfully!");
            } else {
                setScanResult('✗ Invalid QR Code: Team not found in database.');
                toast.error("Invalid QR Code!");
            }
        } catch (error) {
            setScanResult('✗ Error processing QR Code');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
                <div className="fixed inset-0 vignette pointer-events-none" />
                <div className="scanline" />

                <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                    <div className="tva-terminal max-w-md w-full p-8">
                        <div className="flex justify-between items-center mb-6 border-b border-hackathon-orange/50 pb-4">
                            <span className="text-hackathon-orange font-courier text-sm">ADMIN ACCESS TERMINAL</span>
                            <Lock className="w-5 h-5 text-hackathon-scarlet" />
                        </div>

                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-cinzel font-bold gradient-text mb-2">Reality Control Room</h1>
                            <p className="text-gray-400 font-courier text-sm">Enter admin credentials</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-courier text-gray-400 mb-2">Access Code</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                    className="futuristic-input w-full"
                                    placeholder="Enter password"
                                />
                                {passwordError && (
                                    <p className="text-hackathon-scarlet text-sm font-courier mt-2">{passwordError}</p>
                                )}
                            </div>

                            <button onClick={handleLogin} className="btn-primary w-full font-orbitron">
                                Access Portal
                            </button>

                            <button
                                onClick={() => router.push('/')}
                                className="btn-secondary w-full font-orbitron text-sm"
                            >
                                Return to Timeline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden pt-20 pb-10">
            <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
            <div className="fixed inset-0 vignette pointer-events-none" />
            <div className="scanline" />

            <div className="relative z-10 min-h-screen">
                {/* Header */}
                <header className="border-b border-hackathon-orange/30 bg-black/50 backdrop-blur-sm mb-8">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-cinzel font-bold gradient-text">Reality Control Room</h1>
                            <p className="text-sm text-gray-400 font-courier">Admin Portal</p>
                        </div>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="btn-secondary text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 admin-content">
                    {/* Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        <div className="hackathon-card text-center">
                            <Users className="w-8 h-8 text-hackathon-orange mx-auto mb-2" />
                            <p className="text-2xl font-orbitron text-white">{metrics.totalTeams}</p>
                            <p className="text-xs text-gray-400 font-courier">Total Teams</p>
                        </div>
                        <div className="hackathon-card text-center">
                            <DollarSign className="w-8 h-8 text-hackathon-loki mx-auto mb-2" />
                            <p className="text-2xl font-orbitron text-white">₹{metrics.totalAmount}</p>
                            <p className="text-xs text-gray-400 font-courier">Amount Received</p>
                        </div>
                        <div className="hackathon-card text-center">
                            <Users className="w-8 h-8 text-hackathon-blue mx-auto mb-2" />
                            <p className="text-2xl font-orbitron text-white">{metrics.totalParticipants}</p>
                            <p className="text-xs text-gray-400 font-courier">Participants</p>
                        </div>
                        <div className="hackathon-card text-center">
                            <Check className="w-8 h-8 text-hackathon-loki mx-auto mb-2" />
                            <p className="text-2xl font-orbitron text-white">{metrics.paidTeams}</p>
                            <p className="text-xs text-gray-400 font-courier">Paid Teams</p>
                        </div>
                        <div className="hackathon-card text-center">
                            <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                            <p className="text-2xl font-orbitron text-white">{metrics.pendingTeams}</p>
                            <p className="text-xs text-gray-400 font-courier">Pending</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="tva-terminal p-6 mb-6">
                        <div className="flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex gap-2">
                                {['all', 'paid', 'pending'].map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-4 py-2 rounded-lg font-courier text-sm capitalize ${filter === f
                                            ? 'bg-[#ff8c00] text-black font-bold'
                                            : 'bg-black/50 text-gray-400 border border-[#ff8c00]/30'
                                            }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="futuristic-input pl-10 w-64"
                                        placeholder="Search team, ID, transaction..."
                                    />
                                </div>

                                <button onClick={exportCSV} className="btn-secondary flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Export CSV
                                </button>

                                <button
                                    onClick={() => setShowScanner(true)}
                                    className="btn-secondary flex items-center gap-2"
                                >
                                    <QrCode className="w-4 h-4" />
                                    Scan QR
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Teams Table */}
                    <div className="tva-terminal overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-hackathon-orange/30">
                                        <th className="text-left p-4 text-hackathon-orange font-courier text-sm">Team Name</th>
                                        <th className="text-left p-4 text-hackathon-orange font-courier text-sm">Unique ID</th>
                                        <th className="text-left p-4 text-hackathon-orange font-courier text-sm">Size</th>
                                        <th className="text-left p-4 text-hackathon-orange font-courier text-sm">Status</th>
                                        <th className="text-left p-4 text-hackathon-orange font-courier text-sm">Amount</th>
                                        <th className="text-left p-4 text-hackathon-orange font-courier text-sm">Transaction</th>
                                        <th className="text-left p-4 text-hackathon-orange font-courier text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center">
                                                <div className="w-8 h-8 border-2 border-hackathon-orange border-t-transparent rounded-full animate-spin mx-auto" />
                                            </td>
                                        </tr>
                                    ) : filteredTeams.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-gray-400 font-courier">
                                                No teams found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTeams.map((team) => (
                                            <tr key={team.id} className="border-b border-hackathon-orange/10 hover:bg-hackathon-orange/5">
                                                <td className="p-4 font-courier">{team.teamName}</td>
                                                <td className="p-4 font-courier text-hackathon-orange">{team.uniqueHexId}</td>
                                                <td className="p-4 font-courier">{team.teamSize}</td>
                                                <td className="p-4">
                                                    <span
                                                        className={`px-2 py-1 rounded text-xs font-courier ${team.payment.status === 'paid'
                                                            ? 'bg-hackathon-loki/20 text-hackathon-loki'
                                                            : 'bg-yellow-500/20 text-yellow-500'
                                                            }`}
                                                    >
                                                        {team.payment.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 font-courier">₹{team.payment.amount}</td>
                                                <td className="p-4 font-courier text-sm">{team.payment.transactionId}</td>
                                                <td className="p-4">
                                                    <button
                                                        onClick={() => setSelectedTeam(team)}
                                                        className="p-2 text-hackathon-orange hover:bg-hackathon-orange/10 rounded"
                                                        aria-label="View Team Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Team Detail Modal */}
                {selectedTeam && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                        <div className="tva-terminal max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                            <div className="flex justify-between items-center mb-6 border-b border-hackathon-orange/30 pb-4">
                                <h2 className="text-xl font-orbitron text-hackathon-orange">{selectedTeam.teamName}</h2>
                                <button onClick={() => setSelectedTeam(null)} className="text-gray-400 hover:text-white" aria-label="Close Modal">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="hackathon-card">
                                        <h3 className="text-hackathon-orange font-courier mb-3">Team Info</h3>
                                        <div className="space-y-2 text-sm font-courier">
                                            <p><span className="text-gray-400">Unique ID:</span> {selectedTeam.uniqueHexId}</p>
                                            <p><span className="text-gray-400">Size:</span> {selectedTeam.teamSize}</p>
                                            <p><span className="text-gray-400">Status:</span> {selectedTeam.payment.status}</p>
                                            <p><span className="text-gray-400">Amount:</span> ₹{selectedTeam.payment.amount}</p>
                                            <p><span className="text-gray-400">Transaction:</span> {selectedTeam.payment.transactionId}</p>
                                        </div>
                                    </div>

                                    <div className="hackathon-card">
                                        <h3 className="text-hackathon-orange font-courier mb-3">Leader</h3>
                                        <div className="space-y-2 text-sm font-courier">
                                            <p><span className="text-gray-400">Name:</span> {selectedTeam.leaderDetails.fullName}</p>
                                            <p><span className="text-gray-400">Email:</span> {selectedTeam.leaderDetails.email}</p>
                                            <p><span className="text-gray-400">Mobile:</span> {selectedTeam.leaderDetails.mobile}</p>
                                            <p><span className="text-gray-400">Institution:</span> {selectedTeam.leaderDetails.institution}</p>
                                        </div>
                                    </div>

                                    {selectedTeam.members?.map((member, i) => (
                                        <div key={i} className="hackathon-card">
                                            <h3 className="text-hackathon-orange font-courier mb-3">Member {i + 2}</h3>
                                            <div className="space-y-2 text-sm font-courier">
                                                <p><span className="text-gray-400">Name:</span> {member.fullName}</p>
                                                <p><span className="text-gray-400">Email:</span> {member.email}</p>
                                                <p><span className="text-gray-400">Mobile:</span> {member.mobile}</p>
                                                <p><span className="text-gray-400">Institution:</span> {member.institution}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="hackathon-card flex flex-col items-center justify-center">
                                    <p className="text-gray-400 font-courier mb-4">QR Code</p>
                                    <div className="bg-white p-4 rounded-lg">
                                        <QRCodeSVG value={selectedTeam.qrCodeData} size={180} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* QR Scanner Modal */}
                {showScanner && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                        <div className="tva-terminal max-w-md w-full p-6">
                            <div className="flex justify-between items-center mb-6 border-b border-hackathon-orange/30 pb-4">
                                <h2 className="text-xl font-orbitron text-hackathon-orange">QR Verification</h2>
                                <button onClick={() => { setShowScanner(false); setScanResult(null); }} className="text-gray-400 hover:text-white" aria-label="Close Scanner">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div id="reader" className="w-full bg-black border border-hackathon-orange/30 rounded-lg overflow-hidden"></div>

                                {scanResult ? (
                                    <div className={`p-4 rounded-lg font-courier border ${scanResult.includes('Valid')
                                        ? 'bg-hackathon-loki/20 border-hackathon-loki text-hackathon-loki'
                                        : 'bg-hackathon-scarlet/20 border-hackathon-scarlet text-hackathon-scarlet'
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            {scanResult.includes('Valid')
                                                ? <Check className="w-6 h-6 shrink-0" />
                                                : <AlertCircle className="w-6 h-6 shrink-0" />
                                            }
                                            <p className="font-bold">{scanResult}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-400 font-courier text-xs animate-pulse">
                                        Initializing Camera Feed...
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
