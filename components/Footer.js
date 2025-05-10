import Marquee from "react-fast-marquee";
import {
    FaCircle,
} from "react-icons/fa";

import Image from "next/image";
import devLogo from "../public/imgs/developer-logo.png";
import React from "react";


export default function Footer() {
    return (<>
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
                {/* Text Column */}
                <div className="md:w-1/2 space-y-6 animate-fade-in">
                    <h1 className="text-3xl font-bold text-gray-900">About the Developer</h1>
                    <p className="text-gray-600">
                        An accomplished Full‑Stack Software Engineer with over <strong className="font-semibold">10 years</strong> of expertise across the Pharmaceutical,
                        Banking & Finance, and Telecommunications domains. Has delivered mission‑critical solutions for global
                        enterprises such as Hitachi, Verizon, and Charles Schwab, driving digital transformation to enhance reliability,
                        scalability, and user experience.
                    </p>
                    <h2 className="text-2xl font-semibold text-gray-800">Technical Skillset</h2>
                    <ul className="space-y-2">
                        <li className="flex items-start">
                            <FaCircle className="mt-1 mr-2 text-green-500" />
                            Java, Spring Boot, Spring Cloud, RESTful APIs
                        </li>
                        <li className="flex items-start">
                            <FaCircle className="mt-1 mr-2 text-green-500" />
                            Angular, TypeScript, RxJS, Responsive Design
                        </li>
                        <li className="flex items-start">
                            <FaCircle className="mt-1 mr-2 text-green-500" />
                            AWS (S3, SQS, Lambda), Docker, Kubernetes, Terraform
                        </li>
                        <li className="flex items-start">
                            <FaCircle className="mt-1 mr-2 text-green-500" />
                            PostgreSQL, Oracle, MongoDB, Kafka, RabbitMQ
                        </li>
                    </ul>
                </div>

                {/* Image Column */}
                <div className="md:w-1/2 flex justify-center md:justify-end mt-5 md:mt-0 animate-slide-in">
                        <Image
                            src={devLogo}
                            alt="App placeholder"
                            className="w-full max-w-sm rounded-lg shadow-md"
                        />
                </div>
            </div>
        </section>
    </>)

}