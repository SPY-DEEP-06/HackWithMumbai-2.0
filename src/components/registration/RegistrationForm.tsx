"use client";

import { useState } from "react";
import { User } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, Shield } from "lucide-react";
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
        const currentMembers = [...formData.members];
        let newMembers = [];
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
                    color: "#b11226",
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

    // --- COMPONENT HELPERS ---
    const InputField = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
        <input
            {...props}
            className="w-full bg-secondary/10 border border-secondary/30 rounded p-3 text-foreground focus:border-primary outline-none focus:shadow-[0_0_10px_rgba(var(--primary),0.3)] transition-all font-mono text-sm"
        />
    );

    const SelectField = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
        <div className="relative">
            <select
                {...props}
                className="w-full bg-secondary/10 border border-secondary/30 rounded p-3 text-foreground focus:border-primary outline-none appearance-none font-mono text-sm"
            >
                {children}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</div>
        </div>
    );

    // --- RENDER STEPS ---

    // STEP 1: TEAM DETAILS
    const renderStep1 = () => (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="space-y-2">
                <label className="text-primary font-bold uppercase tracking-widest text-xs">Team Codename</label>
                <InputField
                    type="text"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    placeholder="ENTER_TEAM_NAME"
                />
            </div>
            <div className="space-y-4">
                <label className="text-primary font-bold uppercase tracking-widest text-xs">Squad Size (Including Captain)</label>
                <div className="flex gap-4">
                    {[2, 3, 4].map((size) => (
                        <button
                            key={size}
                            onClick={() => updateTeamSize(size as TeamSize)}
                            className={`flex-1 p-6 border rounded font-bold transition-all relative overflow-hidden group ${formData.teamSize === size
                                ? "bg-primary/20 text-primary border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                                : "bg-transparent text-muted-foreground border-white/10 hover:border-white/30"
                                }`}
                        >
                            <span className="text-2xl block mb-2">{size}</span>
                            <span className="text-xs uppercase tracking-widest">Operatives</span>
                            <div className="absolute top-0 right-0 p-1 opacity-50 text-[10px] bg-secondary/50">₹{FEES[size as TeamSize]}</div>
                            {formData.teamSize === size && <motion.div layoutId="size-select" className="absolute inset-0 border-2 border-primary rounded pointer-events-none" />}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );

    // FORM FOR MEMBER
    const renderMemberForm = (data: MemberDetails, onChange: (f: keyof MemberDetails, v: string) => void, title: string) => (
        <div className="space-y-4 border-l-2 border-primary/30 pl-6 relative">
            <div className="absolute -left-[5px] top-0 w-2 h-2 bg-primary rounded-full"></div>
            <h3 className="text-lg font-bold text-foreground mb-4 font-mono uppercase text-glow">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField placeholder="FULL_NAME" value={data.fullName} onChange={e => onChange("fullName", e.target.value)} />
                <InputField placeholder="EMAIL_ADDRESS" value={data.email} onChange={e => onChange("email", e.target.value)} type="email" />
                <InputField placeholder="MOBILE_NO" value={data.mobile} onChange={e => onChange("mobile", e.target.value)} type="tel" />
                <InputField placeholder="CITY" value={data.city} onChange={e => onChange("city", e.target.value)} />
                <InputField placeholder="STATE" value={data.state} onChange={e => onChange("state", e.target.value)} />
                <InputField placeholder="COLLEGE / ORG" value={data.college} onChange={e => onChange("college", e.target.value)} />
                <InputField placeholder="ENROLLMENT_ID" value={data.enrollment} onChange={e => onChange("enrollment", e.target.value)} />

                <SelectField value={data.branch} onChange={e => onChange("branch", e.target.value)} aria-label="Branch">
                    <option value="">SELECT_BRANCH</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="AIDS">AI / DS</option>
                    <option value="EXTC">EXTC</option>
                    <option value="Other">OTHER</option>
                </SelectField>

                <div className="flex items-center gap-4 bg-secondary/5 p-2 rounded">
                    <label className="text-xs uppercase text-muted-foreground">Student_Status?</label>
                    <div className="flex gap-2">
                        {["Yes", "No"].map(opt => (
                            <button
                                key={opt}
                                onClick={() => onChange("isStudent", opt)}
                                className={`text-xs px-3 py-1 rounded border ${data.isStudent === opt ? "bg-primary/20 border-primary text-primary" : "border-transparent text-muted-foreground"}`}
                            >
                                {opt.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-3xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-lg relative overflow-hidden shadow-2xl">
            {/* Decorative Corner Markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50"></div>

            {/* Header */}
            <div className="mb-8 text-center relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary uppercase tracking-[0.2em] text-glow">
                    {step === 1 ? "Operative Manifest" : step === 2 ? "Unit Profile" : step === 3 ? "Squad Roster" : step === 4 ? "Service History" : "Mission Auth"}
                </h2>
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-muted-foreground">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    PHASE_{String(step).padStart(2, '0')}_OF_05 // {step === 1 ? "TEAM_INIT" : "DATA_ENTRY"}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px] mb-8 relative z-10">
                {step === 1 && renderStep1()}

                {step === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {renderMemberForm(formData.leader, updateLeader, "Squad Leader (Captain)")}
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                        {formData.members.map((member, i) => (
                            <div key={i}>
                                {renderMemberForm(member, (f, v) => updateMember(i, f, v), `Operative 0${i + 2}`)}
                            </div>
                        ))}
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 text-center py-10">
                        <Shield size={48} className="mx-auto text-primary mb-4 opacity-50" />
                        <h3 className="text-xl font-mono text-foreground">PRIOR_ENGAGEMENT_CHECK</h3>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto">Has this unit participated in previous hackathons?</p>

                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={() => setFormData({ ...formData, hackathonHistory: { ...formData.hackathonHistory, participatedBefore: "Yes" } })}
                                className={`w-32 py-3 border rounded font-mono transition-all ${formData.hackathonHistory.participatedBefore === "Yes" ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(220,38,38,0.4)]" : "border-white/20 text-muted-foreground hover:border-white/50"}`}
                            >
                                YES
                            </button>
                            <button
                                onClick={() => setFormData({ ...formData, hackathonHistory: { ...formData.hackathonHistory, participatedBefore: "No" } })}
                                className={`w-32 py-3 border rounded font-mono transition-all ${formData.hackathonHistory.participatedBefore === "No" ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(220,38,38,0.4)]" : "border-white/20 text-muted-foreground hover:border-white/50"}`}
                            >
                                NO
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 5 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        <div className="border border-green-500/30 bg-green-500/5 p-6 rounded text-center">
                            <h3 className="text-green-500 font-bold uppercase tracking-widest mb-2">Fee Calculation Complete</h3>
                            <div className="text-4xl font-mono font-bold text-white">₹{formData.amount}</div>
                            <p className="text-xs text-green-500/70 mt-2 font-mono">SECURE_PAYMENT_GATEWAY_READY</p>
                        </div>

                        <div className="space-y-3 font-mono text-sm text-muted-foreground">
                            <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-white/5 rounded transition-colors">
                                <input type="checkbox" checked={formData.declaration.rulesAccepted} onChange={e => setFormData({ ...formData, declaration: { ...formData.declaration, rulesAccepted: e.target.checked } })} className="mt-1 accent-primary" />
                                <span>I confirm that all provided intelligence is accurate and I accept the Mission Protocol (Rules & Code of Conduct).</span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer p-3 hover:bg-white/5 rounded transition-colors">
                                <input type="checkbox" checked={formData.declaration.nonRefundable} onChange={e => setFormData({ ...formData, declaration: { ...formData.declaration, nonRefundable: e.target.checked } })} className="mt-1 accent-primary" />
                                <span>I acknowledge that the registration fee is non-refundable upon mission failure or abortion.</span>
                            </label>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center border-t border-white/10 pt-6">
                <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className="px-6 py-2 rounded text-xs font-mono uppercase tracking-widest border border-transparent hover:border-white/20 hover:bg-white/5 disabled:opacity-0 transition-all flex items-center gap-2"
                >
                    <ChevronLeft size={14} /> Back
                </button>

                {step < 5 ? (
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-colors flex items-center gap-2 group"
                    >
                        Proceed <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={!formData.declaration.rulesAccepted || loading}
                        className="px-8 py-3 bg-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-red-700 transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Initializing..." : "Authorize & Pay"} <CheckCircle size={14} />
                    </button>
                )}
            </div>
        </div>
    );
}
