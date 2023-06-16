import "../../global.css";
import {Navigation} from "@/app/components/nav";
import Particles from "@/app/components/particles";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function InfoLayout({
                                       children,
                                   }: { children: React.ReactNode }) {
    return (
        <div
            className="flex flex-col justify-between flex-grow w-full black-gradient">
            <div>
                <Navigation/>
                <Particles
                    className="absolute inset-0 -z-10"
                    quantity={100}/>
                <div className={' flex pt-20 flex-col items-center'}>
                    {children}
                </div>
            </div>
            <div className="flex flex-col items-center gap-2 mt-4
            ">
                <a href="mailto:ask@asphire.co" className="text-zinc-500 hover:text-zinc-100 duration-500"> ask@asphire.co</a>
                <p className="text-xs max-w-md text-zinc-700 px-4 text-center md:px-8">For more custom details or tie ups or any enquiries, feel free to mail us we will get back to you in <span className="underline">24 hours</span></p>
            </div>
        </div>
    );
}
