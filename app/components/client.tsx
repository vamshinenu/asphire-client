'use client';

import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Item {
    value: string;
    label: string;
}

export default async function UserRegisterClient(
    // { options }: {
    // options: Item[]
    // }
) {

    const [error, setError] = useState(false);
    const [validName, setValidName] = useState(true);
    const [validPhone, setValidPhone] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [loading, setLoading] = useState(false); // Add loading state
    const [redirectUrl, setRedirectUrl] = useState(''); // Add loading state
    const [selectedRole, setSelectedRole] = useState(''); // Add loading state
    const [validCompany, setValidCompany] = useState(true);

    const [success, setSuccess] = useState(false);


    const validateEmail = (email: any) => {

        const re = /\S+@\S+\.\S+/;
        console.log(re.test(email));
        return re.test(email);
    };

    const onChangeEmail = (e: any) => {
        console.log(e.target.value);
        const email = e.target.value;
        const isValid = validateEmail(email);
        console.log(isValid);
        setValidEmail(isValid);
    }


    const onChangePhone = (e: any) => {
        const phoneNumber = e.target.value;
        const isValid = /^\d+$/.test(phoneNumber);
        setValidPhone(isValid);
    };

    const onChangeName = (e: any) => {
        const name = e.target.value;
        const isValid = /^[a-zA-Z\s]+$/.test(name);
        setValidName(isValid);
    };

    const onChangeRole = async (e: any) => {
        const role = e.target.value;
        setSelectedRole(role);
        console.log(role);
        console.log(selectedRole);
        console.log(selectedRole === 'EXT_ADMIN_EDU' || selectedRole === 'EXT_USER_EDU' || selectedRole === 'EXT_CANDIDATE_EDU')
    }

    const onChangeCompany = (e: any) => {
        const companyName = e.target.value;
        const isValid = /^[a-zA-Z\s]+$/.test(companyName);
        setValidCompany(isValid);
    };

    async function onSubmit(e: any) {
        e.preventDefault();
        setError(false);
        setSuccess(false);
        setLoading(true); // Set loading state to true
        const formData = new FormData(e.currentTarget);
        const body = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
        }

        if (!body.name || !body.email || !body.phone) {
            console.log('no name or password or email');
            return;
        }

        const res = await fetch('/api/edu/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (res.status !== 200) {
            setError(true);
            alert(res.statusText);
            return
        }
        const data = await res.json();
        setSuccess(true);
        setLoading(false);
        e.target.reset();

        redirect(`/edu/user/${data.id}`);
    }



    function SubmitButton() {
        return (
            <button
                type="submit"
                className=
                {`w-full p-2 text-center text-white duration-500 rounded-lg bg-zinc-700 hover:text:black ${loading ? '' : 'hover:bg-white hover:text-black '} `}
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
                        Creating Company...
                    </>
                ) : (
                    'Create'
                )}
            </button>
        )
    }



    return (
        <form method="post" onSubmit={onSubmit} className="max-w-md p-10 pt-8 mt-4 space-y-6 bg-black shadow-2xl rounded-2xl outline outline-gray-900 outline-1">
            <input
                id="name"
                name="name"
                type="text"
                disabled={loading}
                placeholder="Name"
                className={`w-full px-3 py-2 text-xl rounded-xl ${!validName ? 'outline-1 outline-red-500' : ''
                    } border-zinc-500 bg-zinc-900 text-zinc-200 font-md placeholder-zinc-800 sm:text-2xl`}
                onChange={onChangeName}
            />
            <input
                id="email"
                name="email"
                type="email"
                disabled={loading}
                onChange={onChangeEmail}
                placeholder="Email"
                className={`w-full px-3 py-2 text-xl rounded-xl ${!validEmail ? 'outline-1 outline-red-500' : ''
                    }  border-zinc-500 bg-zinc-900 text-zinc-200 font-md placeholder-zinc-800 sm:text-2xl ${error ? 'outline-1 outline-red-500' : ''
                    }`}
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
                    } bg-zinc-900 text-zinc-200 font-md placeholder-zinc-800 sm:text-2xl`}
                onChange={onChangePhone}
            />
            {/* {
                options && (
                    <select className="w-full px-2 py-4 text-xl bg-zinc-800 text-zinc-300 rounded-xl" defaultValue={''}
                        onChange={onChangeRole}

                    >
                        {
                            options.map((item: any, index: number) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))}
                    </select>
                )
            } */}
            {
                (selectedRole === 'EXT_ADMIN_EDU' || selectedRole === 'EXT_USER_EDU' || selectedRole === 'EXT_CANDIDATE_EDU') ? (
                    <div className="flex flex-col gap-4">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            disabled={loading}
                            placeholder="Company Name"
                            className={`w-full px-3 py-2 text-xl rounded-xl ${!validCompany ? 'outline-1 outline-red-500' : ''
                                } border-zinc-500 bg-zinc-900 text-zinc-200 font-md placeholder-zinc-800 sm:text-2xl`}
                            onChange={onChangeCompany}
                        />
                        <SubmitButton />
                    </div>

                ) : (
                    <SubmitButton />
                )
            }


            {
                !validEmail && <p className="text-sm text-center text-red-400">Invalid Email</p>
            }
            {
                !validPhone && <p className="text-sm text-center text-red-400">Invalid Phone Number</p>
            }
            {
                error && <p className="text-sm text-center text-red-400">Error Creating Candidate</p>
            }
            {
                success && <p className="text-sm text-center text-green-400">Candidate Created Successfully</p>
            }
            {
                success && <Link className='underline text-zinc-400' href={redirectUrl}>Click Here to Redirect to Created Candidate Page</Link>
            }
        </form>
    )
}