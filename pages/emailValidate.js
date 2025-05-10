import { LockClosedIcon } from '@heroicons/react/solid'
import { useState } from 'react';
import { useRouter } from 'next/router'
import signin from "../components/actions";
import {useDispatch} from "react-redux";

export default function ValidateOtp() {
  const router = useRouter();
  const { emailId } = router.query
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handlePost = async (e) => {
    e.preventDefault();

    // reset error and message
    setError('');
    setMessage('');

    // fields check
    if (!otp) return setError('Please enter the OTP');

    // post structure
    let info = {
      emailId,
      otp
    };

    // save the post
    let response = await fetch('/api/validateOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(info),
    });
    // get the data
    let data = await response.json();
    console.log(info)
    console.log(data)

    if (data.success) {
      // reset the fields
      sessionStorage.setItem("login","yes");
      dispatch(signin());
      setOtp('');
      // set the message
      router.push('/userPage');
      return setMessage(data.message);
    } else {
      // set the error
      console.log(error)
      return setError(error);
    }
  };
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Please Enter OTP</h2>
          </div>
          <form onSubmit={handlePost} className="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input  name="email" disabled  value={emailId} autoComplete="given-name" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
              </div>
              <div>
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>
                <input name="otp" onChange={(e) => setOtp(e.target.value)} value={otp} autoComplete="given-name" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="OTP" />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
