import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
    return (

        <div className="flex py-1 flex-row items-center bg-white  w-full justify-center gap-4 duration-700 group animate-glow mt-4">
          <Link href="/">
              <Image className={''} src={'/asphire.png'} alt={'asphire'} width={25} height={25}/>
          </Link>
                <Link className="text-sm font-bold text-zinc-500 hover:text-zinc-300" href="/">
                    Asphire <span className="text-sm font-medium text-zinc-700">Beta</span>
                </Link>
                <span className=" text-xs text-zinc-700">© 2021 Asphire. All rights reserved.</span>
        </div>
    )
};