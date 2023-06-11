import "../../global.css";
import {Navigation} from "@/app/components/nav";
import Particles from "@/app/components/particles";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function InfoLayout({
                                       children,
                                   }: { children: React.ReactNode }) {
    return (
        <div
            className='flex w-screen max-h-full flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black'>
            <Navigation/>
            <Particles
                className="absolute inset-0 -z-10"
                quantity={100}/>
            {/*container mx-auto flex pt-40 flex-col items-center justify-center px-4*/}
            <div className={' flex pt-40 flex-col items-center'}>
            {children}
            </div>


                    <div className={'flex-col items-center justify-center flex animate-fade-in-2 mt-32  mb-16 gap-2' }>
                        <Image src={'/asphire.png'} alt={'asphire'} width={50} height={50}/>
                        <Link className="text-2xl font-bold duration-500 text-zinc-500 hover:text-zinc-300" href="/">
                            Asphire
                        </Link>
                        {/*<p className="text-xs text-zinc-500">*/}
                        {/*    For more info, contact Asphire Team.*/}
                        {/*</p>*/}
                        <a href={"mailto:ask@asphire.co"} className={'duration-500 text-center text-sm text-zinc-400 hover:text-zinc-200'}>
                            ask@asphire.co
                        </a>
                        <span className=" text-xs text-zinc-700 mt-4">© 2021 Asphire. All rights reserved.</span>
                        <p className="text-xs text-zinc-700 ">
                            Based in USA, India.
                        </p>

                    </div>

        </div>
    );
}
