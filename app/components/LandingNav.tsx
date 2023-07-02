import Link from "next/link";
import Logout from "@/app/components/Logout";
import React from "react";
import {useSession} from "next-auth/react";
import {navigation} from "@/app/constants/navigation";
import {getServerSession} from "next-auth";
import {authoptions} from "@/app/api/auth/[...nextauth]/route";

export default async function LandingNav() {
    const session = await getServerSession(authoptions);


    return (
        <nav className="my-16 animate-fade-in">
            <ul className="md:flex md:flex-row hidden text-center items-center justify-center gap-4 text-sm text-zinc-500">
                {
                    navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`duration-500 pr-4 md:pr-0 ${item.name === 'Job' ? 'hover:text-emerald-400' : item.name === 'Education' ? 'hover:text-pink-400' : 'hover:text-zinc-300'}  `}
                        >
                            {item.name}
                        </Link>
                    ))
                }

                {/*/Users/va/Library/Application Support/CleanShot/media/media_3HmEEblB0d/IMG_F2EC5A0C41D2-1.jpeg*/}
                {(session &&
                    <Link href={'/auth/login'} className="p-2 text-sm duration-500 outline outline-1 rounded-lg hover:rounded-3xl hover:text-emerald-400 hover:outline-emerald-400 text-zinc-500 animate-fade-in">
                        Sign In</Link>
                )}
                {
                    (!session &&
                        <div className="flex flex-row items-center divide-x  divide-zinc-500 justify-center p-4 border border-zinc-500 rounded-lg hover:rounded-2xl duration-500">
                            <Link href={'/(edu)/dashboard'} className="px-2 hover:text-zinc-300  duration-500">Dashboard</Link>
                            <div className="px-2">
                                <Logout />
                            </div>
                        </div>
                    )
                }
            </ul>
        </nav>
)
}