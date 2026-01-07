import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: "rzp_live_RyEAE0jIXPrkrw",
    key_secret: "s5XbRM0Zg8EPvT9i7DX7BAhQ",
});

export async function POST(req: NextRequest) {
    try {
        const { amount } = await req.json();

        const options = {
            amount: amount * 100, // Amount in paise
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        };

        const order = await razorpay.orders.create(options);
        return NextResponse.json(order);
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        return NextResponse.json({ error: "Error creating order" }, { status: 500 });
    }
}
