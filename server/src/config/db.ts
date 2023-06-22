
import { Pool } from 'pg';
import * as process from "process";


export const pool = new Pool({
    host: 'dpg-ci6c8fenqql3q38fpi50-a.oregon-postgres.render.com',
    port: 5432,
    database:  'goat_7pgz',
    user:  'root',
    password: 'PzWvgXASmHW8VS7kFRcQVJ42BzY776By',
    ssl: true
})
// postgres://root:PzWvgXASmHW8VS7kFRcQVJ42BzY776By@dpg-ci6c8fenqql3q38fpi50-a.oregon-postgres.render.com/goat_7pgz