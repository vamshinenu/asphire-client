"use client";
import {useState} from "react";
import {stateCodeToState} from "@/app/constants/stateCodes";
import supabase from "@/supabaseClient";

export default function Contact() {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validNumber, setValidNumber] = useState(true);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePhoneNumberChange = (event: any) => {
        let input = event.target.value;
        setError(false);
        setSuccess(false);
        // Only keep the numbers from the input.
        input = input.replace(/[^\d]/g, '');

        if (input.length < 4) {
            setPhoneNumber(input);
        } else if (input.length < 7) {
            setPhoneNumber(`${input.slice(0, 3)}-${input.slice(3)}`);
        } else {
            // Limit the input length to 10 digits (plus the hyphen).
            setPhoneNumber(`${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`);
        }

        // Check if the input starts with a valid state code.
        if (stateCodeToState[input.slice(0, 3)]) {
            setValidNumber(true);
        } else {
            setValidNumber(false);
        }
    };

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (!stateCodeToState[phoneNumber.substring(0, 3)]) {
            setValidNumber(false);
        } else if (phoneNumber.length !== 12) {
            setValidNumber(false);
        } else {
            const {data, error} = await supabase.from('letstalk').insert([
                {phoneNumber: phoneNumber, email: event.target.email.value}
            ]);
            if (error) {
                if (error?.code === '23505') {
                    setError(true);
                } else {
                    alert('unable to process request');
                }
            }
            else {
                event.target.reset();
                setPhoneNumber('');
                setSuccess(true);
            }
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
        <div className="flex w-full max-w-md justify-center">
            <form action="#" method="post" className={`space-y-6 pt-8`} onSubmit={handleSubmit}>
                <div>
                    <input
                        id="email"
                        type="email"
                        required
                        className="w-full rounded-xl bg-zinc-900 text-2xl font-md text-zinc-200 border-zinc-500 px-3 py-2 placeholder-zinc-800"
                        inputMode={'email'}
                        placeholder="yourmail@domain.com"
                        onChange={() => {
                            setError(false);
                            setSuccess(false);
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
                            value={formatPhoneNumber(phoneNumber)}
                            onChange={handlePhoneNumberChange}
                            maxLength={12}
                            placeholder="123-456-7890"
                        />
                        {phoneNumber && <span
                            className="absolute inset-y-0 right-0 flex items-center text-zinc-400 justify-center pr-2">{stateCodeToState[phoneNumber.slice(0, 3)] || ""}</span>}
                    </div>
                </div>
                {!validNumber && (
                    <p className="text-xs text-red-600 text-center">
                        Please enter a valid US Phone Number.
                    </p>
                )}
                {error && (
                    <p className="text-xs text-emerald-400 text-center">
                        {'You have already signed up for updates.'}
                    </p>
                )
                }
                <div className="flex justify-center">
                    <button type="submit"
                            className="rounded-md bg-zinc-900 px-4 py-2 text-zinc-400 hover:text-zinc-200 duration-500 hover:shadow-emerald-glow shadow-lg backdrop-blur-2xl">
                        Submit
                    </button>
                </div>
                {success && (

                    <p className="text-xs text-emerald-400 text-center">
                        {'Thank you for signing up!'}
                    </p>
                )
                }
            </form>
        </div>
        // </div>
    );
}
