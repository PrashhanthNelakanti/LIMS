import { Pool } from 'pg'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
})

// Simple query wrapper
async function query(text, params) {
    const client = await pool.connect();
    try {
        const res = await client.query(text, params);
        return res;
    } finally {
        client.release();
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { entityName, fields } = req.body;
    const user = req.headers['x-user'] || 'unknown';
    const timestamp = new Date().toISOString();

    if (
        !entityName ||
        typeof entityName !== 'string' ||
        !Array.isArray(fields) ||
        fields.length === 0 ||
        fields.some(f => !f.name || !f.type)
    ) {
        return res.status(400).json({ error: 'Invalid entity data' });
    }

    const sanitizedEntityName = entityName.replace(/[^a-zA-Z0-9_]/g, '');
    const columnDefs = fields
        .map(field => `"${field.name}" ${field.type}`)
        .join(', ');
    const createTableSQL = `CREATE TABLE IF NOT EXISTS "${sanitizedEntityName}" (id SERIAL PRIMARY KEY, ${columnDefs});`;

    try {
        await query(createTableSQL);

        await query(
            `INSERT INTO audit_log (action, username, target, payload, created_at)
             VALUES ($1, $2, $3, $4, $5)`,
            ['CREATE_ENTITY', user, sanitizedEntityName, JSON.stringify(fields), timestamp]
        );

        res.status(200).json({ message: 'Entity created successfully' });
    } catch (error) {
        console.error('Error creating entity:', error);
        res.status(500).json({ error: 'Failed to create entity' });
    }
}
