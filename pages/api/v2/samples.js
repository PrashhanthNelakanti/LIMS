// pages/api/samples.js
import { Pool } from 'pg'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
})

export default async function handler(req, res) {
    try {
        const { method, body } = req

        if (method === 'POST') {
            const {
                sample_id,
                sample_name,
                source_type,
                collection_date,
                prep_protocol,
                storage_conditions,
                attachments
            } = body

            if (!sample_id || !sample_name) {
                return res.status(400).json({ success: false, message: '`sample_id` and `sample_name` are required' })
            }

            const insertQuery = `
                INSERT INTO samples
                    (sample_id, sample_name, source_type, collection_date, prep_protocol, storage_conditions, attachments)
                VALUES
                    ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *
            `

            const values = [
                sample_id,
                sample_name,
                source_type || null,
                collection_date || null,
                prep_protocol || null,
                storage_conditions || null,
                attachments || null
            ]

            const { rows } = await pool.query(insertQuery, values)
            return res.status(201).json({ success: true, sample: rows[0] })
        }

        if (method === 'GET') {
            const { rows } = await pool.query(
                'SELECT *, created_at AT TIME ZONE \'UTC\' AS created_at_utc FROM samples ORDER BY created_at DESC'
            )
            return res.json({ success: true, samples: rows })
        }

        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    } catch (error) {
        console.error('API /samples error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}
