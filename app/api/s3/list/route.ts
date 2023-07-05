import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

interface File {
    objectKey: string;
    name: string;
    size: number;
    type: string;
}


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
});


// ? This route is used to list all the files in a folder/subfolder
export async function GET(req: NextRequest) {
    const object = req.nextUrl.searchParams.get("object") as string;

    try {
        const command = new ListObjectsCommand({
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Prefix: object,
            Delimiter: '/'
        });

        const response = await s3Client.send(command);

        if (response.Contents === undefined) {
            console.log("No objects in the folder/subfolder");
            return NextResponse.json([]);
        }

        const files: File[] = [];

        const nameCountMap = new Map();

        response.Contents.map((object) => {
            const baseName = (object.Key as string).split("/").at(-1)?.split("_").at(0) as string;

            if (!nameCountMap.has(baseName)) {
                nameCountMap.set(baseName, 1);
                files.push({
                    objectKey: object.Key as string,
                    name: baseName,
                    size: object.Size as number,
                    type: object.Key?.split(".").at(-1) as string
                });
            } else {
                const count = nameCountMap.get(baseName) as number;
                const numberedName = `${baseName} ${count + 1}`;
                nameCountMap.set(baseName, count + 1);
                files.push({
                    objectKey: object.Key as string,
                    name: numberedName,
                    size: object.Size as number,
                    type: object.Key?.split(".").at(-1) as string
                });
            }
        });

        console.log("Files:", files);

        return NextResponse.json(files);

    } catch (error) {
        console.error("Error listing objects:", error);
    }

}