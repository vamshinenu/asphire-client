import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <div className="flex flex-row items-center justify-center w-full gap-4 py-1 mt-4 duration-700 bg-white group animate-glow">
            <Link href="/">
                <Image className={''} src={'/asphire.png'} alt={'asphire'} width={25} height={25} />
            </Link>
            <Link className="text-sm font-bold text-zinc-500 hover:text-zinc-300" href="/">
                Asphire <span className="text-sm font-medium text-zinc-700">Beta</span>
            </Link>
            <span className="text-xs  text-zinc-700">© 2023 Asphire. All rights reserved.</span>
        </div>
    )
};