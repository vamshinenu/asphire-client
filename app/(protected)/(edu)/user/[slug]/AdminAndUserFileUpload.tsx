'use client';
import React from 'react';
import { ArrowUpToLine, X } from 'lucide-react';
import generateId from '@/util/idGenerator';

export default function FileUpload(
    { candidateId,
        stage,
        stageName
    }: {
        candidateId: string;
        stage: string;
        stageName: string;
    }
) {
    const [files, setFiles] = React.useState<File[]>([]);
    const [uploading, setUploading] = React.useState(false);
    const [cannotUpload, setCannotUpload] = React.useState(false);
    const [uploadSuccess, setUploadSuccess] = React.useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileList = e.target.files;
            const fileArray: File[] = Array.from(fileList);

            // Filter files based on allowed file types
            const filteredFiles = fileArray.filter((file) => {
                const fileType = file.type.split('/')[0]; // Extract the file type

                const isValidFileType = fileType === 'image' || fileType === 'application'; // Add any additional allowed file types

                // Set cannotUpload to true if the file type is not valid
                if (!isValidFileType) {
                    setCannotUpload(true);
                }

                return isValidFileType;
            });

            setFiles((prev) => prev.concat(filteredFiles));
        }
    };

    const handleFileDelete = (fileName: string) => {
        setFiles((prev) => prev.filter((file) => file.name !== fileName));
    };

    const handleUpload = async () => {
        setUploading(true);

        const formData = new FormData();
        formData.append('candidateId', candidateId)

        files.forEach((file) => {
            const fileExtension = file.name.split('.').pop();
            formData.append(`${candidateId}/${stage}/processed/${stageName}_${generateId(4)}.${fileExtension}`, file);
        });

        const res = await fetch('/api/s3', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            setUploading(false);
            setFiles([]);
            setUploadSuccess(true);
        }
        else {
            console.log('Error uploading file');
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-5xl">
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 cursor-pointer rounded-2xl bg-zinc-100 hover:bg-zinc-200"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ArrowUpToLine className='text-zinc-500' />
                    <p className="mb-2 text-sm text-zinc-500">
                        <span className="font-semibold">Click to upload</span>
                        {/* or drag and drop */}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF, PDF, Word, Excel
                    </p>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    multiple={true}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>

            {
                files.length > 0 && (
                    <div className="flex flex-col items-center justify-center w-full max-w-5xl gap-4">
                        <div className="flex flex-col w-full max-w-5xl gap-2 px-4 py-2 mt-4 divide-y bg-zinc-200 rounded-xl divide-zinc-400">
                            {files.map((file) => (
                                <div key={file.name} className="flex items-center justify-between w-full max-w-5xl mb-2 text-zinc-900 ">
                                    <span className="mr-2 truncate">{file.name}</span>
                                    <span className="text-xs text-gray-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                    <button
                                        className="ml-2 text-red-500"
                                        onClick={() => handleFileDelete(file.name)}
                                    >
                                        <X />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="submit"
                            className={`w-full p-2 text-center duration-500 max-w-xs drop-shadow-xl rounded-lg bg-zinc-400  ${uploading ? '' : 'hover:bg-black hover:text-emerald-400'
                                } `}
                            disabled={uploading}
                            onClick={handleUpload}
                        >
                            {uploading ? (
                                <>
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline w-4 h-4 mr-3 text-emerald-400 animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    uploading files...
                                </>
                            ) : (
                                'upload'
                            )}
                        </button>
                    </div>
                )
            }
            {
                cannotUpload && (
                    <div className='fixed flex flex-row items-center justify-center gap-2 px-4 py-2 mx-10 text-red-500 duration-500 shadow-lg bg-zinc-50 bottom-10 animate-bounce rounded-3xl'>
                        <p className='text-xs text-center'>Unsupported File Type, please upload only documents</p>
                        <button className='px-4 py-2 font-bold text-center text-white bg-black rounded-full' onClick={() => setCannotUpload(false)}>
                            <X
                                height={20}
                                width={20}
                            />
                        </button>
                    </div>
                )
            }
            {
                uploadSuccess && (
                    <div className='fixed flex flex-row items-center justify-center gap-2 px-4 py-2 mx-10 text-green-500 duration-500 shadow-lg bg-zinc-50 bottom-10 animate-bounce rounded-3xl'>
                        <p className='text-xs text-center'>Upload Successful</p>
                        <button className='px-4 py-2 font-bold text-center text-white bg-black rounded-full' onClick={() => setUploadSuccess(false)}>
                            <X
                                height={20}
                                width={20}
                            />
                        </button>
                    </div>
                )
            }
        </div>
    );
}
