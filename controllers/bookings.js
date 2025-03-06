import db from '../db/db.js'

//GET ALL BOOKINGS
const getAllBookings = async (_, response) => {
    try {
        const { rows } = await db.query('SELECT * FROM bookings')
        response.send(rows)
    } catch (e) {
        response.send(e)
    }
}

//GET LAST BOOKING
const getLastBooking = async (_, response) => {
    try {
        const dbresponse = await db.query('SELECT MAX(id) AS last_id FROM bookings')
        response.send(dbresponse)
    } catch (e) {
        response.send(e)
    }
}

//GET ONE BOOKING BY BOOKING ID
const getOneBooking = async (request, response) => {
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
        response.status(400)
        response.send(e.detail)
    }
}

//GET ALL BOOKINGS BY USER_ID
const getUserBookings = async (request, response) => {
    try {
        const dbresponse = await db.query('SELECT * FROM bookings WHERE user_id = $1', [request.params.id])
        if (dbresponse.rowCount === 0) {
            response.status(404)
            response.send(`Not found bookings by user_id = ${request.params.id}`)
        } else {
            response.send(dbresponse.rows)
        }
    } catch (e) {
        response.send(e)
    }
}

//POST BOOKING
const postBooking = async (request, response) => {
    try {
        const dbresponse = await db.query('INSERT INTO bookings (id,name,time,user_id) VALUES ($1,$2,$3,$4) RETURNING *',
            [request.query.id, request.query.name, request.query.time, request.query.user_id])
        response.send(dbresponse.rows[0])
    } catch (e) {
        response.status(400)
        response.send(e)
    }
}

//PUT BOOKING
const putBooking = async (request, response) => {
    try {
        const dbresponse = await db.query('UPDATE bookings SET name = $1, time = $2, user_id = $3 WHERE id = $4 RETURNING *',
            [request.query.name, request.query.time, request.query.user_id, request.query.id])
        if (dbresponse.rowCount === 0) {
            response.status(404)
            response.send(`Not found booking with id = ${request.query.id}`)
        } else {
            response.send(dbresponse.rows[0])
        }
    } catch (e) {
        response.status(400)
        response.send(e)
    }
}

//DELETE BOOKING BY BOOKING ID
const deleteBooking = async (request, response) => {
    try {
        const { rowCount } = await db.query('DELETE from bookings WHERE id = $1', [request.params.id])
        if (rowCount === 0) {
            response.status(404)
            response.send(`Booking with id = ${request.params.id} already deleted`)
        } else {
            response.send(`Booking with id = ${request.params.id} was deleted`)
        }
    } catch (e) {
        response.status(400)
        response.send(e.detail)
    }
}

//DELETE ALL BOOKINGS
const deleteAllBookings = async (_, response) => {
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
}

export const bookingsController = {
    getAllBookings,
    getOneBooking,
    getUserBookings,
    postBooking,
    putBooking,
    deleteBooking,
    deleteAllBookings,
    getLastBooking,
}