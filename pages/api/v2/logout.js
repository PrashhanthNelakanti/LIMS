// pages/api/logout.js
import { Pool } from 'pg'

// Initialize PostgreSQL pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
})

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res
            .status(405)
            .json({ success: false, message: 'Method not allowed' })
    }
    const { email, purpose } = req.body

    // Validate request payload
    if (!email || purpose !== 'logout') {
        return res
            .status(400)
            .json({ success: false, message: 'Invalid request payload' })
    }

    try {
        // (Optional) mark user as inactive in DB
        // If you have an 'isloggedin' or session table, clear it here.
        // For example, if you have an 'is_active' flag:


        // Return success
        return res
            .status(200)
            .json({ success: true, message: 'Logout successful' })
    } catch (error) {
        console.error('Logout error:', error)
        return res
            .status(500)
            .json({ success: false, message: 'Server error' })
    }
}
