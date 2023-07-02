'use client';
import React, { useRef, useEffect } from 'react'

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

interface Message {
    id: string;
    User: {
        id: string;
        name: string;
        role: string;
        memberOfCompany: {
            id: string,
            name: string,
        }
    };
    message: string;
    createdAt: string;
}

export default function Messages(
    {
        messages,
        userId,
    }:
        {
            userId: string;
            messages: Message[];
        }
) {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }

    useEffect(() => {
        if (messagesEndRef.current?.parentNode instanceof HTMLElement) {
            const parent = messagesEndRef.current.parentNode;
            parent.scrollTop = parent.scrollHeight;
        }
    }, [messages]);


    return (
        <div className="overflow-auto h-96">
            {
                messages.map((message: Message, index: number) => {
                    return (
                        // {(message.User.role).split('_').at(-1)?.toLocaleLowerCase()} 
                        <div key={index} className={`flex flex-row items-start ${message.User.id === userId ? 'justify-end' : 'justify-start'} mb-4 `}>
                            <div className={`px-4 py-2 rounded-lg ${message.User.id === userId ? 'bg-emerald-400 text-white' : 'bg-gray-300 text-black'}`}>
                                <div className="text-sm text-start">{message.User.name} . <span className={`font-normal`}></span> {message.User.memberOfCompany.name} <br />
                                    <span className="text-xs text-zinc-600">{new Date(message.createdAt).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                        timeZone: userTimeZone,
                                    })}</span>
                                </div>
                                <div>{message.message}</div>
                            </div>
                        </div>
                    )
                })
            }
            <div ref={messagesEndRef} />
        </div>
    )
}
