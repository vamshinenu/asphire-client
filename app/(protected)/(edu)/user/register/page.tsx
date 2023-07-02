import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import getRoleOptions, { Role, Item } from "@/util/getRoleOptions";
import prisma from "@/prisma/prismaClient";
import Forms from "./forms";

async function getUser(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            id: true,
            email: true,
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

    return user;
}


export default async function RegisterPage() {

    const session = await getServerSession(authoptions);

    if (!session) redirect('/auth/login');

    let options: Item[] = [];

    const user = await getUser(session.user!.email as string);

    if (user?.id !== undefined && user?.role !== undefined) {
        options = getRoleOptions(user.role as Role);
    }
    console.log(options);

    if (options.length === 0) redirect('/auth/error?error=accessdenied');

    return (
        <>
            <Forms options={options} role={user!.role as Role} />
        </>
    )

}