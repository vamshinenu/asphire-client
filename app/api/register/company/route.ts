import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

import { customAlphabet } from "nanoid";

interface Body {
    name: string;
    ownerName: string;
    phone: string;
    email: string;
    stages: string[];
}


export async function POST(req: NextRequest) {

    const { name, ownerName, phone, email }: Body = await req.json();

    if (!name || !ownerName || !phone || !email)
        return NextResponse.json({ error: "Missing fields" }, { status: 400, statusText: "Missing fields" });

    const companyId = customAlphabet(process.env.CUSTOM_ALPHABET as string, 16)();
    const ownerId = customAlphabet(process.env.CUSTOM_ALPHABET as string, 16)();

    console.log(companyId, ownerId);

    const ownerData = {
        id: ownerId,
        email: email,
        name: ownerName,
        phone: phone,
    }
    try {
        const company = await prisma.companyEdu.create({
            data: {
                id: companyId,
                name: name,
                owner: {
                    create: ownerData
                },
                AccessEdu: {
                    create: {
                        stage: "0",
                        userId: ownerId,
                    },
                }
            }
        }
        )

        if (company) {
            return NextResponse.json({
                message: "Success",
            },
                {
                    status: 200,
                    statusText: companyId,
                }
            );
        }
    }
    catch (error: any) {

        console.log(error);

        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Phone or email already exists" }, { status: 400, statusText: "Phone or email already exists" });
        }

        return NextResponse.json({ error }, { status: 400, statusText: "Internal Server Error" });
    }
}


// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/prisma/prismaClient";

// export default async function POST(req: NextRequest) {

//     const { name, ownerId, phone } = await req.json();

//     let user = await prisma.user.findUnique({
//         where: {
//             id: ownerId,
//         },
//     });

//     if (!user) {
//         return NextResponse.json({}, {
//             status: 400,
//             statusText: "USER_DOES_NOT_EXIST",
//         })
//     }

//     let code;
//     let response = await prisma.companyEdu.create(
//         {
//             data: {
//                 ownerId: ownerId,
//                 name: name,
//                 phone: phone,
//             }
//         }
//     ).catch((error) => {
//         if (error.code === 'P2002') {
//             code = "ALREADY_EXISTS";
//         }
//         code = "UNKNOWN_ERROR";
//     });

//     let statusText;

//     if (code) {
//         code === "ALREADY_EXISTS" ? statusText = "PHONE_OR_OWNER_ID_ALREADY_EXISTS" : statusText = "UNKNOWN_ERROR";

//         return NextResponse.json({}, {
//             status: 400,
//             statusText: statusText,
//         })
//     }

//     if (response) {
//         return NextResponse.json({
//             message: "Success",
//         },);
//     }
// }

// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/prisma/prismaClient";

// export default async function POST(req: NextRequest) {
//     const { name, email, phone } = await req.json();

//     let code;
//     let transactionResult;

//     try {
//         transactionResult = await prisma.$transaction([
//             prisma.user.create({
//                 data: {
//                     email,
//                     name,
//                 },
//             }),
//             prisma.companyEdu.create({
//                 data: {
//                     name,
//                     phone,
//                     ownerId: { connect: { email } }, // We use the email to connect the User to the CompanyEdu
//                 },
//             }),
//             prisma.accessEdu.create({
//                 data: {
//                     stage: "0",
//                     userId: { connect: { email } }, // We use the email to connect the User to the AccessEdu
//                     companyId: "company-id", // replace this with the actual company ID
//                 },
//             }),
//         ]);
//     } catch (error: any) {
//         if (error.code === 'P2002') {
//             code = "ALREADY_EXISTS";
//         } else {
//             code = "UNKNOWN_ERROR";
//         }
//     }

//     let statusText;

//     if (code) {
//         code === "ALREADY_EXISTS" ? statusText = "EMAIL_OR_PHONE_ALREADY_EXISTS" : statusText = "UNKNOWN_ERROR";

//         return NextResponse.json({}, {
//             status: 400,
//             statusText: statusText,
//         });
//     }

//     if (transactionResult) {
//         return NextResponse.json({
//             message: "Success",
//             data: transactionResult,
//         });
//     }
// }
