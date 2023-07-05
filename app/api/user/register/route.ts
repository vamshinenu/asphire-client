// route to register a user
import prisma from "@/prisma/prismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authoptions } from "../../auth/[...nextauth]/route";
import generateId from "@/util/idGenerator";
import { Role } from "@/util/getRoleOptions";


interface IBody {
    email: string;
    name: string;
    role: string;
    stages: any[];
}

export async function POST(req: NextRequest) {

    const session = await getServerSession(authoptions);

    console.log(session);

    if (!session)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session!.user!.email as string
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            memberOfCompanyId: true,
        }
    });

    console.log(currentUser);

    if (!currentUser?.memberOfCompanyId) {
        return NextResponse.json({ error: "Unauthorized, You Don't belong to a company." }, { status: 401 });
    }


    console.log(currentUser.role)

    if (!currentUser || !currentUser.role)
        return NextResponse.json({ error: "Unauthorized, please ask admin to check your profile" }, { status: 401 });

    console.log(currentUser);
    let role;
    const { email, name, role: _role, stages }: IBody = await req.json();
    console.log(_role);
    console.log(stages);

    let stageData = [];

    try {
        if (_role === 'ADMIN') {
            stageData.push({
                id: generateId(),
                stage: '0',
                companyId: currentUser.memberOfCompanyId,
            });
        } else if (_role === 'CANDIDATE') {
            stageData.push({
                id: generateId(),
                stage: '-1',
                companyId: currentUser.memberOfCompanyId,
            });
        } else {
            stages.map((stage, index) => {
                if (stage) {
                    stageData.push({
                        id: generateId(),
                        stage: `${index + 1}`,
                        companyId: currentUser.memberOfCompanyId,
                    });
                }
            });

        }

    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }

    console.log(stageData);

    if (currentUser.role?.includes('INT')) {
        role = 'INT_' + _role
    }
    else {
        role = 'EXT_' + _role
    }

    console.log(_role);

    if (!email || !name)
        return NextResponse.json({ error: "Missing fields" }, { status: 400, statusText: "Missing fields" });

    if (currentUser.role === "INT_CANDIDATE")
        return NextResponse.json({ error: "You are not authorized to add users to this company" }, { status: 401 });

    if (currentUser.role === "INT_USER" && role !== "INT_CANDIDATE")
        return NextResponse.json({ error: "You Cannot Add this permissions to the user" }, { status: 401 });

    const userId = generateId();

    const user = await prisma.user.create({

        data: {
            id: userId,
            email,
            role: role as Role,
            name,
            memberOfCompanyId: currentUser.memberOfCompanyId,
            cadidateStages: {
                createMany: {
                    data: [
                        {
                            id: userId,
                            stage: '1',
                            current: true,
                            status: 'progress',
                        }
                    ]
                }
            },
            accesses: {
                createMany: {
                    data: [
                        {
                            stage: '1',
                            companyId: currentUser.memberOfCompanyId,
                        }
                    ]
                }
            },
        }
    })

    console.log(user);

    if (!user.id) {
        return NextResponse.json({ error: "Error creating user" }, { status: 500 });
    }

    return NextResponse.json(
        {
            message: "User created successfully",
        },
        { status: 200, statusText: "User created successfully" }
    )
}