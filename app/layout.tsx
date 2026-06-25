import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import LenisScroll from "@/components/lenis";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "ChatPDF",
    description: "Chat with your PDF",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${montserrat.className} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col items-stretch">
                <ClerkProvider>
                    <Providers>
                        {children}
                        <Toaster />
                    </Providers>
                </ClerkProvider>
            </body>
        </html>
    );
}
