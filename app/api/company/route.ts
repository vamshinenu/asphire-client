import prisma from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    console.log("Inside GET");
    console.log("borrr here")

    const { slug } = await req.json();

    console.log(`slug from GET: ${slug}`);

    const company = await prisma.companyEdu.findUnique({
        where: {
            id: slug
        },
    });

    if (!company) {
        return NextResponse.json({}, {
            status: 400,
            statusText: "COMPANY_DOES_NOT_EXIST",
        })
    }

    return NextResponse.json(company);
}