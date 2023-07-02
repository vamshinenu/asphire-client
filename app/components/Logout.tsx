'use client';
import { signOut } from "next-auth/react";

export default function Logout() {
    return (
        <button
            key={'logout'}
            onClick={() => signOut()}
            className={`duration-500 hover:text-red-500`}
        >
            Logout
        </button>
    )
}