import type { Metadata } from "next";
import { Inter, Unbounded, Cinzel } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import PageTransition from "@/components/common/PageTransition";
import { AuthProvider } from "@/context/AuthContext";
import { SoundProvider } from "@/context/SoundContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-unbounded" }); // Modern/Sci-fi
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" }); // Magical/Marvel

export const metadata: Metadata = {
  title: "HackWithMumbai 2.0 | Initialize Protocol...",
  description: "National Level Hackathon Registration Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${unbounded.variable} ${cinzel.variable}`}>
        <ThemeProvider>
          <SoundProvider>
            <AuthProvider>
              <PageTransition>
                {children}
              </PageTransition>
            </AuthProvider>
          </SoundProvider>
        </ThemeProvider>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </body>
    </html>
  );
}
