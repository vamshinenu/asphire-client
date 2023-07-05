import Link from "next/link";
import { Plus, UserPlus2 } from "lucide-react";
import React from "react";

export const RegisterUserButton = () => {
    return (<Link href="/user/register">
        <button
            className="z-10 px-4 py-2 text-center duration-500 rounded-lg hover:rounded-2xl outline outline-1 outline-gray-700 hover:bg-white hover:text-black">
            <UserPlus2 />
        </button>
    </Link>)
}

export const RegisterCompanyButton = () => {
    return (
        <Link href="/company/register">
            <button
                className="z-10 px-4 py-2 text-center duration-500 rounded-lg hover:rounded-2xl outline outline-1 outline-gray-700 hover:bg-white hover:text-black">
                <Plus />
            </button>
        </Link>
    )
}