import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <div className="flex flex-row items-end justify-center w-full gap-4 py-4 mt-4 duration-700 group animate-glow">
            <Link href={'/job'}
                className="px-2 text-xs duration-500 text-zinc-500 hover:text-emerald-400"
            >Job</Link>
            <Link href={'/edu'}
                className="px-2 text-xs duration-500 text-zinc-500 hover:text-emerald-400"
            >Education</Link>
            <Link href={'/privacy-policy'}
                className="px-2 text-xs duration-500 text-zinc-500 hover:text-emerald-400"
            >help</Link>

            <Link href="/">
                <Image className={''} src={'/asphire.png'} alt={'asphire'} width={25} height={25} />
            </Link>
            {/* <Link className="text-sm font-bold text-zinc-500 hover:text-zinc-300" href="/">
                Asphire
            </Link> */}
            <Link href={'/privacy-policy'}
                className="px-2 text-xs duration-500 text-zinc-500 hover:text-emerald-400"
            >Privacy</Link>

            <Link href={'/faq'}
                className="px-2 text-xs duration-500 text-zinc-500 hover:text-emerald-400"
            >FAQ</Link>

            <Link href={'/contact'}
                className="px-2 text-xs duration-500 text-zinc-500 hover:text-emerald-400"
            >Contact</Link>
        </div>
    )
};