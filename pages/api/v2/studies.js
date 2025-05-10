// pages/api/studies.js
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
                study_name,
                description,
                department_name,
                sample_id,
                sample_name,
                lab,
                bio_material_id,
                created_by
            } = body

            // Basic validation
            if (!study_name || !created_by) {
                return res
                    .status(400)
                    .json({ success: false, message: '`study_name` and `created_by` are required' })
            }

            const insertQuery = `
        INSERT INTO studies
          (study_name, description, department_name, sample_id, sample_name, lab, bio_material_id, created_by)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `
            const values = [
                study_name,
                description || null,
                department_name || null,
                sample_id || null,
                sample_name || null,
                lab || null,
                bio_material_id || null,
                created_by
            ]

            const { rows } = await pool.query(insertQuery, values)
            return res.status(201).json({ success: true, study: rows[0] })
        }

        if (method === 'GET') {
            const { rows } = await pool.query(
                'SELECT *, created_at AT TIME ZONE \'UTC\' AS created_at_utc FROM studies ORDER BY created_at DESC'
            )
            return res.json({ success: true, studies: rows })
        }

        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    } catch (error) {
        console.error('API /studies error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}
