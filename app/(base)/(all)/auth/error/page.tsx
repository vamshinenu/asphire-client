'use client';
import Link from "next/link";
import { useSearchParams } from "next/navigation"


export default function ErrorPage() {

    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const code = searchParams.get('code');
    return (
        <div className='text-center'>
            {error === 'AccessDenied' || error === 'accessdenied' ?
                <h1 className="mb-4 text-3xl font-bold text-center text-gray-50">Unauthorized</h1> : <h1 className="mb-4 text-3xl font-bold text-center text-gray-50">{error}</h1>
            }
            {code === 'CANNOTACCESSUSER' && (
                <p className='max-w-md px-4 text-xs text-gray-500'>
                    You cannot access this user
                </p>
            )
            }
            {error === 'AccessDenied' || error === 'accessdenied' ?
                <p className='max-w-md px-4 text-xs text-gray-500'>You are not authorized to access this page, please <Link href='/auth/login' className='text-gray-400 underline duration-500 hover:text-gray-100'>Login</Link> to continue <span> Or <Link href='/contact' className='text-gray-400 underline duration-500 hover:text-gray-100'>Contact us</Link> to register If you are an Agent or Company trying to Register please mail us at <a className='text-gray-400 underline duration-500 hover:text-gray-100' href='mailto:ask@asphire.co'>ask@asphire.co</a> </span></p> : null}
        </div>
    )
}