import db from '../db/db.js'

//GET ALL USERS
const getAllUsers = async (_, response) => {
    try {
        const { rows } = await db.query('SELECT * FROM users')
        response.send(rows)
    } catch (e) {
        response.send(e)
    }
}

//GET ONE USER
const getOneUser = async (request, response) => {
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [request.params.id])
        if (rows.length === 0) {
            response.status(404)
            response.send(`Not found this id${rows}`)
        } else {
            response.send(rows[0])
        }
    } catch (e) {
        response.send(e)
    }
}

//POST USER
const postUser = async (request, response) => {
    try {
        const { rows } = await db.query(`INSERT INTO users (first_name,second_name,phone) VALUES ($1,$2,$3) RETURNING *`,
            [request.query.first_name, request.query.second_name, request.query.phone])
        response.send(rows[0])
    } catch (e) {
        response.status(409)
        response.send(`${e.detail}`)
    }
}

//PUT USER BY ID
const putUser = async (request, response) => {
    try {
        const dbresponse = await db.query('UPDATE users SET first_name = $1, second_name = $2, phone = $3 WHERE id = $4 RETURNING *',
            [request.query.first_name, request.query.second_name, request.query.phone, request.params.id])
        if (dbresponse.rowCount === 1) {
            response.send(dbresponse.rows[0])
        } else {
            response.status(409)
            response.send(`Not found ID = ${request.params.id}`)
        }
    } catch (e) {
        response.send(e)
    }
}

//DELETE USER BY ID
const deleteUser = async (request, response) => {
    try {
        const dbresponse = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [request.params.id])
        if (dbresponse.rowCount === 1) {
            response.status(200)
            response.send(dbresponse.rows[0])
        } else {
            response.status(404)
            response.send(`Not found id ${request.params.id}`)
        }
    } catch (e) {
        response.status(409)
        response.send(e.detail)
    }
}

//DELETE ALL USERS
const deleteAllUsers = async (_, response) => {
    try {
        const { rowCount } = await db.query('DELETE from users')
        if (rowCount === 0) {
            response.send('Users table is already empty')
        } else {
            response.send('All users was deleted succesfully')
        }
    } catch (e) {
        response.status(409)
        response.send(e.detail)
    }
}
export const userController = {
    getAllUsers,
    getOneUser,
    postUser,
    putUser,
    deleteUser,
    deleteAllUsers,
}