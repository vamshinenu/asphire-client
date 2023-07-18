import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import AdminUserView from "./AdminUserView";
import { Suspense } from "react";

export default async function Dashboard() {
    const session = await getServerSession(authoptions);

    if (!session) {
        redirect('/auth/login');
    }

    const LoadingSkeletonCard = () => {
        return (
            <div className="p-4 shadow-md rounded-xl outline outline-1 outline-zinc-200">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-200"></div>
                        <div className="w-24 h-6 overflow-hidden text-lg font-bold rounded text-zinc-200 overflow-ellipsis whitespace-nowrap bg-zinc-200"></div>
                    </div>
                    <div className="w-12 h-4 text-xs rounded text-zinc-500 bg-zinc-200"></div>
                </div>
                <div className="flex items-center justify-between">
                    <div className={`px-2 py-1 text-sm bg-zinc-200 ${Math.random() < 0.5 ? 'text-orange-400' : 'text-emerald-400'} rounded`}></div>
                    <div className="w-8 h-4 text-sm rounded text-zinc-300 bg-zinc-200"></div>
                </div>
                <div className="mt-4">
                    <p className="h-6 overflow-hidden text-sm rounded text-zinc-700 overflow-ellipsis bg-zinc-200"></p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="w-16 h-4 text-xs rounded text-zinc-500 bg-zinc-200"></div>
                </div>
            </div>
        );
    };

    const user = await prisma.user.findUnique({
        where: {
            email: session.user!.email as string,
        },
        select: {
            id: true,
            name: true,
            role: true,
            memberOfCompany: {
                select: {
                    id: true,
                    name: true,
                }

            }
        }
    });

    if (!user) {
        redirect('/auth/login');
    }

    if (user.role === 'INT_CANDIDATE' || user.role === 'EXT_CANDIDATE') {
        return (
            redirect(`/user/${user.id}`)
        )
    }
    else {
        return (
            <Suspense
                fallback={
                    <div className="flex flex-col items-stretch justify-between min-h-screen">
                        {/* <AdminUserView pageSize={pageSize} pageNumber={pageNumber} /> */}
                        <div className="flex flex-col items-center">
                            <div className="flex flex-row flex-wrap items-center justify-center gap-4 sm:justify-start">
                                <input
                                    disabled={true}
                                    id="search disabled"
                                    type="text"
                                    className="px-3 py-2 text-lg rounded-xl border-zinc-500 bg-zinc-200 text-zinc-200 font-md placeholder-zinc-800 sm:text-xl animate-pulse"
                                />
                                <select
                                    id="sort disabled"
                                    className="px-3 py-2 text-lg rounded-xl border-zinc-500 bg-zinc-200 text-zinc-200 font-md placeholder-zinc-800 sm:text-xl"
                                    placeholder="Sort By "
                                >
                                    <option value="all">Sort By Date</option>
                                    <option value="asc">Date Asc</option>
                                    <option value="desc">Date Des</option>
                                </select>
                            </div>
                            <div className="grid w-full grid-cols-1 gap-4 p-8 max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {
                                    Array.from({ length: 8 }, (_, i) => <LoadingSkeletonCard key={i} />)
                                }
                            </div>
                        </div>
                    </div>
                }
            >
                <AdminUserView />
            </Suspense>
        )
    }
}