
import { Pool } from 'pg';
import * as process from "process";


export const pool = new Pool({
    host: process.env.dbHost,
    port: Number(process.env.dbPort),
    database:  process.env.dbDatabase,
    user:  process.env.dbUser,
    password: process.env.dbPassword,
    ssl: true
})
