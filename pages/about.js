import React, { useEffect } from "react";
import Image from 'next/image'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Aos from "aos";
import "aos/dist/aos.css";
import {CheckCircleIcon} from "@heroicons/react/solid";
import logo from "../public/imgs/logo.png";
import Footer from "../components/Footer";

const About = ({ data }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  return (<>
    <div>
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-18">
        {/* Two-col layout on lg+, stacked on smaller */}
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between">

          {/* Text column */}
          <div className="sm:text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-5xl">
              <span className="block xl:inline">Welcome to </span>{' '}
              <span className="block text-red-400 xl:inline">ReaLabs LIMS.</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Capture, organize, and manage all your research activities in one place. From experiments to
              samples and storage, the LIMS is your centralized, secure, and searchable digital workspace.
            </p>

            <div className="mt-6 flex flex-col space-y-2">
                              <span className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-green-700 mr-1"/>
                                Digitize your experiments
                              </span>
              <span className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-green-700 mr-1"/>
                                Track samples and reagents
                              </span>
              <span className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-green-700 mr-1"/>
                                Manage storage locations
                              </span>
              <span className="flex items-center">
                                <CheckCircleIcon className="h-5 w-5 text-green-700 mr-1"/>
                                Collaborate with your team
                              </span>
            </div>
          </div>

          {/* Image column */}
          <div className="mb-8 lg:mb-0 lg:w-1/2 flex justify-center lg:justify-end">
            <Image
                src={logo}
                alt="App placeholder"
                className="w-full max-w-sm rounded-lg shadow-md"
            />
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  </>);
}

export default About;
