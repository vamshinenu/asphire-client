import prisma from "@/prisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

    const { email, phone } = await req.json();

    let code;

    await prisma.contactUsJob.create(
        {
            // @ts-ignore
            data: {
                email,
                phone,
            }
        }
    )
        .catch((error) => {
            console.log(error.code);
            console.log(error.code === 'P2002');
            if (error.code === 'P2002') {
                code = "EMAIL_PHONE_EXISTS";
                return;
            }
            code = "UNKNOWN_ERROR";
        }
        );

    if (code === "EMAIL_PHONE_EXISTS") {
        return NextResponse.json(
            {
                status: 400,
                code: 'EMAIL_PHONE_EXISTS',
                message: "Email and/or phone already exists",
            }
        );
    }
    else if (code === "UNKNOWN_ERROR") {
        return NextResponse.json(
            {
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
