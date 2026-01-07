"use client";

import { useState } from "react";
import { User } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle } from "lucide-react";
import { RegistrationData, TeamSize, MemberDetails } from "@/types/registration";

// Initial State
const INITIAL_DATA: RegistrationData = {
    teamName: "",
    teamSize: 4,
    leader: { fullName: "", email: "", mobile: "", city: "", state: "", qualification: "", branch: "", college: "", enrollment: "", isStudent: "Yes", year: "" },
    members: [],
    hackathonHistory: { participatedBefore: "No", participatedHWI: "No", hwiEventName: "" },
    declaration: { detailsCorrect: false, feeAcknowledged: false, nonRefundable: false, rulesAccepted: false },
    paymentStatus: "pending",
    amount: 2000,
};

const FEES = { 2: 1000, 3: 1500, 4: 2000 };

export default function RegistrationForm({ user }: { user: User }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<RegistrationData>(INITIAL_DATA);
    const [loading, setLoading] = useState(false);

    // --- HANDLERS ---
    const updateTeamSize = (size: TeamSize) => {
        // Resize members array
        const currentMembers = [...formData.members];
        let newMembers = [];
        // We need size-1 members (since leader is separate)
        const requiredMembers = size - 1;

        for (let i = 0; i < requiredMembers; i++) {
            newMembers.push(currentMembers[i] || { ...INITIAL_DATA.leader });
        }

        setFormData({ ...formData, teamSize: size, amount: FEES[size], members: newMembers });
    };

    const updateLeader = (field: keyof MemberDetails, value: string) => {
        setFormData({ ...formData, leader: { ...formData.leader, [field]: value } });
    };

    const updateMember = (index: number, field: keyof MemberDetails, value: string) => {
        const newMembers = [...formData.members];
        newMembers[index] = { ...newMembers[index], [field]: value };
        setFormData({ ...formData, members: newMembers });
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // 1. Create Order
            const orderRes = await fetch("/api/create-order", {
                method: "POST",
                body: JSON.stringify({ amount: formData.amount }),
            });
            const orderData = await orderRes.json();

            if (orderData.error) throw new Error(orderData.error);
            if (!window.Razorpay) throw new Error("Razorpay SDK failed to load");

            // 2. Open Razorpay
            const options = {
                key: "rzp_live_RyEAE0jIXPrkrw", // Public Key
                amount: orderData.amount,
                currency: orderData.currency,
                name: "HackWithMumbai 2.0",
                description: "Registration Fee",
                order_id: orderData.id,
                handler: async function (response: any) {
                    // 3. Verify Payment
                    try {
                        const verifyRes = await fetch("/api/verify-payment", {
                            method: "POST",
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                formData: formData,
                                userId: user.uid
                            }),
                        });
                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            alert("Registration Successful! Team ID: " + verifyData.teamId);
                            window.location.href = "/dashboard";
                        } else {
                            alert("Payment Verification Failed");
                        }
                    } catch (err) {
                        console.error(err);
                        alert("Payment Verification Error");
                    }
                },
                prefill: {
                    name: formData.leader.fullName,
                    email: formData.leader.email,
                    contact: formData.leader.mobile,
                },
                theme: {
                    color: "#ff0000",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment initialization failed");
        } finally {
            setLoading(false);
        }
    };

    // --- RENDER STEPS ---

    // STEP 1: TEAM DETAILS
    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-secondary-foreground font-semibold">Team Name</label>
                <input
                    type="text"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    className="w-full bg-secondary/10 border border-secondary/30 rounded p-3 text-foreground focus:border-primary outline-none"
                    placeholder="Enter Team Name"
                />
            </div>
            <div className="space-y-2">
                <label className="text-secondary-foreground font-semibold">Team Size (Including Leader)</label>
                <div className="flex gap-4">
                    {[2, 3, 4].map((size) => (
                        <button
                            key={size}
                            onClick={() => updateTeamSize(size as TeamSize)}
                            className={`flex-1 p-4 border rounded font-bold transition-all ${formData.teamSize === size
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-transparent text-muted-foreground border-white/10 hover:border-white/30"
                                }`}
                        >
                            {size} Members
                            <div className="text-xs font-normal mt-1 opacity-80">₹{FEES[size as TeamSize]}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    // STEP 2: LEADER DETAILS
    const renderMemberForm = (data: MemberDetails, onChange: (f: keyof MemberDetails, v: string) => void, title: string) => (
        <div className="space-y-4 border border-white/10 p-4 rounded bg-white/5">
            <h3 className="text-xl font-bold text-accent mb-4">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Full Name" value={data.fullName} onChange={e => onChange("fullName", e.target.value)} className="input-field" />
                <input placeholder="Email" value={data.email} onChange={e => onChange("email", e.target.value)} className="input-field" type="email" />
                <input placeholder="Mobile" value={data.mobile} onChange={e => onChange("mobile", e.target.value)} className="input-field" type="tel" />
                <input placeholder="City" value={data.city} onChange={e => onChange("city", e.target.value)} className="input-field" />
                <input placeholder="State" value={data.state} onChange={e => onChange("state", e.target.value)} className="input-field" />
                <input placeholder="College/Company" value={data.college} onChange={e => onChange("college", e.target.value)} className="input-field" />
                <input placeholder="Enrollment No." value={data.enrollment} onChange={e => onChange("enrollment", e.target.value)} className="input-field" />

                <select value={data.branch} onChange={e => onChange("branch", e.target.value)} className="input-field bg-black" aria-label="Branch">
                    <option value="">Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="AIDS">AIDS</option>
                    <option value="EXTC">EXTC</option>
                    <option value="Other">Other</option>
                </select>

                <div className="flex items-center gap-4">
                    <label className="text-sm">Student?</label>
                    <select value={data.isStudent} onChange={e => onChange("isStudent", e.target.value as "Yes" | "No")} className="input-field bg-black w-24" aria-label="Is Student">
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
            </div>
        </div>
    );


    return (
        <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-lg shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
                <span>Step {step} of 5</span>
                <span className="text-sm font-normal text-muted-foreground">{
                    step === 1 ? "Team Intel" :
                        step === 2 ? "Leader Profile" :
                            step === 3 ? "Operative Profiles" :
                                step === 4 ? "Service History" :
                                    "Final Protocol"
                }</span>
            </h2>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-gray-800 mb-8 rounded-full overflow-hidden">
                <motion.div
                    animate={{ width: `${(step / 5) * 100}%` }}
                    className="h-full bg-primary"
                />
            </div>

            <div className="min-h-[400px]">
                {step === 1 && renderStep1()}
                {step === 2 && renderMemberForm(formData.leader, updateLeader, "Team Leader (Member 01)")}
                {step === 3 && (
                    <div className="space-y-6">
                        {formData.members.map((member, i) => (
                            <div key={i}>
                                {renderMemberForm(member, (f, v) => updateMember(i, f, v), `Operative 0${i + 2}`)}
                            </div>
                        ))}
                    </div>
                )}

                {/* Shortened implementation for Steps 4 & 5 to fit in one file for now, can expand later */}
                {step === 4 && (
                    <div className="space-y-6 text-center py-10">
                        <h3 className="text-xl">Participated in Hackathons before?</h3>
                        <div className="flex justify-center gap-4 mb-8">
                            <button onClick={() => setFormData({ ...formData, hackathonHistory: { ...formData.hackathonHistory, participatedBefore: "Yes" } })} className={`btn-select ${formData.hackathonHistory.participatedBefore === "Yes" ? "bg-primary" : ""}`}>Yes</button>
                            <button onClick={() => setFormData({ ...formData, hackathonHistory: { ...formData.hackathonHistory, participatedBefore: "No" } })} className={`btn-select ${formData.hackathonHistory.participatedBefore === "No" ? "bg-primary" : ""}`}>No</button>
                        </div>
                        {/* Add more history fields as needed */}
                    </div>
                )}

                {step === 5 && (
                    <div className="space-y-4">
                        <p className="border p-4 border-yellow-500/50 text-yellow-500 bg-yellow-500/10 rounded">
                            <AlertCircle className="inline mr-2" />
                            Total Registration Fee: <span className="font-bold text-xl ml-2">₹{formData.amount}</span>
                        </p>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={formData.declaration.rulesAccepted} onChange={e => setFormData({ ...formData, declaration: { ...formData.declaration, rulesAccepted: e.target.checked } })} className="w-5 h-5 accent-primary" />
                            <span>I accept the Rules & Code of Conduct.</span>
                        </label>
                        {/* More checkboxes */}
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className="px-6 py-2 rounded border border-white/20 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <ChevronLeft size={16} /> Back
                </button>

                {step < 5 ? (
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 rounded bg-primary text-primary-foreground font-bold hover:bg-primary/80 flex items-center gap-2"
                    >
                        Next <ChevronRight size={16} />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={!formData.declaration.rulesAccepted || loading}
                        className="px-8 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? "Processing..." : "Pay & Register"} <CheckCircle size={16} />
                    </button>
                )}
            </div>

            <style jsx>{`
            .input-field {
                width: 100%;
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                padding: 12px;
                border-radius: 4px;
                color: white;
                outline: none;
            }
            .input-field:focus {
                border-color: var(--primary);
            }
            .btn-select {
                padding: 10px 20px;
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 4px;
                min-width: 80px;
            }
        `}</style>
        </div>
    );
}
