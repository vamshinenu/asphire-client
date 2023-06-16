import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import {Card} from "@/app/components/card";
import {features} from "@/app/constants/features";
import Image from "next/image";

const navigation = [
    {name: "Studies", href: "/us-studies"},
    {name: "Career", href: "/job-agency"},
    {name: "Contact", href: "/contact"},
    {name: "FAQ", href: "/faq"},
];

export default function Home() {
    return (
        <div
            className="flex flex-col w-full items-center justify-center bg-gradient-to-tl from-black via-zinc-600/20 to-black min-h-screen">
            <nav className="my-16 animate-fade-in">
                <ul className="flex items-center justify-center gap-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                        className={`text-sm text-zinc-500 duration-500 ${item.name === 'Career' ? 'hover:text-emerald-400' : item.name === 'Studies' ? 'hover:text-pink-400' : 'hover:text-zinc-300'}  `}
                        >
                            {item.name}
                        </Link>
                    ))}
                </ul>
            </nav>
            {/*<div*/}
            {/*    className="hidden h-px w-screen bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-glow animate-fade-left md:block"/>*/}
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={100}
            />
            <h1 className={`z-10  font-bold cursor-default whitespace-nowrap bg-white bg-clip-text text-4xl text-transparent duration-1000 animate-title text-edge-outline sm:text-6xl md:text-9xl`}>
                Asphire
            </h1>
            {/*<div*/}
            {/*    className="hidden h-px w-screen bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 animate-glow animate-fade-right md:block"/>*/}
            <div className="my-16 text-center animate-fade-in">
                <h2 className="px-8 text-sm text-zinc-500 lg:px-16 xl:px-32">
                    {`Empowering Careers, Global Studies Redefined. We revolutionize the way you manage your career and study abroad opportunities. Our innovative approach combines reduced commission rates, unmatched transparency, and state-of-the-art technology, delivering an unparalleled job-seeking experience and comprehensive support for your global study aspirations.`}
                </h2>
            </div>

            <span className={'text-zinc-500 animate-fade-in mt-4 tracking-widest bg-black px-8 py-4 rounded-2xl drop-shadow-xl '}>US Study and Job Agency</span>

            <div className="flex flex-col items-center gap-4 p-12 duration-700 group animate-glow">
                <Image className={'mt-16'} src={'/asphire.png'} alt={'asphire'} width={50} height={50}/>
                <Link className="text-2xl font-bold text-zinc-500 hover:text-zinc-300" href="/">
                    Asphire <span className="text-2xl font-medium text-zinc-700">Beta</span>
                </Link>
                <span className="mt-2 text-xs text-zinc-700">© 2021 Asphire. All rights reserved.</span>
                <p className="mt-2 mb-16 text-xs text-zinc-700">
                    Based in PA, USA.
                </p>
            </div>
        </div>
    );
}
