'use client';

import prisma from "@/prisma/prismaClient";

export default async function ChangeName() {
    const handleSubmit = async () => {
        const response = await fetch('/api/auth/changename', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                name: 'test'
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }

    }


    return (
        <button onClick={handleSubmit

        }>
            Change Name
        </button>
    )
}