import prisma from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400, statusText: "Missing fields" });
    }


    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            CompanyEdu: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    });

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(user);
}