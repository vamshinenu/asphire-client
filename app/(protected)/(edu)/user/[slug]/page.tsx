import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import FileUpload from "./AdminAndUserFileUpload";
import { stages } from "@/app/constants/stages";
import { redirect } from "next/navigation";
import prisma from "@/prisma/prismaClient";
import SubStageFileUpload from "./SubStageFileUpload";
import UploadedFileCard from "./UploadedFileCard";
import { headers } from "next/headers";
import { Suspense } from "react";
import Done from "./Done";
import Message from "./Message";
import Messages from "./Messages";

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

interface File {
    objectKey: string;
    name: string;
    size: number;
    type: string;
}



export default async function UserView(

    { params }: { params: { slug: string } }
) {

    const session = await getServerSession(authoptions);

    if (!session) {
        redirect('/auth/login');
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user!.email as string,
        },
        select: {
            id: true,
            name: true,
            role: true,
            memberOfCompanyId: true,
        }
    });

    const candidate = await prisma.user.findUnique(
        {
            where: {
                id: params.slug
            },
            select: {
                role: true,
                name: true,
                memberOfCompany: {
                    select: {
                        id: true,
                        name: true
                    },
                },
                cadidateStages: {
                    select: {
                        id: true,
                        current: true,
                        stage: true,
                        status: true,
                        files: {
                            select: {
                                id: true,
                                name: true,
                                subStage: true
                            }
                        },
                        // messages: {
                        //     select: {
                        //         id: true,
                        //         User: {
                        //             select: {
                        //                 id: true,
                        //                 name: true
                        //             }
                        //         },
                        //         message: true,
                        //         createdAt: true
                        //     }
                        // }
                    }
                }
            }
        }
    );

    if (!currentUser || !candidate) {
        redirect('/auth/login');
    }
    if (currentUser.role === 'INT_CANDIDATE' || currentUser.role === 'EXT_CANDIDATE')
        if (currentUser.id !== params.slug)
            redirect('/auth/error?error=forbidden&code=CANNOTACCESSUSER');

    if (currentUser.role === 'EXT_ADMIN' || currentUser.role === 'EXT_USER')
        if (candidate?.memberOfCompany?.id !== currentUser?.memberOfCompanyId)
            redirect('/auth/error?error=forbidden&code=CANNOTACCESSUSER',);


    const isCandidate = currentUser?.role === 'INT_CANDIDATE' || currentUser?.role === 'EXT_CANDIDATE';

    console.log(candidate);

    if (!candidate) {
        redirect('/auth/error?error=usernotfound');
    }

    const name = candidate?.name as string;
    const stageId = candidate?.cadidateStages[0].id as string;
    const stage = candidate?.cadidateStages[0].stage as string;
    const status = candidate?.cadidateStages[0].status as string;
    const stageHeader = stages[(stage as unknown as number) - 1].name as string;
    const description = stages[(stage as unknown as number) - 1].description as string;
    const company = candidate?.memberOfCompany?.name as string;
    // const messages = candidate?.cadidateStages[0].messages as any[];

    const header = headers();

    const url = (header.get('x-forwarded-proto') as string) + "://" + (header.get('host') as string)

    let messages = fetch(`${url}/api/edu/user/message?stageId=${stageId}`,
        {
            method: 'GET',
            next: {
                tags: ['messages']
            }
        }
    )
        .then(res => res.json());

    let candidateFiles = fetch(`${url}/api/s3/list?object=${params.slug}\/${stage}\/`,
        {
            method: 'GET',
            next: {
                tags: ['candidate']
            }
        }
    )
        .then(res => res.json());

    let userAdminFiles = fetch(`${url}/api/s3/list?object=${params.slug}\/${stage}\/processed\/`,
        {
            method: 'GET',
            next: {
                tags: ['candidate']
            }
        },
    )
        .then(res => res.json());

    const subStages = stages[(stage as unknown as number) - 1].subStage;

    // ? parallel data fetching makes it faster
    [candidateFiles, userAdminFiles, messages] = await Promise.all([candidateFiles, userAdminFiles, messages]);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center max-w-5xl px-4">
                <h1 className="mb-4 text-2xl font-bold text-center ">{stageHeader} <br /> <span className="text-lg font-normal text-zinc-300">
                    {name} <span className="font-semibold">{company}</span>
                </span></h1>

                <h2 className="w-full px-4 py-4 mb-4 text-lg text-center rounded-xl bg-zinc-100">{description}</h2>

                {
                    // @ts-ignore
                    messages.length === 0 &&
                    (
                        <div className="flex flex-row items-center w-full gap-4 px-4 py-4 mb-4 rounded-lg shadow-lg sm:mx-0 bg-zinc-50 outline outline-1 outline-zinc-200">
                            {!isCandidate && <Done />}
                            <p className={`font-normal text-lg text-center  ${status === 'pending' ? 'bg-yellow-400' : 'bg-emerald-400'} px-4 py-2 rounded-3xl`}>
                                {status}
                            </p>
                            <Message stageId={stageId} />
                        </div>
                    )

                }

                {
                    // @ts-ignore
                    messages.length > 0 && (
                        <div className="flex flex-col w-full p-4 mb-4 rounded-lg bg-zinc-50 ">
                            {/* @ts-ignore */}
                            <Messages messages={messages} userId={currentUser.id} />
                            <div className="flex flex-row items-center gap-4 px-4 py-4 mb-4 rounded-lg shadow-lg bg-zinc-50 outline outline-1 outline-zinc-200">
                                {!isCandidate && <Done />}
                                <p className={`font-normal text-lg text-center  ${status === 'pending' ? 'bg-yellow-400' : 'bg-emerald-400'} px-4 py-2 rounded-3xl`}>
                                    {status}
                                </p>
                                <Message stageId={stageId} />
                            </div>
                            <p className="text-xs text-center text-zinc-300">Refresh to see the new messages</p>
                        </div>
                    )
                }
                {/* Candidates can you be able to add the documents that require from them */}
                {
                    (isCandidate && subStages.length > 0) && (
                        <>
                            <p className="mt-4 text-xs text-zinc-400">We will automatically Rename your files accordingly</p>
                            <div className="flex flex-col w-full gap-2 px-8 mt-4">
                                {
                                    subStages.length > 0 && subStages.map(
                                        (subStage, index) => {
                                            return (<div key={index}>
                                                <SubStageFileUpload fileName={subStage.name} candidateId={params.slug} stage={stage}
                                                    name={candidate.name as string}
                                                />
                                            </div>)
                                        }
                                    )
                                }
                            </div>
                        </>
                    )
                }
                {
                    !isCandidate && (
                        <>
                            <FileUpload candidateId={params.slug} stage={candidate.cadidateStages[0].stage} stageName={stageHeader}
                            />
                            <h1 className="px-4 py-2 text-xs text-center text-zinc-500">
                                Upload any documents that you create in the process of this stage
                            </h1>
                        </>
                    )
                }
                {
                    // @ts-ignore
                    candidateFiles.length > 0 &&
                    (
                        <div className="flex flex-col items-center grid-flow-col grid-cols-2 mb-4 rounded-xl ">
                            <h1 className="mb-4">Uploaded Files <span className="text-xs text-zinc-400">(Click on the file to download)</span></h1>
                            {
                                <div className="grid grid-cols-1 gap-4 px-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {/* @ts-ignore */}
                                    {candidateFiles?.map((file: File, index: number) => {
                                        return <UploadedFileCard key={index} file={file} showDelete={currentUser.role === 'EXT_CANDIDATE' || currentUser.role === 'INT_CANDIDATE'} />;
                                    })}
                                </div>
                            }
                        </div>
                    )
                }
                {
                    // @ts-ignore
                    candidateFiles.length > 0 &&
                    (<div className="flex flex-col items-center grid-flow-col grid-cols-2 mb-4 rounded-xl ">
                        <h1 className="mb-4">Stage Outcome Files <span className="text-xs text-zinc-400">(Click on the file to download)</span></h1>
                        {
                            <div className="grid grid-cols-1 gap-4 px-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {/* @ts-ignore */}
                                {candidateFiles?.map((file: File, index: number) => {
                                    return <UploadedFileCard key={index} file={file} showDelete={(currentUser.role?.includes('USER') || currentUser.role?.includes("ADMIN")) as boolean} />;
                                })}
                            </div>

                        }
                    </div>)}
                {/* only if current User is a User or Admin let them see the FileUpload holder so that they only upload the output file
                or the files that they create in the process of the stage
                */}

            </div>
        </div>
    )
}