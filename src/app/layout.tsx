import type { Metadata } from "next";
import { Inter, Cinzel_Decorative, Courier_Prime } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll"; // We'll make this small wrapper

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel_Decorative({ weight: ["400", "700", "900"], subsets: ["latin"], variable: "--font-cinematic" });
const courier = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-retro" });

export const metadata: Metadata = {
  title: "HackWithMumbai 2.0 | Multiverse of Code",
  description: "National Level Hackathon - Enter the Multiverse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} ${courier.variable} antialiased bg-darkhold text-white overflow-x-hidden`}>
        <div className="vignette fixed inset-0 pointer-events-none z-40"></div>
        <div className="crt fixed inset-0 pointer-events-none z-50"></div>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
