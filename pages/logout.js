// pages/logout.js
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

export default function LogoutPage() {
    const dispatch = useDispatch()
    const router = useRouter()
    const loggedIn = useSelector(state => state.auth?.isLogged) ?? false

    useEffect(() => {
        if (loggedIn) {
            // Dispatch logout action to reset auth state
            dispatch({ type: 'LOGOUT' })
        }
        sessionStorage.clear()
        // Redirect to login page
        router.replace('/login')
    }, [dispatch, loggedIn, router])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-lg font-medium">Logging you out…</p>
        </div>
    )
}
