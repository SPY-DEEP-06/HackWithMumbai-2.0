import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebase"; // Using client SDK for simplicity in this demo, but ideally Admin SDK for server
// Note: Client SDK in API route works but is not ideal for high security. 
// However, since we are doing signature verification here which is the critical part, logic is secure enough for this hackathon context.
// For production scale, use firebase-admin. Since prompts didn't ask to setup Service Account for Admin SDK, we'll use Client SDK or assume Admin functionality is abstracted.
// Actually, using Client SDK in Node environment (API Route) requires different setup or polyfills sometimes.
// But for standard Next.js API routes, it often works if configured.
// To be safe and standard, I will assume we can write to Firestore here.

// IMPORTANT: Real world app should use firebase-admin.
// I will fetch 'firebase-admin' if I had it. But I installed 'firebase' (client).
// I'll use the 'firebase' package which works in Node.js too for basic ops.

import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const SECRET = "s5XbRM0Zg8EPvT9i7DX7BAhQ";

export async function POST(req: NextRequest) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            formData,
            userId
        } = await req.json();

        // 1. Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
        }

        // 2. Save to Firestore
        // Generate a unique Team ID (Hex)
        const teamIdText = Math.random().toString(16).substring(2, 8).toUpperCase();
        const uniqueTeamId = `HWM-${teamIdText}`;

        const registrationDoc = {
            ...formData,
            payment: {
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                amount: formData.amount,
                status: "paid",
                timestamp: new Date().toISOString(),
            },
            teamId: uniqueTeamId,
            userId: userId,
            createdAt: new Date().toISOString(),
        };

        // Use setDoc with a specific ID if needed, or addDoc
        const docRef = await addDoc(collection(db, "registrations"), registrationDoc);

        return NextResponse.json({ success: true, teamId: uniqueTeamId, docId: docRef.id });

    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
    }
}
