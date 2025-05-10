import React,{useEffect, useState} from "react";

import "aos/dist/aos.css";
import Link from "next/link";
import Spinner from "../components/utils/spinner";
import {wait} from "next/dist/build/output/log";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
export default function Info() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        let isMounted = true  // to avoid setting state on unmounted component
        async function load() {
            setLoading(true)
            await sleep(5000)      // pause 5 seconds
            try {
                const res  = await fetch('/api/v2/personalnfo')
                const json = await res.json()
                if (isMounted) {
                    setData(json)
                }
            } catch (err) {
                console.error(err)
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }
        load()

        return () => {
            isMounted = false
        }
    }, [])


    if (isLoading) return(
           <Spinner/>
       );
    if (!data) return <p>No profile data</p>

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{data.message}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
            </div>
            {data.doc.length === 0 ? (
                <h2>There is no Data yet!</h2>
            ) : (
                <ul>
                    {data.doc.map((info, i) => (
                        <div  className="border-t border-gray-300" key={info._id}>
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" >{info.fname}</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{info.email}</dd>
                                </div>
                            </dl>
                        </div>

                    ))}
                </ul>
            )}
        </div>
    )

}

export async function getServerSideProps(ctx) {

    // get the current environment
    let dev = process.env.NODE_ENV !== 'production';
    let { DEV_URL, PROD_URL } = process.env;

    // request posts from api
    let response =  await fetch(`${dev ? DEV_URL : PROD_URL}/api/v2/personalnfo`);
    // extract the data
    let data =  await response.json();

    return {
        props: {
            data: data['message'],
        },
    };
}
