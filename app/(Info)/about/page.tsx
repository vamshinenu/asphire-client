"use client";
import {Card} from "../../components/card";

import {features} from "@/app/constants/features";



export default function About() {
    return (
        <div className="container mx-auto flex flex-col min-h-screen items-center justify-items-start px-4 pt-32">
            <h1 className="text-white text-3xl">About Asphire</h1>
            <p className="text-zinc-300">
                {`Founded out of a personal experience with the opacity of traditional
                    job agencies, Asphire was born from the frustration of paying high commissions without a clear
                    understanding of the process or its fairness. We have experienced firsthand the stress of
                    job-seeking without support or guidance, a predicament shared by many colleagues and friends.
                    This gave birth to our dream - creating a platform where job seekers don't just find a job, but
                    understand where they stand in the job market, receive professional advice, and enjoy full
                    transparency in the process.`}</p>

            <p className="text-zinc-300">{`Our mission at Asphire is straightforward: to present job seekers with
                optimal opportunities while charging them minimally. We are committed to providing a seamless,
                transparent, and supportive job-seeking experience`}.</p>
            <h2 className="text-2xl text-zinc-300">Our Team</h2>

            <p className="text-zinc-300">{`Our team page is currently under development, but until it's ready,
                allow us to introduce our founder, Vamshi Nenu. Vamshi, along with a dedicated team of
                developers, is passionately piecing together a revolutionary platform for job seekers. While
                we're just starting our journey, we're committed to making a significant impact on the
                job-seeking process. We'll have more updates on our progress and successes soon.`}</p>
            <div className="mx-auto mt-32 grid w-full grid-cols-1 gap-8 sm:mt-0 sm:grid-cols-3 lg:gap-16">
                <Card>
                    <div
                        className="flex flex-col items-center gap-4 p-4 duration-700 group md:gap-8 md:p-16 md:py-24 lg:pb-48">
            <span className="absolute h-1/3 w-px bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                  aria-hidden="true"/>

                        <span
                            className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-500 bg-zinc-900 text-sm text-zinc-200 duration-1000 drop-shadow-orange group-hover:border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white">
                {features[0].icon}
            </span>
                        <div className="z-10 flex flex-col items-center">
                <span
                    className="text-center text-xl font-medium text-zinc-200 duration-150 font-display group-hover:text-white lg:text-3xl">
                    {features[0].title}
                </span>
                            <span
                                className="mt-4 text-center text-sm text-zinc-400 duration-1000 group-hover:text-zinc-200">
                    {features[0].message}
                </span>
                        </div>
                    </div>
                </Card>
                {features.map((feature, index) => (
                    index !== 0 && (
                        <Card key={index}>
                            <div className="flex flex-col items-center gap-4 p-4 duration-700 group md:gap-8 md:p-16 md:py-24 lg:pb-48">
                                <span className="absolute h-1/3 w-px bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent" aria-hidden="true"/>
                                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-500 bg-zinc-900 text-sm text-zinc-200 duration-1000 drop-shadow-orange group-hover:border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white">
                    {feature.icon}
                </span>
                                <div className="z-10 flex flex-col items-center">
                    <span className="text-center text-xl font-medium text-zinc-200 duration-150 font-display group-hover:text-white lg:text-3xl">
                        {feature.title}
                    </span>
                                    <span className="mt-4 text-center text-sm text-zinc-400 duration-1000 group-hover:text-zinc-200">
                        {feature.message}
                    </span>
                                </div>
                            </div>
                        </Card>
                    )
                ))}
            </div>
        </div>
    );
}
