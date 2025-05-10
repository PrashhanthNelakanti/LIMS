// pages/api/login.js
import { Pool } from 'pg'

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

    const { email, password, purpose } = req.body
    if (!email || !password || purpose !== 'login') {
        return res
            .status(400)
            .json({ success: false, message: 'Invalid request payload' })
    }

    try {
        const { rows } = await pool.query(
            'SELECT id, fname, email, password, islocked FROM users WHERE email = $1',
            [email]
        )
        if (rows.length === 0) {
            return res
                .status(401)
                .json({ success: false, message: 'Authentication failed' })
        }

        const user = rows[0]
        if (user.islocked) {
            return res
                .status(403)
                .json({ success: false, message: 'User is locked' })
        }
        if (password !== user.password) {
            return res
                .status(401)
                .json({ success: false, message: 'Authentication failed' })
        }

        // Successful login
        const { id, fname, email: userEmail } = user
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: { id, fname, email: userEmail }
        })
    } catch (err) {
        console.error('Login error:', err)
        return res
            .status(500)
            .json({ success: false, message: 'Server error' })
    }
}
