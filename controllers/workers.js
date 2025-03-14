import db from '../db/db.js'

const getWorkers = async (_, response) => {
    try {
        const { rows } = await db.query('SELECT * FROM workers')
        response.send(rows)
    } catch (e) {
        response.status(400)
        response.send(e)
    }
}

export const workersController = {
    getWorkers,
};