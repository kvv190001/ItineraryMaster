import pg from 'pg'
import './dotenv.js'

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT!),
    database: process.env.PGDATABASE
}

export const pool = new pg.Pool(config)