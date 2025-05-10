// pages/api/patients.js
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
                patient_id,
                patient_name,
                age,
                gender,
                dob,
                diagnosis,
                treatment,
                notes,
                created_by
            } = body
            // Basic validation
            if (!patient_id || !patient_name || !created_by) {
                return res.status(400).json({
                    success: false,
                    message: '`patient_id`, `patient_name`, and `created_by` are required'
                })
            }

            const insertQuery = `
                INSERT INTO patients
                  (patient_id, patient_name, age, gender, dob, diagnosis, treatment, notes, created_by)
                VALUES
                  ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING *
            `
            const values = [
                patient_id,
                patient_name,
                age || null,
                gender || null,
                dob || null,
                diagnosis || null,
                treatment || null,
                notes || null,
                created_by
            ]

            const { rows } = await pool.query(insertQuery, values)
            return res.status(201).json({ success: true, patient: rows[0] })
        }

        if (method === 'GET') {
            const { rows } = await pool.query(
                `SELECT *, created_at AT TIME ZONE 'UTC' AS created_at_utc FROM patients ORDER BY created_at DESC`
            )
            return res.json({ success: true, patients: rows })
        }

        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    } catch (error) {
        console.error('API /patients error:', error)
        res.status(500).json({ success: false, message: error.message })
    }
}
