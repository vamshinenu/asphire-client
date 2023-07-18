import React from "react";
import AuthNavigation from "@/app/components/AuthNav";
import { getServerSession } from "next-auth/next";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/prisma/prismaClient";

export default async function GlobalStudiesLayout({
    children,
}: { children: React.ReactNode }) {

    const session = await getServerSession(authoptions);
    if (!session) redirect('/auth/error?error=accessdenied');

    const user = await prisma.user.findUnique({
        where: {
            email: session.user?.email as string
        },
        select: {
            role: true,
            memberOfCompany: {
                select: {
                    id: true,
                    name: true
                }
            },
        }
    });
    console.log(user);

    return (
        <div
            className="flex flex-col flex-grow w-full">
            <AuthNavigation isInternalAdmin={user !== null && user!.role! as string === 'INT_ADMIN'}
                isCandidate={user !== null && (user!.role! as string).includes('CANDIDATE')} />
            {children}
        </div>
    );
}
