import {LockClosedIcon} from '@heroicons/react/solid'
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router'
import logo from '../public/imgs/logo.png'
import Image from "next/image";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(()=>{
    },[email])
    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!email || !password) return setError('All fields are required');

        // post structure
        let info = {
            email,
            password,
            "purpose": "login"
        };
        console.log(info)
        // save the post
        let response = await fetch('/api/v2/login', {
            // Insead of GET we are using POST as next allows POST as secured
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(info),
        });
        // get the data
        let data = await response.json();
        if (data.success) {
            sessionStorage.setItem("login",JSON.stringify(data.user));
            // reset the fields
            setPassword('');
            setEmail('');
            // set the message
            router.push('/userPage');
            return setMessage(data.message);
        } else {
            // set the error
            console.log(message)
            return setError(data.message);
        }
    };
    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <Image
                            className="mx-auto h-10"
                            src={logo}
                            alt="Workflow" priority={true}
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your
                            account</h2>
                       {/* <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <a href="/validateOtp" className="font-medium text-grey-600 hover:text-grey-100">
                                Login in with OTP
                            </a>
                        </p>*/}
                        <h3 className="block uppercase tracking-wide text-lg font-bold mb-2 text-green-500">{message}</h3>
                        <h3 className="block uppercase tracking-wide text-lg font-bold mb-2 text-red-500">{error}</h3>
                    </div>
                    <form onSubmit={handlePost} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true"/>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input name="email" onChange={(e) => setEmail(e.target.value)} value={email}
                                       autoComplete="given-name"
                                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Email address"/>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    OTP
                                </label>
                                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)}
                                       value={password}
                                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Password"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-white-500 group-hover:text-gray-400" aria-hidden="true"/>
                </span>
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
