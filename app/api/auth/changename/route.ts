import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authoptions } from "../[...nextauth]/route";
import prisma from "@/prisma/prismaClient";

export async function POST(req: NextRequest) {

    const { name } = await req.json();

    const session = await getServerSession(authoptions);


    if (!session || !session.user) {
        return NextResponse.redirect('/login');
    }

    let response = await prisma.user.update(
        {
            where: {
                email: session.user.email as string,
            },
            data: {
                name: name,
            }
        }
    );

    console.log(response);
    // const _response = JSON.stringify(response) ;

    // if (_response.status === 200 ) {
    //     redirect('/');
    // }

    return NextResponse.json(response);
}