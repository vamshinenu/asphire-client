'use client';

import React, { useState } from 'react';
import { ArrowUpToLine, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import generateId from '@/util/idGenerator';

export default function Done(
    { candidateId, stageId, payment, name, stage }:
        { candidateId: string, stageId: string, payment: boolean, name: string, stage: string }
) {



    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [amount, setAmount] = useState('');
    const [invalidAmount, setInvalidAmount] = useState(false);
    const router = useRouter();

    const [subStage, setSubStage] = React.useState<{ fileName: string; files: File[] }>({
        fileName: 'payment',
        files: [],
    });

    const [needScreenShot, setNeedScreenShot] = React.useState(false);

    const [message, setMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInvalidAmount(false);
        setNeedScreenShot(false);
        setLoading(false);
        setError(false);
        if (e.target.files) {
            const fileList = e.target.files;
            const fileArray: File[] = Array.from(fileList);
            // Filter files based on allowed file types
            const filteredFiles = fileArray.filter((file) => {
                const fileType = file.type.split('/')[0]; // Extract the file type

                const isValidFileType =
                    fileType === 'image' || fileType === 'application'; // Add any additional allowed file types
                // Set cannotUpload to true if the file type is not valid
                if (!isValidFileType) {
                    setError(true);
                }

                return isValidFileType;
            });

            setSubStage((prev) => ({
                ...prev,
                files: [...prev.files, ...filteredFiles],
            }));
        }
    };

    const handleFileDelete = (fileIndex: number) => {
        setError(false);

        setSubStage((prev) => ({
            ...prev,
            files: prev.files.filter((_, index) => index !== fileIndex),
        }));
    };

    const handleUpload = async () => {
        setError(false);
        const formData = new FormData();

        formData.append('candidateId', candidateId)

        subStage.files.forEach((file, index) => {
            const fileExtension = file.name.split('.').pop();
            formData.append(`${candidateId}/${stage}/payment/${'payment'}_${generateId(4)}_${name.split(' ').at(0)}.${fileExtension}`, file);
        });

        const res = await fetch('/api/s3', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            setSubStage((prev) => ({
                fileName: 'payment',
                files: [],
            }));
            router.refresh();
        }
        else {
            console.log('Error uploading file');
        }
        // Perform the upload logic here
    };


    const closeModal = () => setModalOpen(false);
    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    async function handleDone() {
        setInvalidAmount(false);
        setNeedScreenShot(false);

        if (payment && isNaN(parseInt(amount))) {
            console.log('Invalid amount');
            setInvalidAmount(true);
            return;
        }

        if (payment) {
            console.log('Payment stage');
            if (subStage.files.length === 0) {
                console.log('No files uploaded');
                setNeedScreenShot(true);
                return;
            }
        }

        console.log('Moving to next stage');
        setLoading(true);
        setError(false);

        if (payment) {
            setMessage('Uploading Files...');
            await handleUpload();
        }

        setMessage('Moving to next stage...');
        const res = await fetch(`/api/user/movestage?candidateId=${candidateId}&stageId=${stageId}&amount=${amount}`, {
            method: 'POST',
        })

        if (res.ok) {
            console.log(res);
            setLoading(false);
            setMessage('');
            closeModal();
            router.refresh();
            return;
        }

        console.log(res);
        setLoading(false);
        setError(true);
    }

    return (
        <div>
            <button
                className="z-10 flex flex-row px-4 py-2 text-center duration-500 rounded-lg outline outline-1 outline-zinc-300 hover:rounded-2xl hover:bg-emerald-400 hover:text-white"
                onClick={() => setModalOpen(true)}
            >
                <span className="mr-2">Done</span>
                <Check />
            </button>
            {modalOpen && (
                <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full px-4 bg-black bg-opacity-50" onClick={closeModal}>
                    <div className="px-4 py-4 bg-white rounded-lg" onClick={stopPropagation}>
                        {
                            !loading && (
                                <>
                                    <h2 className="mb-4">Are you sure, want to move it to next stage?</h2>
                                    {
                                        payment && (
                                            <div className='mt-4 mb-4 text-sm'>
                                                <p>Please upload a screenshot of the payment and amount</p>
                                                {/* Payment upload */}
                                                <div className="flex flex-col items-center amax-w-5xl" id={'payment'}>
                                                    <div className="flex flex-row items-center w-full gap-2 mb-4">
                                                        <label
                                                            htmlFor={`dropzone-file-${'payment'}`}
                                                            className={`flex flex-col items-center justify-center cursor-pointer  bg-zinc-300 rounded-xl hover:bg-emerald-400 hover:text-white`}
                                                        >
                                                            <div className={`flex flex-row items-center justify-between p-2`}>
                                                                <ArrowUpToLine
                                                                    className={`w-6 h-6`} />
                                                            </div>
                                                            <input
                                                                id={`dropzone-file-${'payment'}`}
                                                                type="file"
                                                                multiple={true}
                                                                className="hidden"
                                                                onChange={handleFileChange}
                                                            />
                                                        </label>
                                                        <input
                                                            id="amount"
                                                            name="amount"
                                                            type="text"
                                                            placeholder="amount"
                                                            className={`text-lg px-4 py-2 rounded-xl border-zinc-500 bg-zinc-200 mt-2 placeholder-zinc-300 disabled:text-zinc-700`}
                                                            onChange={
                                                                (e) => {
                                                                    setAmount(e.target.value);
                                                                    setInvalidAmount(false);
                                                                    setNeedScreenShot(false);
                                                                }
                                                            }
                                                            value={amount}
                                                        />
                                                    </div>
                                                    {subStage.files.length > 0 && (
                                                        <div className="flex flex-col w-full max-w-5xl gap-4">
                                                            <div className="flex flex-col w-full max-w-5xl gap-2 px-4 py-2 divide-y bg-zinc-100 rounded-xl divide-zinc-300">
                                                                {subStage.files.map((file, index) => (
                                                                    <div
                                                                        key={`${'payment'}-${index}`}
                                                                        className="flex items-center justify-between w-full max-w-5xl mb-2 text-zinc-900"
                                                                    >
                                                                        {/* Display file information */}
                                                                        <span className="mr-2 truncate">{file.name}</span>
                                                                        <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                                                        <button className="ml-2 text-red-500" onClick={() => handleFileDelete(index)}>
                                                                            <X />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* payment upload end */}
                                            </div>
                                        )
                                    }
                                    <button
                                        className="px-4 py-2 mr-2 text-white bg-red-500 rounded"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 text-white rounded bg-emerald-400"
                                        onClick={handleDone}
                                    >
                                        Proceed
                                    </button></>
                            )
                        }

                        {
                            loading && (
                                <div className='flex flex-row items-center gap-4'>
                                    <h1>
                                        {
                                            message
                                        }
                                    </h1>
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline w-10 h-10 text-emerald-400 animate-spin"
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
                                </div>
                            )
                        }
                        {
                            error && (
                                <div className="flex flex-col items-center justify-center">
                                    <h2 className="mb-4 text-red-500">Something went wrong!</h2>
                                </div>
                            )
                        }

                        {
                            needScreenShot && (
                                <div className="flex flex-col items-center justify-center">
                                    <h2 className="mb-4 text-red-500">Please provide a proof of payment file</h2>
                                </div>
                            )
                        }
                        {
                            invalidAmount && (
                                <div className="flex flex-col items-center justify-center">
                                    <h2 className="mb-4 text-red-500">Please provide a valid amount to continue</h2>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    );
}