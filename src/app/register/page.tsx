"use client";

import React, { useState, useEffect, useCallback, Suspense, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QRCodeSVG } from 'qrcode.react';
import gsap from 'gsap';
import { toast } from 'sonner';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
    Users,
    User,
    Trophy,
    FileCheck,
    CreditCard,
    Check,
    AlertCircle,
    ChevronRight,
    ChevronLeft,
    Home
} from 'lucide-react';

// Razorpay types
declare global {
    interface Window {
        Razorpay: any;
    }
}

// Types
interface MemberDetails {
    fullName: string;
    email: string;
    mobile: string;
    city: string;
    state: string;
    qualification: string;
    qualificationOther: string;
    branch: string;
    branchOther: string;
    institution: string;
    enrollmentNumber: string;
    currentlyStudying: string;
    year: string;
}

interface FormData {
    teamName: string;
    teamSize: number;
    leader: MemberDetails;
    members: MemberDetails[];
    hackathonExperience: {
        participated: string;
        hackWithIndiaEvents: string;
        whichEvents: string;
    };
    declarations: {
        detailsCorrect: boolean;
        feeAcknowledge: boolean;
        nonRefundable: boolean;
        rulesAgree: boolean;
    };
}

const initialMember: MemberDetails = {
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    state: '',
    qualification: '',
    qualificationOther: '',
    branch: '',
    branchOther: '',
    institution: '',
    enrollmentNumber: '',
    currentlyStudying: '',
    year: '',
};

const initialFormData: FormData = {
    teamName: '',
    teamSize: 2,
    leader: { ...initialMember },
    members: [],
    hackathonExperience: {
        participated: '',
        hackWithIndiaEvents: '',
        whichEvents: '',
    },
    declarations: {
        detailsCorrect: false,
        feeAcknowledge: false,
        nonRefundable: false,
        rulesAgree: false,
    },
};

const STEP_TITLES = [
    { icon: Users, title: 'Team Details' },
    { icon: User, title: 'Leader Details' },
    { icon: Users, title: 'Team Members' },
    { icon: Trophy, title: 'Experience' },
    { icon: FileCheck, title: 'Declaration' },
    { icon: CreditCard, title: 'Payment' },
];

const QUALIFICATIONS = ['B.Tech', 'M.Tech', 'Other'];
const BRANCHES = ['CSE', 'CSBS', 'IT', 'AIDS', 'EXTC', 'Other'];
const YEARS = ['1st', '2nd', '3rd', '4th'];

