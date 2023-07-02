import {features} from "@/app/constants/features";
import {Card} from "@/app/components/card";
import React from "react";

export default function JobAgencyAbout() {
    return (
        <div className="job-agency-about">
            <div className="container mx-auto flex h-full w-full flex-col items-center justify-center text-center">
                <h1 className={"text-3xl font-bold tracking-tight text-zinc-400 sm:text-4xl"}>Asphire</h1>
                {/*<p className={"text-3xl text-edge-outline bg-zinc-100  text-transparent bg-clip-text font-bold tracking-tight text-zinc-100 sm:text-4xl mt-2"}>Job Agency</p>*/}
                <p className="text-3xl bg-clip-text text-transparent sm:text-4xl font-bold tracking-tight mt-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600">
    Job Agency

                </p>

                <div
                    className="mx-auto grid w-full grid-cols-1 gap-8 p-10 max-w-8xl animate-fade-in-2 sm:grid-cols-2 lg:gap-16 xl:grid-cols-4">
                    {features.map((feature, index) => (
                        (<Card key={index}>
                                <div className="flex flex-col items-center gap-4 p-12 duration-700 group">
                                <span
                                    className="absolute h-1/3 w-px bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                                    aria-hidden="true"/>
                                    <span
                                        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-500 bg-zinc-900 text-sm text-zinc-200 duration-1000 drop-shadow-orange group-hover:border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white">
                    {feature.icon}
                </span>
                                    <div className="z-10 flex flex-col items-center">
                    <span
                        className="text-center text-2xl font-medium text-zinc-200 duration-150 font-display group-hover:text-white lg:text-2xl">
                        {feature.title}
                    </span>
                                        <span
                                            className="mt-4 text-center text-sm text-zinc-400 duration-1000 group-hover:text-zinc-200">
                        {feature.message}
                    </span>
                                    </div>
                                </div>
                            </Card>

                        )
                    ))}
                </div>
            </div>
        </div>
    )
}