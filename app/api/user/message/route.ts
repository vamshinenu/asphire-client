import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log(req);
    const session = await getServerSession(authoptions);

    console.log(session);

    if (!session) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user?.email as string
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
        console.log('user not found');
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const { message }: { message: string } = await req.json();

    const stageId = req.nextUrl.searchParams.get('stageId') as string;

    console.log(stageId);
    console.log(message);

    if (!message) {
        return NextResponse.json({ message: 'Message is required' }, { status: 400 });
    }

    const newMessage = await prisma.message.create({
        data: {
            message: message,
            userId: user.id,
            stageId: stageId
        }
    });

    console.log(newMessage);

    if (!newMessage) {
        return NextResponse.json({ message: 'Error creating message' }, { status: 500 });
    }

    // revalidateTag('messages')

    return NextResponse.json(
        {
            revalidated: true,
            newMessage
        },

        {

            status: 200
        })

}


export async function GET(req: NextRequest) {
    const stageId = req.nextUrl.searchParams.get('stageId') as string;

    console.log(stageId);

    const messages = await prisma.message.findMany({
        where: {
            stageId: stageId
        },

        select: {
            id: true,
            User: {
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
            },
            message: true,
            createdAt: true
        }
    });

    console.log(messages);

    if (!messages) {
        return NextResponse.json([])
    }

    return NextResponse.json(messages, { status: 200 })
}