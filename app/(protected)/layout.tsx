import { Montserrat } from "next/font/google";
import { Metadata } from "next";
import React from "react";
import '../../global.css';
import Footer from "@/app/components/Footer";
import AuthProvider from "@/app/AuthProvider";

import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
    title: {
        default: "Asphire",
        template: "%s | asphire.co",
    },
    description: "The Future Of Careers",
    openGraph: {
        title: "Asphire",
        description:
            "The Future Of Job Agency",
        url: "https://asphire.co",
        siteName: "asphire.co",
        locale: "en-US",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        shortcut: "/favicon.png",
    },
};

const inter = Montserrat({
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <html lang="en" className={inter.className}>
                <body
                    className={
                        `
				bg-white flex flex-col min-h-screen justify-between
				${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
                        }`}
                >
                    {children}
                    <Footer />
                    <Analytics />
                </body>
            </html>
        </AuthProvider>
    );
}