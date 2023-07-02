'use client';

import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Done() {
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();

    const closeModal = () => setModalOpen(false);
    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <div>
            <button
                className="z-10 px-4 py-2 text-center duration-500 rounded-lg outline outline-1 outline-zinc-300 hover:rounded-2xl hover:bg-emerald-400 hover:text-white"
                onClick={() => setModalOpen(true)}
            >
                <Check />
            </button>

            {modalOpen && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50" onClick={closeModal}>
                    <div className="w-1/2 p-4 bg-white rounded-lg" onClick={stopPropagation}>
                        <h2 className="mb-4">Are you sure, want to move it to next stage?</h2>
                        <button
                            className="px-4 py-2 mr-2 text-white bg-red-500 rounded"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 text-white bg-green-500 rounded"
                            onClick={() => {
                                console.log('done');
                                closeModal();
                            }}
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
