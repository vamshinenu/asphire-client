"use client";
import { X } from 'lucide-react';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react'


interface File {
    objectKey: string;
    name: string;
    size: number;
    type: string;
}


export default async function UploadedFileCard({ file, showDelete }: { file: File, showDelete: boolean }) {


    const [deleted, setDeleted] = useState(false);

    const router = useRouter();

    const downloadFile = async (objectKey: string) => {
        const res = await fetch(`/api/s3?objectKey=${objectKey}`,
            {
                method: 'GET',
            }
        );

        if (res.status === 200) {
            console.log(res);
        }

        const data = await res.json();

        console.log(data);
        open(data.url);
    }

    async function deleteFile(e: any) {

        e.stopPropagation();

        const res = await fetch(`/api/s3?objectKey=${file.objectKey}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            setDeleted(true);
            console.log(deleted);

            router.refresh();
        }

        else {
            console.log(res);
        }
    }

    return (
        <>
            <button className="px-4 py-2 duration-500 text-zinc-600 rounded-xl hover:text-emerald-400 bg-zinc-200 hover:shadow-xl"
                about='Download'
                onClick={
                    async () => await downloadFile(file.objectKey)
                }
            >
                <div className='flex flex-col items-start truncate'>
                    <h1>  {file.name + "." + file.type} </h1>
                    <h1 className='text-xs text-zinc-400'>  {((file.size) / 1024 / 1024).toFixed(2)} MB
                        {
                            showDelete &&
                            (<span className='ml-20 text-red-500 hover:font-bold'
                                onClick={deleteFile} >
                                Delete
                            </span>)}
                    </h1>
                </div>
                {
                    deleted && (
                        <div className='fixed flex flex-row items-center justify-center gap-2 px-4 py-2 mx-10 text-green-500 duration-500 shadow-lg bg-zinc-50 bottom-10 animate-bounce rounded-3xl'>
                            <p className='text-xs text-center'>File deleted.</p>
                            <button className='px-4 py-2 font-bold text-center text-white bg-black rounded-full' onClick={() => setDeleted(false)}>
                                <X
                                    height={20}
                                    width={20}
                                />
                            </button>
                        </div>
                    )
                }
            </button>
        </>
    )
}