import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/route";
import prisma from "@/prisma/prismaClient";
import { revalidatePath, revalidateTag } from "next/cache";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
});

const Bucket = process.env.AWS_BUCKET_NAME as string;

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const candidateId = formData.get("candidateId");

    const session = await getServerSession(authoptions);

    if (!session) {
        return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const currentUser = await prisma.user.findUnique({
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


    const candidate = await prisma.user.findUnique({
        where: {
            id: candidateId as string,
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
    })

    if (!currentUser || !candidate) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (
        // if the user is a candidate and is not the candidate that is being updated then return 401
        (currentUser?.role?.includes('CANDIDATE') && currentUser?.id !== candidateId) ||
        // if the user is an external user and is not part of the same company as the candidate then return 401
        (currentUser?.role?.includes('EXT') && currentUser?.memberOfCompany?.id !== candidate.memberOfCompany?.id)
    ) {
        return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    let fileCount = 0;
    for await (let [key, value] of formData) {
        if (key === 'candidateId') continue;
        try {
            value = value as File;
            const buffer = Buffer.from(await value.arrayBuffer());

            const command = new PutObjectCommand({
                Bucket,
                Key: key,
                Body: buffer
            });

            const res = await s3Client.send(command);
            fileCount++;
            console.log('res', res);
            console.log('File uploaded successfully');
        } catch (err) {
            console.log('Error', err);
            return NextResponse.json({ message: 'Error uploading file' }, { status: 500 });
        }
    }
    // revalidateTag('candidate')
    revalidatePath(`/user/[slug]`);

    return NextResponse.json({ message: 'File uploaded successfully' });
}

export async function DELETE(req: NextRequest) {

    const objectKey = req.nextUrl.searchParams.get("objectKey") as string

    console.log('objectKey', objectKey);

    try {
        const s3Client = new S3Client({ region: process.env.AWS_REGION });
        const command = new DeleteObjectCommand({ Bucket, Key: objectKey });
        const response = await s3Client.send(command);

        console.log("Success", response);

    }
    catch (error) {
        console.error("Error deleting file:", error);
    }

    revalidateTag('candidate')
    return NextResponse.json({ message: 'File deleted successfully' });
}

export async function GET(req: NextRequest) {

    console.log(req);

    const session = await getServerSession(authoptions);
    console.log('session', session);

    const objectKey = req.nextUrl.searchParams.get("objectKey") as string

    async function generatePresignedUrl(bucketName: any, objectKey: any) {

        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: objectKey
        });

        try {
            const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 120 });
            return signedUrl;
        } catch (error) {
            console.error('Error generating pre-signed URL:', error);
            return null;
        }
    }

    const url = await generatePresignedUrl(Bucket, objectKey);

    if (!url) {
        return NextResponse.json({ message: 'Error generating pre-signed URL' }, { status: 500 });
    }

    console.log('url', url);

    return NextResponse.json({ url: url });

}