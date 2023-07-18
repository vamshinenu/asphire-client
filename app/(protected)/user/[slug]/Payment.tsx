'use client';

import React, { useState } from 'react';
import { Check, IndianRupee } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Payment() {
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();

    const closeModal = () => setModalOpen(false);
    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <div>
            <button
                className="z-10 flex flex-row px-4 py-2 text-center duration-500 rounded-lg outline outline-1 outline-zinc-300 hover:rounded-2xl hover:bg-emerald-400 hover:text-white"
                onClick={() => setModalOpen(true)}
            >
                <span className="mr-2">Payment</span>
                <IndianRupee />
            </button>

            {modalOpen && (
                <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full px-4 bg-black bg-opacity-50" onClick={closeModal}>
                    <div className="px-4 py-4 bg-white rounded-lg" onClick={stopPropagation}>
                        <h2 className="mb-4">To Make a payment contact Admin </h2>
                        <button
                            className="px-4 py-2 mr-2 text-white rounded bg-emerald-400"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                        <p className='text-xs text-zinc-400'>In platfrom payments will be available soon, contact admin, make a payment and upload a screenshot</p>
                    </div>
                </div>
            )}
        </div>
    );
}