function RegisterContent() {
    const { user } = useAuth();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [uniqueHexId, setUniqueHexId] = useState('');
    const [qrData, setQrData] = useState('');
    const [existingRegistration, setExistingRegistration] = useState(false);

    // const amount = formData.teamSize === 2 ? 1000 : formData.teamSize === 3 ? 1500 : 2000;
    const amount = 1; // FOR TESTING ONLY

    // Check for existing registration
    useEffect(() => {
        const checkExistingRegistration = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.payment?.status === 'paid') {
                        setExistingRegistration(true);
                    }
                }
            }
        };
        checkExistingRegistration();
    }, [user]);

    // Animations
    useEffect(() => {
        gsap.fromTo('.step-content',
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
        );
    }, [currentStep]);

    // Sync members array with team size
    useEffect(() => {
        const membersNeeded = formData.teamSize - 1;
        const currentMembers = formData.members.length;

        if (membersNeeded > currentMembers) {
            const newMembers = [...formData.members];
            for (let i = currentMembers; i < membersNeeded; i++) {
                newMembers.push({ ...initialMember });
            }
            setFormData({ ...formData, members: newMembers });
        } else if (membersNeeded < currentMembers) {
            setFormData({ ...formData, members: formData.members.slice(0, membersNeeded) });
        }
    }, [formData.teamSize]);

    // Prefill leader email from Google
    useEffect(() => {
        if (user?.email && !formData.leader.email) {
            setFormData(prev => ({
                ...prev,
                leader: { ...prev.leader, email: user.email || '' }
            }));
        }
    }, [user]);

    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
                width: `${((currentStep - 1) / (STEP_TITLES.length - 1)) * 100}%`,
                duration: 0.5,
                ease: "power2.out"
            });
        }
    }, [currentStep]);

    const handleInputChange = (
        section: 'leader' | 'hackathonExperience' | 'declarations' | 'root',
        field: string,
        value: string | boolean | number
    ) => {
        if (section === 'root') {
            setFormData({ ...formData, [field]: value });
        } else if (section === 'leader') {
            setFormData({
                ...formData,
                leader: { ...formData.leader, [field]: value }
            });
        } else if (section === 'hackathonExperience') {
            setFormData({
                ...formData,
                hackathonExperience: { ...formData.hackathonExperience, [field]: value }
            });
        } else if (section === 'declarations') {
            setFormData({
                ...formData,
                declarations: { ...formData.declarations, [field]: value }
            });
        }
    };

    const handleMemberChange = (index: number, field: string, value: string) => {
        const updatedMembers = [...formData.members];
        updatedMembers[index] = { ...updatedMembers[index], [field]: value };
        setFormData({ ...formData, members: updatedMembers });
    };

    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1:
                return formData.teamName.trim().length >= 3;
            case 2:
                const l = formData.leader;
                return !!(l.fullName && l.email && l.mobile && l.city && l.state &&
                    l.qualification && l.branch && l.institution && l.enrollmentNumber &&
                    l.currentlyStudying && (l.currentlyStudying === 'No' || l.year));
            case 3:
                return formData.members.every(m =>
                    m.fullName && m.email && m.mobile && m.city && m.state &&
                    m.qualification && m.branch && m.institution && m.enrollmentNumber &&
                    m.currentlyStudying && (m.currentlyStudying === 'No' || m.year)
                );
            case 4:
                return !!(formData.hackathonExperience.participated &&
                    formData.hackathonExperience.hackWithIndiaEvents &&
                    (formData.hackathonExperience.hackWithIndiaEvents === 'No' ||
                        formData.hackathonExperience.whichEvents));
            case 5:
                const d = formData.declarations;
                return d.detailsCorrect && d.feeAcknowledge && d.nonRefundable && d.rulesAgree;
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (validateStep(currentStep) && currentStep < 6) {
            setCurrentStep(currentStep + 1);
        } else {
            toast.error('Please fill all required fields');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Load Razorpay script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    // Verify payment and save to Firestore
    const verifyAndSavePayment = useCallback(async (paymentResponse: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
    }) => {
        if (!user) {
            toast.error('User session expired. Please login again.');
            setIsSubmitting(false);
            return;
        }

        console.log('Verifying payment...', paymentResponse);
        toast.loading('Verifying payment...');

        try {
            // Call verify endpoint
            const verifyResponse = await fetch(
                `https://rqnjtiuxxccblctwfwkk.supabase.co/functions/v1/razorpay-verify-payment`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        razorpay_order_id: paymentResponse.razorpay_order_id,
                        razorpay_payment_id: paymentResponse.razorpay_payment_id,
                        razorpay_signature: paymentResponse.razorpay_signature,
                        userId: user.uid,
                        teamName: formData.teamName,
                        teamSize: formData.teamSize,
                        leaderName: formData.leader.fullName,
                        amount: amount,
                    }),
                }
            );

            const verifyData = await verifyResponse.json();
            console.log('Verify response:', verifyData);

            if (!verifyResponse.ok || !verifyData.success) {
                console.error('Verification failed:', verifyData);
                toast.error('Payment verification failed. Please contact support.');
                setIsSubmitting(false);
                return;
            }

            console.log('Payment verified successfully:', verifyData);
            toast.message('Saving registration...');

            // Save to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                teamName: formData.teamName,
                teamSize: formData.teamSize,
                leaderDetails: formData.leader,
                members: formData.members,
                hackathonExperience: formData.hackathonExperience,
                payment: {
                    status: 'paid',
                    amount: amount,
                    transactionId: verifyData.transactionId,
                    orderId: verifyData.orderId,
                    paymentDate: new Date().toISOString()
                },
                uniqueHexId: verifyData.uniqueHexId,
                qrCodeData: verifyData.qrData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });

            console.log('Firestore save successful');

            setUniqueHexId(verifyData.uniqueHexId);
            setQrData(verifyData.qrData);
            setPaymentComplete(true);
            toast.success('Registration completed successfully!');

        } catch (error: any) {
            console.error('Verification/Save error:', error);
            toast.error(`Error: ${error.message}. Please contact support.`);
        } finally {
            setIsSubmitting(false);
            toast.dismiss();
        }
    }, [user, formData, amount]);

    const handlePayment = async () => {
        if (!user) {
            toast.error('Please login to continue');
            return;
        }

        setIsSubmitting(true);

        try {
            // Step 1: Create order via edge function
            console.log('Creating Razorpay order...');
            toast.loading('Creating order...');

            const createResponse = await fetch(
                `https://rqnjtiuxxccblctwfwkk.supabase.co/functions/v1/razorpay-create-order`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: amount,
                        teamName: formData.teamName,
                        leaderName: formData.leader.fullName,
                        leaderEmail: formData.leader.email,
                        userId: user.uid,
                    }),
                }
            );

            const orderData = await createResponse.json();

            if (!createResponse.ok || orderData.error) {
                console.error('Order creation error:', orderData);
                throw new Error(orderData.error || 'Failed to create order');
            }

            console.log('Order created:', orderData);
            toast.dismiss();
            toast.success('Order created!');

            // Step 2: Open Razorpay checkout
            const options = {
                key: 'rzp_live_RyEAE0jIXPrkrw', // User provided key
                // key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'HackWithIndia',
                description: `Registration for ${formData.teamName} (${formData.teamSize} members)`,
                order_id: orderData.orderId,
                prefill: {
                    name: formData.leader.fullName,
                    email: formData.leader.email,
                    contact: formData.leader.mobile,
                },
                notes: {
                    team_name: formData.teamName,
                    team_size: formData.teamSize.toString(),
                },
                theme: {
                    color: '#FF6B35',
                },
                handler: function (response: any) {
                    console.log('Razorpay handler called with:', response);
                    // Use setTimeout to ensure the handler completes and state is updated
                    setTimeout(() => {
                        verifyAndSavePayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                    }, 100);
                },
                modal: {
                    ondismiss: function () {
                        console.log('Payment modal dismissed');
                        setIsSubmitting(false);
                        toast.info('Payment cancelled');
                    },
                    escape: false,
                    confirm_close: true,
                },
            };

            if (!window.Razorpay) {
                throw new Error('Razorpay SDK not loaded. Please refresh the page.');
            }

            const razorpay = new window.Razorpay(options);

            razorpay.on('payment.failed', function (response: any) {
                console.error('Payment failed:', response.error);
                toast.error(`Payment failed: ${response.error.description}`);
                setIsSubmitting(false);
            });

            razorpay.open();

        } catch (error: any) {
            console.error('Payment error:', error);
            toast.error(error.message || 'An error occurred. Please try again.');
            setIsSubmitting(false);
        }
    };

    if (existingRegistration) {
        return (
            <div className="min-h-screen relative overflow-hidden">
                <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
                <div className="fixed inset-0 vignette pointer-events-none" />
                <div className="scanline" />

                <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                    <div className="tva-terminal max-w-md w-full p-8 text-center">
                        <AlertCircle className="w-16 h-16 text-hackathon-orange mx-auto mb-4" />
                        <h2 className="text-2xl font-orbitron text-hackathon-orange mb-4">Already Registered</h2>
                        <p className="text-gray-400 font-courier mb-6">
                            Your team is already registered for HackWithIndia.
                        </p>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="btn-primary font-orbitron"
                        >
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const renderMemberFields = (member: MemberDetails, onChange: (field: string, value: string) => void, label: string) => (
        <div className="space-y-4">
            <h3 className="text-xl font-orbitron text-hackathon-orange mb-4">{label}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-courier text-gray-400 mb-2">Full Name *</label>
                    <input
                        type="text"
                        value={member.fullName}
                        onChange={(e) => onChange('fullName', e.target.value)}
                        className="futuristic-input w-full"
                        placeholder="FirstName LastName"
                    />
                </div>

                <div>
                    <label className="block text-sm font-courier text-gray-400 mb-2">Email ID *</label>
                    <input
                        type="email"
                        value={member.email}
                        onChange={(e) => onChange('email', e.target.value)}
                        className="futuristic-input w-full"
                        placeholder="email@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-courier text-gray-400 mb-2">Mobile Number *</label>
                    <input
                        type="tel"
                        value={member.mobile}
                        onChange={(e) => onChange('mobile', e.target.value)}
                        className="futuristic-input w-full"
                        placeholder="+91 XXXXXXXXXX"
                    />
                </div>

                <div>
                    <label className="block text-sm font-courier text-gray-400 mb-2">City *</label>
                    <input
                        type="text"
                        value={member.city}
                        onChange={(e) => onChange('city', e.target.value)}
                        className="futuristic-input w-full"
                        placeholder="Enter city"
                    />
                </div>

                <div>
                    <label className="block text-sm font-courier text-gray-400 mb-2">State *</label>
                    <input
                        type="text"
                        value={member.state}
                        onChange={(e) => onChange('state', e.target.value)}
                        className="futuristic-input w-full"
                        placeholder="Enter state"
                    />
                </div>

                <div>
                    <label className="block text-sm font-courier text-gray-400 mb-2">Qualification *</label>
                    <select
                        value={member.qualification}
                        onChange={(e) => onChange('qualification', e.target.value)}
                        className="futuristic-select w-full"
                        title="Qualification"
                    >
                        <option value="">Select qualification</option>
                        {QUALIFICATIONS.map(q => <option key={q} value={q}>{q}</option>)}
                    </select>
                    {member.qualification === 'Other' && (
                        <input
                            type="text"
                            value={member.qualificationOther}
                            onChange={(e) => onChange('qualificationOther', e.target.value)}
                            className="futuristic-input w-full mt-2"
                            placeholder="Specify qualification"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-courier text-gray-400 mb-2">Branch *</label>
                    <select
                        value={member.branch}
                        onChange={(e) => onChange('branch', e.target.value)}
                        className="futuristic-select w-full"
                        title="Branch"
                    >
                        <option value="">Select branch</option>
                        {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    {member.branch === 'Other' && (
                        <input
                            type="text"
                            value={member.branchOther}
                            onChange={(e) => onChange('branchOther', e.target.value)}
                            className="futuristic-input w-full mt-2"
                            placeholder="Specify branch"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-courier text-gray-400 mb-2">School / College / Company *</label>
                    <input
                        type="text"
                        value={member.institution}
                        onChange={(e) => onChange('institution', e.target.value)}
                        className="futuristic-input w-full"
                        placeholder="Enter institution name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-courier text-gray-400 mb-2">Enrollment Number *</label>
                    <input
                        type="text"
                        value={member.enrollmentNumber}
                        onChange={(e) => onChange('enrollmentNumber', e.target.value)}
                        className="futuristic-input w-full"
                        placeholder="Enter enrollment number"
                    />
                </div>

                <div>
                    <label className="block text-sm font-courier text-gray-400 mb-2">Currently Studying? *</label>
                    <select
                        value={member.currentlyStudying}
                        onChange={(e) => onChange('currentlyStudying', e.target.value)}
                        className="futuristic-select w-full"
                        title="Currently Studying"
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                {member.currentlyStudying === 'Yes' && (
                    <div>
                        <label className="block text-sm font-courier text-gray-400 mb-2">Year *</label>
                        <select
                            value={member.year}
                            onChange={(e) => onChange('year', e.target.value)}
                            className="futuristic-select w-full"
                            title="Year"
                        >
                            <option value="">Select year</option>
                            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                )}
            </div>
        </div>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="step-content space-y-6">
                        <div>
                            <label className="block text-sm font-courier text-gray-400 mb-2">Team Name *</label>
                            <input
                                type="text"
                                value={formData.teamName}
                                onChange={(e) => handleInputChange('root', 'teamName', e.target.value)}
                                className="futuristic-input w-full text-lg"
                                placeholder="Enter your team name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-courier text-gray-400 mb-4">Team Size *</label>
                            <div className="flex gap-4">
                                {[2, 3, 4].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => handleInputChange('root', 'teamSize', size)}
                                        className={`flex-1 p-4 rounded-lg border-2 transition-all duration-300 ${formData.teamSize === size
                                            ? 'border-[#ff8c00] bg-[#ff8c00]/20 neon-glow'
                                            : 'border-gray-700 hover:border-[#ff8c00]/50'
                                            }`}
                                    >
                                        <div className="text-2xl font-bold font-orbitron text-[#ff8c00]">{size}</div>
                                        <div className="text-sm text-gray-400 font-courier">members</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="hackathon-card">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 font-courier">Registration Fee</span>
                                <span className="text-3xl font-bold font-orbitron text-hackathon-orange animate-pulse-glow">
                                    ₹{amount}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 font-courier">₹500 per participant</p>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="step-content">
                        {renderMemberFields(
                            formData.leader,
                            (field, value) => handleInputChange('leader', field, value),
                            'Member 01 (Team Leader)'
                        )}
                    </div>
                );

            case 3:
                return (
                    <div className="step-content space-y-8">
                        {formData.members.map((member, index) => (
                            <div key={index} className="border-b border-hackathon-orange/20 pb-8 last:border-0">
                                {renderMemberFields(
                                    member,
                                    (field, value) => handleMemberChange(index, field, value),
                                    `Member ${String(index + 2).padStart(2, '0')}`
                                )}
                            </div>
                        ))}
                    </div>
                );

            case 4:
                return (
                    <div className="step-content space-y-6">
                        <div>
                            <label className="block text-sm font-courier text-gray-400 mb-2">
                                Have you participated in a hackathon before? *
                            </label>
                            <select
                                value={formData.hackathonExperience.participated}
                                onChange={(e) => handleInputChange('hackathonExperience', 'participated', e.target.value)}
                                className="futuristic-select w-full"
                                title="Hackathon Experience"
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-courier text-gray-400 mb-2">
                                Have you participated in any HackWithIndia events? *
                            </label>
                            <select
                                value={formData.hackathonExperience.hackWithIndiaEvents}
                                onChange={(e) => handleInputChange('hackathonExperience', 'hackWithIndiaEvents', e.target.value)}
                                className="futuristic-select w-full"
                                title="HackWithIndia Events"
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        {formData.hackathonExperience.hackWithIndiaEvents === 'Yes' && (
                            <div>
                                <label className="block text-sm font-courier text-gray-400 mb-2">
                                    Which event(s)? *
                                </label>
                                <input
                                    type="text"
                                    value={formData.hackathonExperience.whichEvents}
                                    onChange={(e) => handleInputChange('hackathonExperience', 'whichEvents', e.target.value)}
                                    className="futuristic-input w-full"
                                    placeholder="Enter event names"
                                />
                            </div>
                        )}
                    </div>
                );

            case 5:
                return (
                    <div className="step-content space-y-4">
                        <h3 className="text-xl font-orbitron text-hackathon-orange mb-6">Declaration & Consent</h3>

                        {[
                            { key: 'detailsCorrect', text: 'I confirm that all details provided are correct' },
                            { key: 'feeAcknowledge', text: 'I understand that the registration fee is ₹500 per participant' },
                            { key: 'nonRefundable', text: 'I acknowledge registration is non-refundable & non-cancellable' },
                            { key: 'rulesAgree', text: 'I agree to follow all hackathon rules & code of conduct' },
                        ].map(({ key, text }) => (
                            <div
                                key={key}
                                className="flex items-start gap-3 cursor-pointer group hover:bg-white/5 p-2 rounded transition-colors"
                                onClick={() => handleInputChange(
                                    'declarations',
                                    key,
                                    !formData.declarations[key as keyof typeof formData.declarations]
                                )}
                            >
                                <div
                                    className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all shrink-0 ${formData.declarations[key as keyof typeof formData.declarations]
                                        ? 'bg-[#ff8c00] border-[#ff8c00] text-black'
                                        : 'border-gray-600 group-hover:border-[#ff8c00]/50'
                                        }`}
                                >
                                    {formData.declarations[key as keyof typeof formData.declarations] && (
                                        <Check className="w-4 h-4 text-black" />
                                    )}
                                </div>
                                <span className="text-gray-300 font-courier text-sm leading-tight pt-0.5 select-none">{text}</span>
                            </div>
                        ))}
                    </div>
                );

            case 6:
                if (paymentComplete) {
                    return (
                        <div className="step-content text-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-hackathon-loki/20 flex items-center justify-center mx-auto neon-glow-loki">
                                <Check className="w-10 h-10 text-hackathon-loki" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-orbitron text-white mb-2">Registration Complete!</h3>
                                <p className="text-gray-400 font-courier">Welcome to the HackWithIndia multiverse.</p>
                            </div>

                            <div className="hackathon-card max-w-sm mx-auto">
                                <p className="text-sm font-courier text-gray-400 mb-2">Your Unique Timeline Key</p>
                                <p className="text-2xl font-orbitron text-hackathon-orange mb-4">{uniqueHexId}</p>
                                <div className="bg-white p-4 rounded-lg inline-block">
                                    <QRCodeSVG value={qrData} size={150} />
                                </div>
                            </div>

                            <button
                                onClick={() => router.push('/dashboard')}
                                className="btn-primary font-orbitron w-full max-w-sm"
                            >
                                Proceed to Dashboard
                            </button>
                        </div>
                    );
                }

                return (
                    <div className="step-content text-center space-y-6">
                        <div className="hackathon-card mb-8">
                            <h3 className="text-xl font-orbitron text-white mb-4">Registration Summary</h3>
                            <div className="text-left space-y-3 font-courier text-sm text-gray-300">
                                <div className="flex justify-between">
                                    <span>Team Name:</span>
                                    <span className="text-white">{formData.teamName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Team Size:</span>
                                    <span className="text-white">{formData.teamSize} members</span>
                                </div>
                                <div className="border-t border-gray-700 pt-3 flex justify-between text-lg font-bold">
                                    <span className="text-hackathon-orange">Total Amount:</span>
                                    <span className="text-hackathon-orange">₹{amount}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isSubmitting}
                            className="btn-primary w-full py-4 text-lg font-orbitron flex items-center justify-center gap-3 relative overflow-hidden group"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-6 h-6" />
                                    Proceed to Payment
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                </>
                            )}
                        </button>

                        <p className="text-xs font-courier text-gray-500">
                            Secured by Razorpay. Updates will be sent to the team leader's email.
                        </p>
                    </div>
                );

            default:
                return null;
        }
    };



    return (
        <div className="min-h-screen relative overflow-hidden pb-20">
            {/* Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
            <div className="fixed inset-0 vignette pointer-events-none" />
            <div className="scanline" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 pt-8">
                {/* Header */}
                <div className="text-center mb-10 relative">
                    <button
                        onClick={() => router.push('/')}
                        className="absolute left-0 top-0 p-2 text-hackathon-orange hover:bg-hackathon-orange/10 rounded-full transition-all"
                        aria-label="Back to Home"
                    >
                        <Home className="w-6 h-6" />
                    </button>
                    <h1 className="text-3xl md:text-5xl font-cinzel font-bold gradient-text mb-4 pt-2">
                        Team Registration
                    </h1>
                    <p className="text-hackathon-orange font-courier">
                        Step {currentStep} of {STEP_TITLES.length}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="flex justify-between mb-10 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10 -translate-y-1/2" />
                    <div
                        ref={progressBarRef}
                        className="absolute top-1/2 left-0 h-1 bg-hackathon-orange -z-10 -translate-y-1/2"
                    />

                    {STEP_TITLES.map((step, index) => {
                        const Icon = step.icon;
                        const stepNum = index + 1;
                        const isActive = currentStep === stepNum;
                        const isCompleted = currentStep > stepNum;

                        return (
                            <div key={index} className="flex flex-col items-center">
                                <div
                                    className={`step-indicator ${isActive
                                        ? 'border-[#ff8c00] text-[#ff8c00] bg-black shadow-[0_0_15px_rgba(255,140,0,0.5)]'
                                        : isCompleted
                                            ? 'bg-[#ff8c00] border-[#ff8c00] text-black'
                                            : 'border-gray-600 text-gray-600 bg-black'
                                        }`}
                                >
                                    {isCompleted ? <Check className="w-5 h-5 font-bold" /> : <Icon className="w-5 h-5" />}
                                </div>
                                <span className={`mt-2 text-xs font-courier hidden md:block ${isActive ? 'text-hackathon-orange' : 'text-gray-600'
                                    }`}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="tva-terminal p-6 md:p-8 min-h-[400px]">
                    {renderStepContent()}
                </div>

                {/* Navigation Buttons */}
                {!paymentComplete && (
                    <div className="flex justify-between mt-8">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1 || isSubmitting}
                            className={`btn-secondary flex items-center gap-2 ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''
                                }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Back
                        </button>

                        {currentStep < 6 && (
                            <button
                                onClick={handleNext}
                                disabled={isSubmitting}
                                className="btn-primary flex items-center gap-2"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <ProtectedRoute>
            <Suspense fallback={<div>Loading...</div>}>
                <RegisterContent />
            </Suspense>
        </ProtectedRoute>
    )
}
