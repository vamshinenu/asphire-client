"use client";
import React, {useState} from "react";
import {stateCodeToState} from "@/app/constants/stateCodes";
import supabase from "@/supabaseClient";

export default function Contact() {

    const [usPhoneNumber, setUsPhoneNumber] = useState('');
    const [validUSNumber, setValidUSNumber] = useState(true);

    // const [name, setName] = useState('');
    // const [company, setCompany] = useState('');

    const [errorUS, setErrorUS] = useState(false);
    const [errorIN, setErrorIN] = useState(false);

    const [successUS, setSuccessUS] = useState(false);
    const [successIN, setSuccessIN] = useState(false);

    const handlePhoneNumberChange = (event: any) => {
        let input = event.target.value;
        setErrorUS(false);
        setSuccessUS(false);
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

    async function handleUSSubmit(event: any) {
        event.preventDefault();
        setErrorUS(false);
        setSuccessUS(false);

        if (!stateCodeToState[usPhoneNumber.substring(0, 3)]) {
            setValidUSNumber(false);
        } else if (usPhoneNumber.length !== 12) {
            setValidUSNumber(false);
        } else {
            const {data, error} = await supabase.from('letstalk').insert([
                {phoneNumber: usPhoneNumber, email: event.target.email.value}
            ]);
            if (error) {
                if (error?.code === '23505') {
                    setErrorUS(true);
                } else {
                    alert('unable to process request');
                }
            } else {
                event.target.reset();
                setUsPhoneNumber('');
                setSuccessUS(true);
            }

        }
    }

    async function handleINSubmit(event: any) {
        event.preventDefault();
        setErrorIN(false);
        setSuccessIN(false);

        const formData = {
            name: event.target.name.value,
            phoneNumber: event.target.phone.value,
            company: event.target.company.value
        }

        const {data, error} = await supabase.from('indiacontactus').insert([
            formData
        ]);
        if (error) {
            if (error?.code === '23505') {
                setErrorIN(true);
            } else {
                alert('unable to process request');
                console.log(error);
            }
        } else {
            event.target.reset();
            setSuccessIN(true);
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
            <form action="#" method="post" className={`space-y-6 bg-black px-16 py-16 hover:outline-pink-400 rounded-2xl outline outline-gray-900 outline-1 mt-4 shadow-2xl pt-8`} onSubmit={handleINSubmit}>
                <p className="text-2xl bg-clip-text text-transparent text-center sm:text-3xl font-bold tracking-tight mt-2 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600">
                    US Studies
                </p>
                {!validUSNumber && (
                    <p className="text-xs text-red-600 text-center">
                        Please enter a valid US Phone Number.
                    </p>
                )}
                <div>
                    <input
                        id="name"
                        type="text"
                        required
                        className="w-full rounded-xl bg-zinc-900 text-2xl font-md text-zinc-200 border-zinc-500 px-3 py-2 placeholder-zinc-800"
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
                            className="w-full rounded-xl text-2xl bg-zinc-900 text-zinc-200 border-zinc-500 px-3 py-2 placeholder-zinc-800"
                            maxLength={10}
                            placeholder="Phone Number"
                        />
                        {usPhoneNumber && <span
                            className="absolute inset-y-0 right-0 flex items-center text-zinc-400 justify-center pr-2">{stateCodeToState[usPhoneNumber.slice(0, 3)] || ""}</span>}
                    </div>
                </div>
                <div>
                    <select
                        id="company"
                        className="w-full rounded-xl bg-zinc-900 text-2xl font-md text-zinc-200 border-zinc-500 px-3 py-2"
                        defaultValue={'Asphire'}
                    >
                        <option value="" disabled selected>
                            Select Company
                        </option>
                        <option value="Asphire">Asphire</option>
                        <option value="Delta Overseas">Delta Overseas</option>
                    </select>
                </div>
                <div className="flex justify-center">
                    <button type="submit"
                            className="rounded-xl bg-zinc-900 px-8 py-2 text-zinc-400 hover:text-zinc-200 duration-500 shadow-lg backdrop-blur-2xl">
                        Submit
                    </button>
                </div>
                {errorIN && (
                    <p className="text-xs text-emerald-400 text-center">
                        {'You have already submitted your details!'}
                    </p>
                )
                }
                {successIN && (
                    <p className="text-xs text-emerald-400 text-center">
                        {'Thank you Someone will be in touch soon!'}
                    </p>
                )
                }
            </form>


            {/*JOB AGENCY*/}


            <form action="#" method="post" className={`space-y-6  pt-8`} onSubmit={handleUSSubmit}>
                <div>
                    <p className="text-2xl
                     bg-clip-text text-transparent text-center sm:text-3xl font-bold tracking-tight mt-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600">
                        Job Agency
                    </p>
                    <input
                        id="email"
                        type="email"
                        required
                        className="w-full mt-4 rounded-xl bg-zinc-900 text-2xl font-md text-zinc-200 border-zinc-500 px-3 py-2 placeholder-zinc-800"
                        inputMode={'email'}
                        placeholder="Email"
                        onChange={() => {
                            setErrorUS(false);
                            setSuccessUS(false);
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
                            className="w-full rounded-xl text-2xl bg-zinc-900 text-zinc-200 border-zinc-500 px-3 py-2 placeholder-zinc-800"
                            value={formatPhoneNumber(usPhoneNumber)}
                            onChange={handlePhoneNumberChange}
                            maxLength={12}
                            placeholder="Phone Number"
                        />
                        {usPhoneNumber && <span
                            className="absolute inset-y-0 right-0 flex items-center text-zinc-400 justify-center pr-2">{stateCodeToState[usPhoneNumber.slice(0, 3)] || ""}</span>}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button type="submit"
                            className="rounded-md bg-zinc-900 px-4 py-2 text-zinc-400 hover:text-zinc-200 duration-500 hover:shadow-emerald-glow shadow-lg backdrop-blur-2xl">
                        Submit
                    </button>
                </div>
                {successUS && (
                    <p className="text-xs text-emerald-400 text-center">
                        {'Thank you for signing up!'}
                    </p>
                )

                }

                {errorUS && (
                    <p className="text-xs text-emerald-400 text-center">
                        {'You have already signed up for updates.'}
                    </p>
                )
                }
            </form>

        </>
    );
}


