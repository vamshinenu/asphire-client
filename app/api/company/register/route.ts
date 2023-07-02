import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";
import generateId from "@/util/idGenerator";

interface Body {
    name: string;
    ownerName: string;
    phone: string;
    email: string;
    stages: string[];
}

// route to register a company, and a user if they don't exist, and connect them together

export async function EduCompanyRegister(req: NextRequest) {
    const { name, ownerName, phone, email }: Body = await req.json();

    if (!name || !ownerName || !phone || !email) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400, statusText: "Missing fields" });
    }
    let owner;

    // create a company
    // create a user
    // connect them together


    // first check if user exists
    const _existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (_existingUser) {
        return NextResponse.json({ error: "User with the email already exists" }, { status: 400, statusText: "User with the email already exists" });
    }


    const ownerId = generateId()
    owner = {
        id: ownerId,
        email,
        name: ownerName,
        phone,
    }

    console.log(owner);

    try {
        const user = await prisma.user.create({
            data: {
                id: ownerId,
                email,
                name: ownerName,
                phone,
                role: "EXT_ADMIN",
                memberOfCompany: {
                    create: {
                        id: generateId(),
                        name: name,
                        ownerId: ownerId,
                        Access: {
                            create: {
                                stage: "0",
                                userId: ownerId,
                            }
                        }
                    }
                }
            }
        });
        console.log(user);
        return NextResponse.json(JSON.stringify(user), { status: 200, statusText: "Success" });
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500, statusText: "Internal Server Error" });
    }


    // try {
    //     const companyId = generateId();
    //     company = await prisma.company.create({
    //         data: {
    //             id: companyId,
    //             name: name,
    //             ownerId: owner.id,
    //             members: {
    //             }

    //         }
    //     });
    // }
    // catch (e) {
    //     return NextResponse.json({ error: "Internal Server Error" }, { status: 500, statusText: "Internal Server Error" });
    // }
    // finally {
    //     if (company) {
    //         return NextResponse.json({
    //             message: "Success",
    //         },
    //             {
    //                 status: 200,
    //                 statusText: company.id,
    //             }
    //         );
    //     }

    // }
}

export { EduCompanyRegister as POST }