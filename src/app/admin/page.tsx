"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { RegistrationData } from "@/types/registration";
import { motion } from "framer-motion";
import { Search, Download, ShieldCheck, Lock } from "lucide-react";

const ADMIN_PASS = "HACK@2025";

export default function AdminPage() {
    const [authorized, setAuthorized] = useState(false);
    const [password, setPassword] = useState("");
    const [teams, setTeams] = useState<(RegistrationData & { teamId?: string; payment?: any })[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASS) {
            setAuthorized(true);
            fetchData();
        } else {
            alert("ACCESS DENIED");
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "registrations"));
            const data: any[] = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            setTeams(data);
        } catch (err) {
            console.error("Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredTeams = teams.filter(t =>
        t.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.leader.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.teamId && t.teamId.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const stats = {
        totalTeams: teams.length,
        totalRevenue: teams.reduce((acc, curr) => acc + (curr.payment?.status === "paid" ? curr.amount : 0), 0),
        totalParticipants: teams.reduce((acc, curr) => acc + curr.teamSize, 0),
        paidTeams: teams.filter(t => t.payment?.status === "paid").length,
    };

    const exportToCSV = () => {
        const headers = ["Team ID", "Team Name", "Leader Name", "Leader Email", "Team Size", "Status", "Amount"];
        const rows = filteredTeams.map(t => [
            t.teamId || "PENDING",
            t.teamName,
            t.leader.fullName,
            t.leader.email,
            t.teamSize,
            t.payment?.status || "pending",
            t.amount
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "hwm_registrations.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!authorized) {
        return (
            <div className="h-screen bg-black flex items-center justify-center">
                <form onSubmit={handleLogin} className="bg-gray-900 border border-red-900 p-8 rounded text-center max-w-sm w-full">
                    <Lock className="mx-auto text-red-600 mb-4 w-12 h-12" />
                    <h1 className="text-xl font-bold text-red-500 mb-6 uppercase tracking-widest">Top Secret Clearance</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black border border-gray-700 p-3 mb-4 text-white text-center tracking-widest outline-none focus:border-red-500"
                        placeholder="ENTER PASSCODE"
                    />
                    <button className="w-full bg-red-900/50 hover:bg-red-800 text-red-100 py-3 font-bold uppercase border border-red-700 transition-all">
                        Authenticate
                    </button>
                </form>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-green-400 font-mono p-4">
            <header className="flex justify-between items-center mb-8 border-b border-green-900 pb-4">
                <h1 className="text-3xl font-bold flex items-center gap-2 uppercase tracking-[0.2em] text-green-500 text-glow">
                    <ShieldCheck className="animate-pulse" /> Intelligence Control
                </h1>
                <button onClick={() => setAuthorized(false)} className="text-red-500 text-xs uppercase tracking-widest hover:bg-red-900/10 px-4 py-2 border border-red-900/30 rounded transition-all">
                    [ Terminate Session ]
                </button>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-black border border-green-800 p-6 rounded relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-50 transition-opacity"><Lock size={40} /></div>
                    <div className="text-xs text-green-600 uppercase tracking-widest mb-2">Total Operatives</div>
                    <div className="text-4xl font-bold text-white font-mono">{String(stats.totalParticipants).padStart(3, '0')}</div>
                </div>
                <div className="bg-black border border-green-800 p-6 rounded relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-50 transition-opacity"><Download size={40} /></div>
                    <div className="text-xs text-green-600 uppercase tracking-widest mb-2">Revenue Generated</div>
                    <div className="text-4xl font-bold text-white font-mono">₹{stats.totalRevenue.toLocaleString()}</div>
                </div>
                <div className="bg-black border border-green-800 p-6 rounded relative overflow-hidden group">
                    <div className="text-xs text-green-600 uppercase tracking-widest mb-2">Active Units</div>
                    <div className="text-4xl font-bold text-white font-mono">{String(stats.totalTeams).padStart(3, '0')}</div>
                </div>
                <div className="bg-black border border-green-800 p-6 rounded relative overflow-hidden group">
                    <div className="text-xs text-green-600 uppercase tracking-widest mb-2">Auth Granted</div>
                    <div className="text-4xl font-bold text-white font-mono">{String(stats.paidTeams).padStart(3, '0')}</div>
                </div>
            </div>


            {/* Toolbar */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 text-green-700" size={18} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search operatives by ID, Name, Status..."
                        className="w-full bg-black border border-green-900 pl-10 pr-4 py-2 rounded text-green-400 focus:border-green-500 outline-none"
                    />
                </div>
                <button onClick={exportToCSV} className="bg-green-900/20 hover:bg-green-900/40 border border-green-700 text-green-400 px-4 py-2 rounded flex items-center gap-2">
                    <Download size={16} /> Export CSV
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-green-900/30 rounded">
                <table className="w-full text-left text-sm">
                    <thead className="bg-green-900/20 text-green-500 uppercase tracking-wider">
                        <tr>
                            <th className="p-4">Team ID</th>
                            <th className="p-4">Team Name</th>
                            <th className="p-4">Leader</th>
                            <th className="p-4">Size</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-green-900/30">
                        {filteredTeams.map((team, i) => (
                            <tr key={i} className="hover:bg-green-900/5">
                                <td className="p-4 font-mono text-white">{team.teamId || "N/A"}</td>
                                <td className="p-4 font-bold">{team.teamName}</td>
                                <td className="p-4">
                                    <div>{team.leader.fullName}</div>
                                    <div className="text-xs opacity-50">{team.leader.email}</div>
                                </td>
                                <td className="p-4 text-center">{team.teamSize}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${team.payment?.status === "paid" ? "bg-green-900 text-green-200" : "bg-yellow-900 text-yellow-200"}`}>
                                        {team.payment?.status === "paid" ? "AUTHORIZED" : "PENDING"}
                                    </span>
                                </td>
                                <td className="p-4">₹{team.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
