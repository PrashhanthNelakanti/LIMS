// components/SearchBox.jsx
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { SearchIcon } from '@heroicons/react/24/outline'

export default function SearchBox({
                                      entity,
                                      labelFn,
                                      subLabelFn,
                                      onSelect,
                                      placeholder = 'Search…',
                                      minLength = 1,
                                      limit = 20,
                                  }) {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const debounce = useRef(null)

    useEffect(() => {
        if (debounce.current) clearTimeout(debounce.current)
        if (query.length < minLength) {
            setResults([])
            return
        }

        debounce.current = setTimeout(() => {
            fetchResults(query)
        }, 300)

        return () => clearTimeout(debounce.current)
    }, [query])

    const fetchResults = async (q) => {
        setLoading(true)
        try {
            const res = await fetch(
                `/api/${entity}?search=${encodeURIComponent(q)}&limit=${limit}`
            )
            const json = await res.json()
            if (json.success) setResults(json[entity] || [])
        } catch (err) {
            console.error(err)
            setResults([])
        } finally {
            setLoading(false)
        }
    }

    const handleClick = (item) => {
        if (onSelect) return onSelect(item)
        // default: navigate to /entity/[id]
        const id = item[Object.keys(item)[1]] // assume second field is the ID/slug
        router.push(`/${entity}/${id}`)
    }

    return (
        <div className="relative w-full max-w-sm">
            <input
                type="text"
                className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>

            {(loading || (results.length > 0 && query.length >= minLength)) && (
                <ul className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto z-10">
                    {loading && (
                        <li className="px-3 py-2 text-sm text-gray-500">Loading…</li>
                    )}
                    {!loading && results.length === 0 && (
                        <li className="px-3 py-2 text-sm text-gray-500">No results</li>
                    )}
                    {!loading &&
                        results.map((item) => (
                            <li
                                key={item.id ?? JSON.stringify(item)}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleClick(item)}
                            >
                                <div className="font-medium text-gray-900">{labelFn(item)}</div>
                                {subLabelFn && (
                                    <div className="text-xs text-gray-500">{subLabelFn(item)}</div>
                                )}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    )
}
