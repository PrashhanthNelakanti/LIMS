import { Pool } from 'pg'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
})

export default async function handler(req, res) {
    const client = await pool.connect();
    try {
        const { method, body } = req;
        if (method === 'GET') {
            const result = await client.query('SELECT id, fname,email, islocked FROM users');
            return res.json({ doc: result.rows, message: 'All users fetched', success: true });
        }

        if (method === 'POST') {
            const { fname, email, password } = body;
            if (!email) return res.status(400).json({ message: 'Email required', success: false });

            const exists = await client.query('SELECT 1 FROM users WHERE email = $1', [email]);
            if (exists.rowCount > 0) {
                return res.json({ message: 'User already exists', success: false });
            }
            console.log(body,"user created")

            await client.query(
                'INSERT INTO users(fname,email,password, islocked) VALUES($1, $2, $3,$4)',
                [fname, email,password ,false]
            );



            return res.json({ message: 'User added successfully', success: true });
        }

        if (method === 'DELETE') {
            const { id } = body;
            await client.query('DELETE FROM users WHERE id = $1', [id]);
            return res.json({ message: 'User deleted', success: true });
        }

        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    } finally {
        client.release();
    }
}