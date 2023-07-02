import prisma from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {


    const { name, phone }: {
        name: string,
        phone: string,
    } = await req.json();

    let code;

    const response = await prisma.contactUsEdu.create(
        {
            // @ts-ignore
            data: {
                name,
                phone,
            }
        }
    )
        .catch((error) => {
            if (error.code === 'P2002') {
                code = "PHONE_EXISTS";
                return;
            }
            code = "UNKNOWN_ERROR";
        }
        );

    console.log(response);

    if (code === "PHONE_EXISTS") {
        return NextResponse.json({
            status: 400,
            code: 'PHONE_EXISTS',
            message: "Email and/or phone already exists",
        }
        );
    }
    else if (code === "UNKNOWN_ERROR") {
        return NextResponse.json({
            status: 400,
            code: 'UNKNOWN_ERROR',
            message: "Unknown error",
        }
        );
    }

    return NextResponse.json({
        status: 200,
        message: "Success",
    });
} 
