import React from "react";
import { Navigation } from "./components/nav";
import Link from "next/link";


export default async function Home() {

    return (
        <div className="flex flex-col items-center justify-center flex-grow w-full">
            <Navigation />
            <h1 className={`font-bold text-black mt-40  sm:text-6xl md:text-9xl`}>
                Asphire
            </h1>

            <div className="flex flex-row justify-center gap-2 my-16">
                <Link href={'/edu'} className="p-4 text-center duration-500 rounded-lg shadow-xl w-52 outline outline-1 outline-zinc-200 hover:shadow-sm">Education</Link>
                <Link href={'/job'} className="p-4 text-center duration-500 rounded-lg shadow-xl w-52 outline outline-1 outline-zinc-200 hover:shadow-sm">Job</Link>
                <Link href={'/visa'} className="p-4 text-center duration-500 rounded-lg shadow-xl w-52 outline outline-1 outline-zinc-200 hover:shadow-sm">Visa</Link>
            </div>

            <div className="text-center animate-fade-in">
                <h2 className="max-w-4xl px-8 text-sm text-zinc-500 lg:px-16 xl:px-32">
                    {`Empowering Careers, Global Studies Redefined. We revolutionize the way you manage your career and study abroad opportunities. Our innovative approach combines reduced commission rates, unmatched transparency, and state-of-the-art technology, delivering an unparalleled job-seeking experience and comprehensive support for your global study aspirations.`}
                </h2>

            </div>
        </div>
    );
}