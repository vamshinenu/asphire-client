import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authoptions } from "../../auth/[...nextauth]/route";
import prisma from "@/prisma/prismaClient";
import generateId from "@/util/idGenerator";
import { stages } from "@/app/constants/stages";

export async function POST(req: NextRequest) {

    const stageId = req.nextUrl.searchParams.get("stageId") as string;
    const candidateId = req.nextUrl.searchParams.get("candidateId") as string;
    const amount = req.nextUrl.searchParams.get("amount") as string;

    console.log(stageId, candidateId);

    const session = await getServerSession(authoptions);

    if (!session || !session.user) {
        return NextResponse.json({ error: "You must be signed in to move a candidate to a stage" },
            { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email as string
        },
        select: {
            id: true,
            role: true
        }
    });

    if (!user) {
        return NextResponse.json({ error: "You must be signed in to move a candidate to a stage" },
            { status: 401 });
    }

    if (user.role?.includes("CANDIDATE") || user.role?.includes("EXT")) {
        return NextResponse.json({ error: "You are not authorized to move a candidate to a stage" },
            { status: 401 });
    }

    const stage = await prisma.stage.update({
        where: {
            id: stageId
        },
        data: {
            current: false,
        },
        select: {
            stage: true
        }
    })


    const currentStage = stages[parseInt(stage.stage) - 1]; // this is the current stage
    const nextStage = stages[parseInt(stage.stage)]; // this is the next stage

    if (currentStage.payment && (!amount || isNaN(parseInt(amount)))) {
        return NextResponse.json({ error: "You must provide an amount to move a candidate to the next stage" }, { status: 400 });
    }

    if (currentStage.payment) {
        const payment = await prisma.payment.create({
            data: {
                id: generateId(),
                amount: Number(amount),
                stageId: stageId,
                userId: candidateId
            }
        });
    }

    console.log(nextStage);

    const newStage = await prisma.stage.create({
        data: {
            id: generateId(),
            candidateId: candidateId,
            current: true,
            stage: `${parseInt(stage.stage) + 1}`,
            status: nextStage.payment ? "pending" : "progress",
        }
    }
    );

    if (nextStage.payment) {
        const message = await prisma.message.create({
            data: {
                stageId: newStage.id,
                userId: user.id,
                message: `Please pay make a payment to start processing your application.`,
            }
        });
    }

    const message1 = await prisma.message.create({
        data: {
            stageId: newStage.id,
            userId: user.id,
            message: `Processing ${nextStage.name}`,
        }
    });

    console.log(stage);
    console.log(newStage);

    if (newStage) {
        return NextResponse.json({ message: "Candidate moved to next stage" });
    }



    return NextResponse.json({ error: "Candidate could not be moved to next stage" }, { status: 500 });
}