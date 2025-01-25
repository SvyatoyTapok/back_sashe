import express, { response } from 'express'
import db from '../db/db.js'
const bookingsRouter = express.Router()

//GET ALL BOOKINGS
bookingsRouter.get('/bookings', async (_, response) => {
    try {
        const { rows } = await db.query('SELECT * FROM bookings')
        response.send(rows)
    } catch (e) {
        response.send(e)
    }
})

//GET ONE BOOKING BY BOOKING ID
bookingsRouter.get('/booking/:id', async (request, response) => {
    try {
        const dbresponse = await db.query(
            'SELECT * FROM bookings WHERE id = $1', [request.params.id])
        if (dbresponse.rowCount === 0) {
            response.status(404)
            response.send(`Not found booking with id = ${request.params.id}`)
        } else {
            response.send(dbresponse.rows[0])
        }
    } catch (e) {
        response.send(e)
    }
})

//GET ONE BOOKING BY USER_ID
bookingsRouter.get('/userbookings/:id', async (request, response) => {
    try {
        const dbresponse = await db.query('SELECT * FROM bookings WHERE user_id = $1', [request.params.id])
        if (dbresponse.rowCount === 0) {
            response.status(404)
            response.send(`Not found bookings by user_id = ${request.params.id}`)
        } else {
            response.send(dbresponse.rows[0])
        }
    } catch (e) {
        response.send(e)
    }
})

//POST BOOKING
bookingsRouter.post('/bookings', async (request, response) => {
    try {
        const { rows } = await db.query('INSERT INTO bookings (name,time,user_id) VALUES ($1,$2,$3) RETURNING id',
            [request.query.name, request.query.time, request.query.user_id])
        response.send({ ...rows[0], ...request.query })
    } catch (e) {
        response.send(e)
    }
})

//PATCH BOOKING
bookingsRouter.patch('/booking/:id', async (request, response) => {
    try {
        const { rowCount } = await db.query('UPDATE bookings SET name = $1, time = $2, user_id = $3 WHERE id = $4 RETURNING id',
            [request.query.name, request.query.time, request.query.user_id, request.params.id])
        if (rowCount === 0) {
            response.status(404)
            response.send(`Not found booking with id = ${request.params.id}`)
        } else {
            response.send({ ...request.params, ...request.query })
        }
    } catch (e) {
        response.send(e)
    }
})

//DELETE BOOKING BY BOOKING ID
bookingsRouter.delete('/booking/:id', async (request, response) => {
    try {
        const { rowCount } = await db.query('DELETE from bookings WHERE id = $1', [request.params.id])
        if (rowCount === 0) {
            response.status(404)
            response.send(`Booking with id = ${request.params.id} already deleted`)
        } else {
            response.send(`Booking with id = ${request.params.id} was deleted`)
        }
    } catch (e) {
        response.send(e.detail)
    }
})

//DELETE ALL BOOKINGS
bookingsRouter.delete('/bookings', async (_, response) => {
    try {
        const { rowCount } = await db.query('DELETE FROM bookings')
        if (rowCount === 0) {
            response.send('All bookings already deleted')
        } else {
            response.send('All bookings was deleted successfuly')
        }
    } catch (e) {
        response.send(e.detail)
    }
})

export default bookingsRouter