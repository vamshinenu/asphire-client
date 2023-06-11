import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { Inter } from 'next/font/google'
import {Card} from "@/app/components/card";

const navigation = [
    {name: "About", href: "/about"},
    {name: "Contact", href: "/contact"},
    {name: "FAQ", href: "/faq"},
];

const inter = Inter({ subsets: ['latin'] })

const perks = [
    {title: 'Commission', subtitle: 'As Low As 12%'},
    {title: 'Transparency', subtitle: 'Every Action Is Known'},
    {title: 'Modern', subtitle: 'With The Power Of AI'}
]

export default function Home() {
    return (
        <div
            className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
            <nav className="my-16 animate-fade-in">
                <ul className="flex items-center justify-center gap-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm text-zinc-500 duration-500 hover:text-zinc-300"
                        >
                            {item.name}
                        </Link>
                    ))}
                </ul>
            </nav>
            <div
                className="hidden h-px w-screen bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-glow animate-fade-left md:block"/>
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={100}
            />
            <h1 className={` ${inter.className} z-10  font-bold cursor-default whitespace-nowrap bg-white bg-clip-text text-4xl text-transparent duration-1000 animate-title text-edge-outline sm:text-6xl md:text-9xl`}>
                Asphire
            </h1>

            <div
                className="hidden h-px w-screen bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-glow animate-fade-right md:block"/>
            <div className="my-16 text-center animate-fade-in">
                <h2 className="px-4 text-sm text-zinc-500">
                    is a revolutionary job agency transforming the way you manage your career opportunities. We've
                    pioneered a unique approach, combining reduced commission rates, unmatched transparency, and
                    state-of-the-art technology to offer an unrivaled job-seeking experience.
                </h2>
            </div>
            <div className="mx-auto grid w-full grid-cols-1 gap-8 px-20 animate-fade-in sm:mt-0 sm:grid-cols-3 lg:gap-16">
                    {perks.map((item) =>
                        <Card key={`${item.title}`}>
                            <div
                                className={inter.className + "flex h-full flex-col items-center justify-center gap-4 p-4 group"}>
                                <h2 className="text-center text-xl text-zinc-500 duration-500 group-hover:text-zinc-300">{item.title}</h2>
                                <p className="text-center text-xs text-zinc-700 duration-500 group-hover:text-zinc-500">{item.subtitle}</p>
                            </div>
                        </Card>
                    )
                    }
                </div>
        </div>
    );
}
