'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Role } from '@/util/getRoleOptions';
import { Stage, stages as _stages } from '@/app/constants/stages';
import { CheckCircle2 } from 'lucide-react';


export default function Forms(
    {
        options, role
    }: {
        options: any,
        role: Role
    }
) {


    const [error, setError] = useState(false);

    const [validManager, setValidManager] = useState(true);
    const [validPhone, setValidPhone] = useState(true);

    const [loading, setLoading] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState('');
    const [selectedRole, setSelectedRole] = useState('CANDIDATE');
    const [stages, setStages] = useState<boolean[]>(
        _stages.map((stage: Stage, index: number) => {
            return false;
        })
    );


    const [success, setSuccess] = useState(false);


    const onChangePhone = (e: any) => {
        const phoneNumber = e.target.value;
        const isValid = /^\d+$/.test(phoneNumber);
        setValidPhone(isValid);
    };

    const onChangeManager = (e: any) => {
        const managerName = e.target.value;
        const isValid = /^[a-zA-Z\s]+$/.test(managerName);
        setValidManager(isValid);
    };

    async function onSubmit(e: any) {
        e.preventDefault();
        setError(false);
        setLoading(true); // Set loading state to true
        setSuccess(false);
        setRedirectUrl('');

        const formData = new FormData(e.currentTarget);

        const body = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            role: selectedRole,
            stages: stages
        };

        console.log(body);

        const res = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (res.status !== 200) {
            setError(true);
            setLoading(false);
            console.log(res);
            throw new Error(await res.text());
        } else {
            setRedirectUrl(`/edu/user/${res.statusText}`);
            setSuccess(true);
            setStages(_stages.map((stage: Stage, index: number) => {
                return false;
            }))
            setSelectedRole('CANDIDATE');
            e.target.reset();
        }
        setLoading(false);
    }

    function SubmitButton() {
        return (
            <button
                type="submit"
                className=
                {`w-full p-2 text-center text-black duration-500 rounded-lg bg-zinc-400 hover:text:black drop-shadow-xl ${loading ? '' : 'hover:bg-black hover:text-emerald-400'} `}
                disabled={loading} // Disable the button when loading
            >
                {loading ? (
                    <>
                        <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 mr-3 text-white animate-spin"
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
                        Creating User...
                    </>
                ) : (
                    'Create'
                )}
            </button>
        )
    }



    return (
        <form method="post" onSubmit={onSubmit} className="px-4">
            <div className="max-w-md p-10 pt-8 mt-4 space-y-6 shadow-2xl rounded-2xl outline outline-zinc-300 outline-1">
                <h1 className="mb-4 text-center text-md text-zinc-700">Put the User Details</h1>
                <input
                    id="name"
                    name="name"
                    type="text"
                    disabled={loading}
                    placeholder="Name"
                    className={`w-full px-3 py-2 text-xl rounded-xl border-zinc-500 bg-zinc-200 ${!validManager ? 'outline-1 outline-red-500' : ''
                        }  font-md placeholder-zinc-300 sm:text-2xl`}
                    onChange={onChangeManager}
                />
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="tel"
                    pattern="\d{10}"
                    maxLength={10}
                    disabled={loading}
                    placeholder="Phone"
                    className={`w-full px-3 py-2 text-xl rounded-xl border-zinc-500 ${!validPhone ? 'outline-1 outline-red-500' : ''
                        } bg-zinc-200 font-md placeholder-zinc-300 sm:text-2xl`}
                    onChange={onChangePhone}
                />
                <input
                    id="email"
                    name="email"
                    type="email"
                    disabled={loading}
                    placeholder="Email"
                    className={`w-full px-3 py-2 text-xl rounded-xl border-zinc-500 bg-zinc-200  font-md placeholder-zinc-300 sm:text-2xl ${error ? 'outline-1 outline-red-500' : ''
                        }`}
                />
                {
                    (role === 'INT_ADMIN' || role === 'EXT_ADMIN') ?
                        <select className='w-full px-2 py-4 text-xl bg-zinc-200 text-zinc-800 rounded-xl'
                            onChange={
                                (e) => {
                                    setSelectedRole(e.target.value);
                                    setStages(
                                        _stages.map((stage: Stage, index: number) => {
                                            return false;
                                        })
                                    )
                                }
                            }
                        >
                            <option value='CANDIDATE'>Candidate</option>
                            <option value='USER'>User</option>
                            <option value='ADMIN'>Admin</option>
                        </select>
                        :
                        <></>
                }
                {
                    (selectedRole === 'USER') && (
                        <>
                            <h1 className='text-sm text-center text-zinc-700'>Select which Stages that this user will be able to see of a candidate, Its important to select the appropriate roles</h1>
                            <div className='flex flex-col items-center justify-center px-4 py-4 divide-y rounded-xl bg-zinc-100 divide-zinc-200'>
                                {
                                    (
                                        _stages.map((item: Stage, index: number) => (
                                            <div key={index} className='flex flex-row items-center justify-start w-full gap-4 py-4 text-white group'
                                                onClick={() => {
                                                    setStages((prev) => {
                                                        const _prev = [...prev];
                                                        _prev[index] = !_prev[index];
                                                        return _prev;
                                                    }
                                                    )
                                                    console.log(stages);
                                                }}
                                            >
                                                <CheckCircle2 className={`duration-500 group-hover:text-black ${stages[index] === true ? 'text-emerald-400' : 'text-zinc-700'} cursor-pointer`} />
                                                <label
                                                    htmlFor={item.stage}
                                                    className={`flex items-center text-lg duration-500 text-start group-hover:text-black ${stages[index] === true ? 'text-emerald-400' : 'text-zinc-700'}`}
                                                >
                                                    <p className=''>{item.stage}. </p>
                                                    {item.name}
                                                </label>
                                            </div>
                                        ))
                                    )}
                            </div></>

                    )
                }
                <SubmitButton />
                {
                    error && <p className="text-sm text-center text-red-400">Error Creating User</p>
                }
                {
                    success && <p className="text-sm text-center text-green-400">User Created Successfully</p>
                }
                {
                    success && <Link className='underline text-zinc-400' href={redirectUrl}>Click Here to Redirect to Created User Page</Link>
                }
            </div>
        </form>
    );
}