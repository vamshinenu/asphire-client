import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/prismaClient";

async function getAccessibleUsers(req: NextRequest) {
    const session = await getServerSession(authoptions);
    if (!session) {
        return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
        select: {
            CompanyEdu: {
                select: {
                    id: true
                }

            },
            AccessEdu: {
                select: {
                    stage: true,
                }
            }
        },
        where: {
            email: session.user!.email as string
        }
    });


    //
    // model CandidateEdu {
    //     userId    String @id @unique
    //     companyId String
    //     stageId   String
    //
    //     user       User       @relation(fields: [userId], references: [id], onDelete: Cascade)
    //     companyEdu CompanyEdu @relation(fields: [companyId], references: [id], onDelete: Cascade)
    //     stageEdu   StageEdu   @relation(fields: [stageId], references: [id], onDelete: Cascade)
    //     createdAt  DateTime   @default(now())
    // }

    //
    //
    // model StageEdu {
    //     id          String      @id @default(cuid())
    //     candidateId String
    //     ActorId     String
    //     stage       String      @default("1")
    //     status      StageStatus @default(pending)
    //
    //     actor        User           @relation("Actor", fields: [ActorId], references: [id], onDelete: Cascade)
    //     candidate    User           @relation("Candidate", fields: [candidateId], references: [id], onDelete: Cascade)
    //     createdAt    DateTime       @default(now())
    //     CandidateEdu CandidateEdu[]
    //     User         User?          @relation(fields: [userId], references: [id])
    //     userId       String?
    // }

    // name: "Eve Wilson",
    //     stage: Math.floor(Math.random() * 12) + 1,
    //     actor: "Ethan Adams",
    //     status: "In Progress",
    //     message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    //     dateAdded: "2023-06-21",
    //     company: "Company E",




    const users = await prisma.candidateEdu.findMany({
        where: {
            companyId: currentUser?.CompanyEdu?.id,
            AND: {
                stageEdu: {
                    stage: {
                        in: currentUser?.AccessEdu?.map((access) => access.stage)
                    }
                },
            },
        },
        select: {
            userId: true,
            user: {
                select: {
                    name: true,
                }
            },
            companyId: true,
            stageId: true,
            stageEdu: {
                select: {
                    stage: true,
                    status: true,
                    actor: {
                        select: {
                            id: true,
                            name: true,
                            CompanyEdu: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    },
                    message: true,
                }
            }
        }
    });

    return NextResponse.json(
        JSON.stringify(users)
    )

}

export { getAccessibleUsers as GET }