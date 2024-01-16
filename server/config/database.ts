import pg from 'pg'
import './dotenv.js'

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT!),
    database: process.env.PGDATABASE

    // user: "postgres",
    // password: "E3bG*F244GC6FgDA133-EEeg4EbcD2*4",
    // host: "roundhouse.proxy.rlwy.net",
    // port: 50620,
    // database: "railway"
}

export const pool = new pg.Pool(config)