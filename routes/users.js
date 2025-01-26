import express from 'express'
import db from '../db/db.js'
const userRouter = express.Router()

//POST ONE USER
userRouter.post('/users', async (request, response) => {
    try {
        const { rows } = await db.query(`INSERT INTO users (first_name,second_name,phone) VALUES ($1,$2,$3) RETURNING *`,
            [request.query.first_name, request.query.second_name, request.query.phone])
        response.send(rows[0])
    } catch (e) {
        response.status(409)
        response.send(`${e.detail}`)
    }
})

//PATCH USER BY ID
userRouter.patch('/user/:id', async (request, response) => {
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
})

//GET ONE USER BY ID
userRouter.get('/user/:id', async (request, response) => {
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
})

//GET ALL USERS
userRouter.get('/users', async (_, response) => {
    try {
        const { rows } = await db.query('SELECT * FROM users')
        response.send(rows)
    } catch (e) {
        response.send(e)
    }
})

//DELETE USER BY ID
userRouter.delete('/user/:id', async (request, response) => {
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
        response.send(e)
    }
})

//DELETE ALL USERS
userRouter.delete('/users', async (_, response) => {
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
})

export default userRouter