import pg from 'pg'
const { Pool } = pg
const db = new Pool({
    user: 'user',
    password: '57k5179',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
})
export default db