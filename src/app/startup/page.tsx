"use client";

import StartupLoader from "@/components/startup/StartupLoader";
import { useRouter } from "next/navigation";

export default function StartupPage() {
    const router = useRouter();

    return <StartupLoader onComplete={() => router.push("/")} />;
}
