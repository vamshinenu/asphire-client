"use client";
import React, { useState } from "react";
import { stateCodeToState } from "@/app/constants/stateCodes";




export default function Contact() {

    const [usPhoneNumber, setUsPhoneNumber] = useState('');
    const [validUSNumber, setValidUSNumber] = useState(true);

    const [errorJob, setErrorJob] = useState(false);
    const [errorEdu, setErrorEdu] = useState(false);

    const [successJob, setSuccessJob] = useState(false);
    const [successEdu, setSuccessEdu] = useState(false);

    const handlePhoneNumberChange = (event: any) => {
        let input = event.target.value;
        setErrorJob(false);
        setSuccessJob(false);
        // Only keep the numbers from the input.
        input = input.replace(/[^\d]/g, '');

        if (input.length < 4) {
            setUsPhoneNumber(input);
        } else if (input.length < 7) {
            setUsPhoneNumber(`${input.slice(0, 3)}-${input.slice(3)}`);
        } else {
            // Limit the input length to 10 digits (plus the hyphen).
            setUsPhoneNumber(`${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`);
        }

        // Check if the input starts with a valid state code.
        if (stateCodeToState[input.slice(0, 3)]) {
            setValidUSNumber(true);
        } else {
            setValidUSNumber(false);
        }
    };

    async function submitContactUsJob(event: any) {
        event.preventDefault();
        setErrorJob(false);
        setSuccessJob(false);

        if (!stateCodeToState[usPhoneNumber.substring(0, 3)]) {
            setValidUSNumber(false);
        } else if (usPhoneNumber.length !== 12) {
            setValidUSNumber(false);
        } else {

            const response
                = await fetch('/api/contact/job',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            phone: usPhoneNumber,
                            email: event.target.email.value
                        })
                    }

                );

            const data = await response.json();

            if (data.code === 'EMAIL_PHONE_EXISTS') {
                setErrorJob(true);
            }

            else if (data.code === 'UNKNOWN_ERROR') {
                alert('unable to process request');
            }

            else {
                event.target.reset();
                setUsPhoneNumber('');
                setSuccessJob(true);
            }
        }
    }

    async function submitContactUsEdu(event: any) {
        event.preventDefault();

        setErrorEdu(false);
        setSuccessEdu(false);

        console.log(errorEdu, successEdu);
        const response = await fetch('/api/contact/education', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: event.target.name.value,
                phone: event.target.phone.value,
            })
        });

        console.log(JSON.stringify(response));

        const data = await response.json();

        if (data.code === 'PHONE_EXISTS') {
            setErrorEdu(true);
        }
        else if (data.code === 'UNKNOWN_ERROR') {
            alert('unable to process request');
        }
        else {
            event.target.reset();
            setSuccessEdu(true);
        }
    }


    function formatPhoneNumber(phoneNumber: string) {
        if (phoneNumber.length <= 3) {
            return phoneNumber;
        } else if (phoneNumber.length === 4) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        } else {
            return phoneNumber.includes("-") ? phoneNumber : `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        }
    }

    return (
        <>
            {/*Global Studies Section*/}
            <form action="#" method="post"
                className={`space-y-6 bg-black p-10 hover:outline-pink-400 rounded-2xl outline outline-gray-900 outline-1 mt-4 shadow-2xl pt-8`}
                onSubmit={submitContactUsEdu}>
                <p className="mt-2 text-xl tracking-tight text-center text-transparent bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text sm:text-2xl">
                    US Studies
                </p>
                <div>
                    <input
                        id="name"
                        type="text"
                        required
                        className="w-full px-3 py-2 text-xl rounded-xl border-zinc-500 bg-zinc-900 text-zinc-200 font-md placeholder-zinc-800 sm:text-2xl"
                        placeholder="Name"
                    />
                </div>
                <div className="relative">
                    <div className="relative">
                        <input
                            id="phone"
                            type="tel"
                            required
                            inputMode={'tel'}
                            pattern="\d{10}"
                            className="w-full px-3 py-2 text-xl rounded-xl border-zinc-500 bg-zinc-900 text-zinc-200 placeholder-zinc-800 sm:text-2xl"
                            maxLength={10}
                            placeholder="Phone Number"
                        />
                        {usPhoneNumber && <span
                            className="absolute inset-y-0 right-0 flex items-center justify-center pr-2 text-zinc-400">{stateCodeToState[usPhoneNumber.slice(0, 3)] || ""}</span>}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button type="submit"
                        className="px-8 py-2 duration-500 shadow-lg rounded-xl bg-zinc-900 text-zinc-400 backdrop-blur-2xl hover:text-zinc-200">
                        Submit
                    </button>
                </div>
                {errorEdu && (
                    <p className="text-xs text-center text-emerald-400">
                        {'You have already submitted your details!'}
                    </p>
                )
                }
                {successEdu && (
                    <p className="text-xs text-center text-emerald-400">
                        {'Thank you Someone will be in touch soon!'}
                    </p>
                )
                }
            </form>


            {/*JOB AGENCY*/}


            <form action="#" method="post" className={`space-y-6  pt-8`} onSubmit={submitContactUsJob}>
                <div>
                    <p className="mt-2 text-xl tracking-tight text-center text-transparent bg-clip-text sm:text-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600">
                        Job Agency <span className={"text-zinc-600 "}>Beta</span>
                    </p>
                    <input
                        id="email"
                        type="email"
                        required
                        className="w-full px-3 py-2 mt-4 text-xl rounded-xl border-zinc-500 bg-zinc-900 text-zinc-200 font-md placeholder-zinc-800 sm:text-2xl"
                        inputMode={'email'}
                        placeholder="Email"
                        onChange={() => {
                            setErrorJob(false);
                            setSuccessJob(false);
                        }}
                    />
                </div>
                <div className="relative">
                    <div className="relative">
                        <input
                            id="phone"
                            type="tel"
                            required
                            inputMode={'tel'}
                            pattern="\d{3}-\d{3}-\d{4}"
                            className="w-full px-3 py-2 text-xl rounded-xl border-zinc-500 bg-zinc-900 text-zinc-200 placeholder-zinc-800 sm:text-2xl"
                            value={formatPhoneNumber(usPhoneNumber)}
                            onChange={handlePhoneNumberChange}
                            maxLength={12}
                            placeholder="Phone Number"
                        />
                        {usPhoneNumber && <span
                            className="absolute inset-y-0 right-0 flex items-center justify-center pr-2 text-zinc-400">{stateCodeToState[usPhoneNumber.slice(0, 3)] || ""}</span>}
                    </div>
                </div>
                {!validUSNumber && (
                    <p className="text-xs text-center text-red-600">
                        Please enter a valid US Phone Number.
                    </p>
                )}

                <div className="flex justify-center">
                    <button type="submit"
                        className="px-4 py-2 duration-500 rounded-md shadow-lg bg-zinc-900 text-zinc-400 backdrop-blur-2xl hover:shadow-emerald-glow hover:text-zinc-200">
                        Submit
                    </button>
                </div>
                {successJob && (
                    <p className="text-xs text-center text-emerald-400">
                        {'Thank you for signing up!'}
                    </p>
                )
                }
                {errorJob && (
                    <p className="text-xs text-center text-emerald-400">
                        {'You have already signed up for updates.'}
                    </p>
                )
                }
            </form>

        </>
    );
}


