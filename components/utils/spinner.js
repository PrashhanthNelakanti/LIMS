import {FaReact} from "react-icons/fa";
import logo from '../../public/imgs/logo.png'
import Image from "next/image";
import React from "react";
export default function Spinner() {
    return (
        <>
            <div className="pt-20 flex justify-center">
                <div className="animate-pulse">
                    <div className="h-32 w-32  flex items-center justify-center">
                        <Image
                            src={logo}
                            alt="App placeholder"
                            className="w-full max-w-sm rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}