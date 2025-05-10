import React,{ useState } from 'react';
import { useRouter } from 'next/router'
import { UserAddIcon} from "@heroicons/react/solid";
import Image from "next/image";
import logo from "../public/imgs/logo.png";


export default function Register() {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');  
  const router = useRouter();


  const handlePost = async (e) => {
    e.preventDefault();

    // reset error and message
    setError('');
    setMessage('');

    // fields check
    if (!fname || !email || !password) return setError('All fields are required');

    // post structure
    let info = {
      fname,
      email,
      password
    };
    // save the post
    let response = await fetch('/api/v2/personalnfo', {
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
      // reset the fields
      setFname('');
      setPassword('');
      setEmail('');
      router.push({
      pathname: '/home'
      });
      // set the message
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };
  
  return (<>
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Image
              className="mx-auto h-10"
              src={logo}
              alt="Workflow"  priority={true}
          />
        </div>
        <form onSubmit={handlePost} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <h3 className="block uppercase tracking-wide text-lg font-bold mb-2 text-green-500">{message}</h3>
              <h3 className="block uppercase tracking-wide text-lg font-bold mb-2 text-red-500">{error}</h3>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                First Name
              </label>
              <input name="fname" onChange={(e) => setFname(e.target.value)} value={fname} autoComplete="given-name" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" id="grid-first-name" type="text" />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Password
              </label>
              <input name="password" onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="given-name" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" id="grid-password" type="password" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Email Address
              </label>
              {
                error=='User Already exists'
                    ?(<><input name="email" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="given-name" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" id="grid-last-name" type="text" />
                      <p className="text-red-500 text-xs italic">Email is already in use</p></>)
                    : (<input name="email" onChange={(e) => setEmail(e.target.value)} value={email} autoComplete="given-name" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" id="grid-last-name" type="text" />)
              }
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <UserAddIcon className="h-5 w-5 text-white-500 group-hover:text-gray-400" aria-hidden="true"/>
                </span>
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>);
}