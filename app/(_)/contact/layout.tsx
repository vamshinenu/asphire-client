import {Inter} from "next/font/google";
import React from "react";
import {Metadata} from "next";


export default function ContactLayout({
                                          children,
                                      }: { children: React.ReactNode }){
    return (
        <>
    <h2 className={`font-bold text-3xl text-white`}>Contact Us</h2>
    {children}
    <p className="text-justify text-xs max-w-md text-zinc-500 mt-8 ph-4 md:ph-8">
        By providing your email and phone number, you agree to receive updates about the progress of the website, the agency, starting dates, and more.
    </p>
    </>
    );
}


{/*<div className="">*/}
{/*<h2 className={`font-bold text-3xl text-white`}>Get Updates</h2>*/}
{/*{children}*/}
{/*<p className="text-justify text-xs max-w-md text-zinc-500 mt-8 ph-4 md:ph-8">*/}
{/*    By providing your email and phone number, you agree to receive updates about the progress of the website, the agency, starting dates, and more.*/}
{/*</p>*/}
{/*</div>*/}