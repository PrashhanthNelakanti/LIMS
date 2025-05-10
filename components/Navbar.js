import { useState } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { MenuIcon, XIcon, SearchIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/imgs/logo.png'


const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Info', href: '/info' },
    { name: 'Create', href: '/createEntity' },
    { name: 'Register', href: '/register' },
    { name: 'Login', href: '/login' },
]

// Sample search options
const searchOptions = ['Dashboard', 'Projects', 'Settings', 'Help']

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState('')
    let loggedIn= false;

    const dispatch = useDispatch()

    const router = useRouter()
    const user = sessionStorage.getItem('login') || '{}';

    const { fname = '' } = JSON.parse(user);


    const initials = fname
        .split(' ')
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase())
        .join('');  // e.g. "JD" for "John Doe"

    const filteredOptions =
        searchQuery.trim().length > 0
            ? searchOptions.filter(opt =>
                opt.toLowerCase().includes(searchQuery.toLowerCase())
            )
            : []

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    if (initials != "") {
        loggedIn = true;
    }

    console.log(initials,loggedIn)


    return (
        <Disclosure as="nav" className="bg-gray-100">
            {({ open }) => (

                <>
                    <div className="max-w-7xl mx-auto px-0">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo and optional search */}
                            <div className="flex items-center space-x-4">
                                <Link href="/home">
                                    <a className="flex-shrink-0 ml-0">
                                        <Image src={logo} width={60} height={30} alt="Logo" />
                                    </a>
                                </Link>

                                {loggedIn && (
                                    <div className="hidden md:block">
                                        <div className="relative w-64">
                                            <input
                                                type="text"
                                                className="w-full border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                placeholder="Search..."
                                                value={searchQuery}
                                                onChange={e => setSearchQuery(e.target.value)}
                                            />
                                            <SearchIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            {filteredOptions.length > 0 && (
                                                <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                    {filteredOptions.map(option => (
                                                        <li
                                                            key={option}
                                                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                            onClick={() => {
                                                                setSearchQuery(option)
                                                                router.push(`/${option.toLowerCase()}`)
                                                            }}
                                                        >
                                                            {option}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Desktop nav links + profile */}
                            <div className="hidden md:flex md:items-center md:space-x-4">
                                {navigation.map(item => {
                                    // define your link groups
                                    const publicLinks = ['Home', 'About'];
                                    const authLinks   = ['Info', 'Create'];
                                    const guestLinks  = ['Login', 'Register'];

                                    let showLink = false;
                                    if (publicLinks.includes(item.name)) {
                                        // Always show Home & About
                                        showLink = true;
                                    } else if (authLinks.includes(item.name)) {
                                        // Only show Info, Projects & Logout when logged in
                                        showLink = loggedIn;
                                    } else if (guestLinks.includes(item.name)) {
                                        // Only show Login/Register when logged out
                                        showLink = !loggedIn;
                                    }

                                    if (!showLink) return null;

                                    return (
                                        <Link key={item.name} href={item.href}>
                                            <a
                                                className={classNames(
                                                    'px-3 py-2 rounded-md text-sm font-medium',
                                                    'text-gray-900 hover:bg-gray-900 hover:text-white'
                                                )}
                                                aria-current={router.pathname === item.href ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        </Link>
                                    )
                                })}


                            {loggedIn && (
                                    <Menu as="div" className="relative">
                                        <Menu.Button className="ml-4 flex items-center justify-center h-8 w-8 rounded-full bg-indigo-600 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            {initials}
                                        </Menu.Button>
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link href="/app-setup">
                                                        <a
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            App Setup
                                                        </a>
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        onClick={() => router.push('/logout')}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'w-full text-left block px-4 py-2 text-sm text-gray-700'
                                                        )}
                                                    >
                                                        Logout
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu>
                                )}
                            </div>

                            {/* Mobile menu toggle */}
                            <div className="flex md:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile menu panel */}
                    <Disclosure.Panel className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                                {navigation.map(item => {
                                    // define your link groups
                                    const publicLinks = ['Home', 'About'];
                                    const authLinks   = ['Info', 'Create', 'Logout'];
                                    const guestLinks  = ['Login', 'Register'];

                                    let showLink = false;
                                    if (publicLinks.includes(item.name)) {
                                        // Always show Home & About
                                        showLink = true;
                                    } if (authLinks.includes(item.name)) {
                                        // Only show Info, Projects & Logout when logged in
                                        showLink = loggedIn;
                                    } else if (guestLinks.includes(item.name)) {
                                        // Only show Login/Register when logged out
                                        showLink = !loggedIn;
                                    }

                                    if (!showLink) return null;

                                    return (
                                        <Link key={item.name} href={item.href}>
                                            <a
                                                className={classNames(
                                                    'px-3 py-2 rounded-md text-sm font-medium',
                                                    'text-gray-900 hover:bg-gray-900 hover:text-white'
                                                )}
                                                aria-current={router.pathname === item.href ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        </Link>
                                    )
                                })}
                        </div>
                        {loggedIn && (
                            <div className="pt-4 pb-3 border-t border-gray-200">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                                            {initials}
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">{user.fname}</div>
                                        <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                <div className="mt-3 px-2 space-y-1">
                                    <Disclosure.Button
                                        as="a"
                                        href="/app-setup"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-900 hover:text-white"
                                    >
                                        App Setup
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as="button"
                                        onClick={() => router.push('/logout')}
                                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-900 hover:text-white"
                                    >
                                        Logout
                                    </Disclosure.Button>
                                </div>
                            </div>
                        )}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
