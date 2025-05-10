const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    connectionString: "postgres://default:xuB5kDZG8Rov@ep-broad-wind-722483-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
})