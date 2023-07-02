import prisma from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

async function getCompanies(req: NextRequest) {
    const search = req.nextUrl.searchParams.get("search");
    console.log(search);

    if (!search) {
        return [];
    }

    const companies = await prisma.company.findMany({
        where: {
            name: {
                contains: search,
            }
        },
        select: {
            id: true,
            name: true,
            members: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }

        }
    });

    return NextResponse.json(JSON.stringify(companies));
}


export { getCompanies as POST }