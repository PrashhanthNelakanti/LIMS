const experience = {
    projectName: 'Projects',
    tech: 'Technologies',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Experience', href: '#' },
    ],
    duration: {
        tenure: 'Sep 2017 - Dec 2019'
    },

    reviews: [
        { average: 5, name: "Java-8" },
        { average: 5, name: "Spring Boot" },
        { average: 5, name: "Spring Data-Jpa" },
        { average: 3, name: "Microservices" },
        { average: 3, name: "AWS" },
        { average: 3, name: "PCF" },
        { average: 3, name: "Jenkins" },
        { average: 3, name: "Terraform" },
        { average: 4, name: "Angular" },
        { average: 5, name: "PrimeNg" },
        { average: 5, name: "Bootsrap" },
        { average: 5, name: "Maven" },
        { average: 5, name: "Git" },
        { average: 3, name: "Bamboo" },
        { average: 5, name: "Intellij" },
        { average: 4, name: "Python" },

    ]
}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Projects() {


    return (
        <div className="bg-white">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                        {experience.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="w-4 h-5 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a href={experience.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {experience.projectName}
                            </a>
                        </li>
                    </ol>
                </nav>

                <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                    {/* Options */}
                   {/* <div className="mt-4 lg:mt-0 lg:row-span-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">{experience.tech}</p>

                         Reviews
                        {experience.reviews.map((review) => (
                            <div className="mt-1">
                                <div className="mt-1 flex space-x-1 ml-1  justify-between text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {review.name}
                                </div>
                            </div>
                        ))}
                    </div>*/}

                    <div className="py-15 lg:pt-6 lg:pb-11 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-10">
                        {/* Description and details */}

                        <div className="mt-10">
                            <h3 className="text-lg font-medium text-gray-900">Projects</h3>

                            <div class="flex flex-col">
                                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div class="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                                        <div class="overflow-hidden">
                                            <table class="min-w-full text-center">
                                                <thead class="border-b bg-gray-800">
                                                    <tr>
                                                        <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                                            Organization
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                                            Project
                                                        </th>
                                                        <th scope="col" class="text-sm font-medium text-white px-6 py-4">
                                                            Year
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="bg-white border-b">
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            Hitachi Vantara
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            <a className="text-blue-600"
                                                               href='/projects/nwea'>NWEA</a>
                                                        </td>
                                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            2021-Present
                                                        </td>
                                                    </tr>
                                                    <tr class="bg-white border-b">
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            Mphasis
                                                        </td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <a class="text-blue-600" href='/projects/lm'>Lead Management</a>
                                                        </td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            2020
                                                        </td>
                                                    </tr>
                                                    <tr class="bg-white border-b">
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            Verizon
                                                        </td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        <a class="text-blue-600" href='/projects/gcm'>GCM</a>
                                                        </td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            2018
                                                        </td>
                                                    </tr>
                                                    <tr class="bg-white border-b">
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            Colruyt
                                                        </td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            CASS
                                                        </td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            2013
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}