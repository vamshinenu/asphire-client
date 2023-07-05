import React from "react";
import Link from "next/link";

export default function ContactLayout({
                                          children,
                                      }: { children: React.ReactNode }) {
    return (
        <>
            <h2 className={`text-3xl text-center font-thin text-white`}><span>Contact <span
                className="font-bold text-3xl">Us</span></span>
            </h2>
            {children}
            <p className="text-xs max-w-md text-zinc-500 m-8 px-4 text-center md:px-8">
                By providing your email and phone number, you agree to receive updates about the progress of the
                website, the agency, starting dates, and more.
            </p>
        </>
    );
}