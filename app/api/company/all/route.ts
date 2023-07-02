import prisma from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const companies = prisma.company.findMany({
    });

    if (!companies) {
        return [];
    }

    return NextResponse.json(companies);
}