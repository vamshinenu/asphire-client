'use client';

import {signIn, useSession} from 'next-auth/react';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'next/link';
import {redirect, useSearchParams} from "next/navigation";


export default function Signin() {

    const { data: session , status } = useSession()
    const searchParams = useSearchParams();

    console.log('this is call back url',searchParams.get('error'));

    if(status === 'loading') {
        return (<div role="status">
            <svg aria-hidden="true"
                 className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"/>
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"/>
            </svg>
        </div>)
    }

    if(status === 'authenticated') {
        redirect('/');
    }
    const callbackUrl = '/';

    return (
       <div className='text-center'>
          <h1 className="mb-4 text-3xl font-bold text-center text-gray-50">Sign in </h1>
          <button className='px-8 max-w-96' onClick={() => signIn('google', { callbackUrl })}>
              <div className='flex flex-row items-center duration-500 justify-center gap-4 px-8 py-4 text-white bg-transparent rounded-lg  hover:rounded-3xl outline outline-1 group hover:text-black hover:bg-white'>
                  <h1 className="text-center">Sign in with</h1>
                  <FontAwesomeIcon icon={faGoogle} className="w-6 h-6" />
              </div>
          </button>
           <p className=" max-w-md px-4 mt-2 text-red-500 text-xs">{searchParams.get('error') !== null ? 'We are facing trouble logging you in, Try checking your internet connection or clear cookies and try again' : ''}</p>


          <p className='max-w-md px-4 mt-4 text-xs text-zinc-500'>We currently support signin with Google, More options soon</p>
          <p className='max-w-md px-4 text-xs text-gray-500'>To Sigin you must have a registered account, if you are an individual seeking help please <Link href='/contact' className='text-gray-400 underline duration-500 hover:text-gray-100'>Contact us</Link> or if you are an agent want to work with <Link href='/' className='text-gray-400 underline duration-500 hover:text-gray-100'>Asphire</Link> mail us at <a className='text-gray-400 underline duration-500 hover:text-gray-100' href='mailto:ask@asphire.co'>ask@asphire.co</a></p>
           <p className='max-w-md px-4 mt-4 text-xs text-zinc-700'>We donot sell your personal information</p>

      </div>
    );
}