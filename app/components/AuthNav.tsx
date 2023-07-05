'use client';

import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { RegisterCompanyButton, RegisterUserButton } from "@/app/components/Buttons";
import { signOut } from "next-auth/react";


export default function AuthNavigation({ isInternalAdmin, isCandidate }: { isInternalAdmin?: boolean, isCandidate?: boolean }) {
    return (
        <header className="mb-28">
            <div
                className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b bg-zinc-900/500  border-zinc-800 `}
            >
                <div className="container flex flex-row-reverse items-center justify-between p-4 mx-auto">
                    <div className="flex justify-between gap-4">
                        {!isCandidate && <RegisterUserButton />}
                        {isInternalAdmin && <RegisterCompanyButton />}
                        <button
                            key={'logout'}
                            onClick={() => signOut()}
                            className={`z-10 px-4 py-2 outline  hover:rounded-2xl rounded-lg outline-1 duration-500 hover:text-red-500`}
                        >
                            Logout
                        </button>
                    </div>
                    <Link href='/'>
                        <Image className={''} src={'/asphire.png'} alt={'asphire'} width={40} height={40} />
                    </Link>
                </div>
            </div>
        </header>
    )
};
