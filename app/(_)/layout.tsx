import "../../global.css";
import { Inter } from "@next/font/google";
import { Metadata } from "next";
import {Navigation} from "@/app/components/nav";
import Particles from "@/app/components/particles";
import {Mail} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: {
        default: "Asphire",
        template: "%s | asphire.co",
    },
    description: "The Future Of Job Agency",
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
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export default function InfoLayout({
                                           children,
                                       }: { children: React.ReactNode }) {
    return (
        <div className='flex w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black'>
        <Navigation/>
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in-2"
                quantity={100}/>
            {children}
            <p className="text-xs text-zinc-500 mt-8">
                For more info, contact Lead Dev at Asphire.
            </p>
            <a href="mailto:vamshinenu@asphire.co" className="flex flex-row text-sm items-center gap-2 text-zinc-500 duration-500 hover:text-zinc-300 mt-2">
                <Mail size={16} /> vamshinenu@asphire.co
            </a>
            <Link className="text-2xl font-bold text-zinc-500 hover:text-zinc-300 mt-16 mb-16" href="/">
                Asphire
            </Link>

        </div>
    );
}
