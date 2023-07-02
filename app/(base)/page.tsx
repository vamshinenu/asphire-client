import Link from "next/link";
import React from "react";
import Particles from "@/app/components/particles";
import { getServerSession } from "next-auth";
import { authoptions } from "../api/auth/[...nextauth]/route";
import Logout from "../components/Logout";
import { navigation } from "@/app/constants/navigation";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authoptions);

    if (session) {
        redirect('/dashboard');
    }

    return (
        <div className="flex flex-col items-center justify-center flex-grow w-full black-gradient">
            <nav className="my-16 animate-fade-in">
                <ul className="flex flex-col items-center justify-center gap-4 text-sm md:flex-row text-zinc-500">
                    {
                        navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`duration-500 ${item.name === 'Job' ? 'hover:text-emerald-400' : item.name === 'Education' ? 'hover:text-pink-400' : 'hover:text-zinc-300'}  `}
                            >
                                {item.name}
                            </Link>
                        ))
                    }
                    {(!session &&
                        <Link href={'/auth/login'} className="p-2 text-sm duration-500 rounded-lg outline outline-1 hover:rounded-3xl hover:text-emerald-400 hover:outline-emerald-400 text-zinc-500 animate-fade-in">
                            Sign In</Link>
                    )}
                    {
                        (session &&
                            <div className="flex flex-row items-center justify-center p-4 duration-500 border divide-x rounded-lg divide-zinc-500 border-zinc-500 hover:rounded-2xl">
                                <Link href={'/(edu)/dashboard'} className="px-2 duration-500 hover:text-zinc-300">Dashboard</Link>
                                <div className="px-2">
                                    <Logout />
                                </div>
                            </div>
                        )
                    }
                </ul>
            </nav>
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in-2"
                quantity={100}
            />
            <h1 className={`z-10  font-bold cursor-default whitespace-nowrap bg-white bg-clip-text text-4xl text-transparent duration-1000 animate-title text-edge-outline sm:text-6xl md:text-9xl`}>
                Asphire
            </h1>

            <div className="my-16 text-center animate-fade-in">
                <h2 className="max-w-4xl px-8 text-sm text-zinc-500 lg:px-16 xl:px-32">
                    {`Empowering Careers, Global Studies Redefined. We revolutionize the way you manage your career and study abroad opportunities. Our innovative approach combines reduced commission rates, unmatched transparency, and state-of-the-art technology, delivering an unparalleled job-seeking experience and comprehensive support for your global study aspirations.`}
                </h2>
            </div>)

            <span className={'text-zinc-500 animate-fade-in mt-4 tracking-widest bg-black px-8 py-4 rounded-2xl drop-shadow-xl '}>US Study and Job Agency</span>)
        </div>
    );

}