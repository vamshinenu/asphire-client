import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import {Card} from "@/app/components/card";
import {features} from "@/app/constants/features";
import Image from "next/image";

const navigation = [
    // {name: "About", href: "/about"},
    {name: "Contact", href: "/contact"},
    {name: "FAQ", href: "/faq"},
];

export default function Home() {
    return (
        <div className="flex w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
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
            <div className="hidden h-px w-screen bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-glow animate-fade-left md:block"/>
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={100}
            />
            <h1 className={`z-10  font-bold cursor-default whitespace-nowrap bg-white bg-clip-text text-4xl text-transparent duration-1000 animate-title text-edge-outline sm:text-6xl md:text-9xl`}>
                Asphire
            </h1>

            <div
                className="hidden h-px w-screen bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-glow animate-fade-right md:block"/>
            <div className="my-16 text-center animate-fade-in">
                <h2 className="px-8 text-sm text-zinc-500 lg:px-16 xl:px-32">
                    {`is a revolutionary job agency transforming the way you manage your career opportunities. We've
                        pioneered a unique approach, combining reduced commission rates, unmatched transparency, and
                        state-of-the-art technology to offer an unrivaled job-seeking experience.`}
                </h2>
            </div>
            <div className="mx-auto grid w-full grid-cols-1 gap-8 p-20 animate-fade-in sm:grid-cols-2 lg:gap-16 xl:grid-cols-4">
            {features.map((feature, index) => (
               (
                    <Card key={index}>
                        <div className="flex flex-col items-center gap-4 p-12 duration-700 group">
                            <span className="absolute h-1/3 w-px bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent" aria-hidden="true"/>
                            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-500 bg-zinc-900 text-sm text-zinc-200 duration-1000 drop-shadow-orange group-hover:border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white">
                    {feature.icon}
                </span>
                            <div className="z-10 flex flex-col items-center">
                    <span className="text-center text-xl font-medium text-zinc-200 duration-150 font-display group-hover:text-white lg:text-2xl">
                        {feature.title}
                    </span>
                                <span className="mt-4 text-center text-sm text-zinc-400 duration-1000 group-hover:text-zinc-200">
                        {feature.message}
                    </span>
                            </div>
                        </div>
                    </Card>
                )
            ))}
            </div>
            <div className="flex flex-col items-center gap-4 p-12 duration-700 group">
                <Image className={'mt-16'} src={'/asphire.png'} alt={'asphire'} width={50} height={50}/>
                <Link className="text-2xl font-bold text-zinc-500 hover:text-zinc-300" href="/">
                    Asphire <span className="text-2xl font-medium text-zinc-700">Beta</span>
                </Link>
                <span className="mt-2 text-xs text-zinc-700">© 2021 Asphire. All rights reserved.</span>
                <p className="mt-2 mb-16 text-xs text-zinc-700">
                    Based in USA, India.
                </p>
            </div>
        </div>
    );
}
