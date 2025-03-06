import db from '../db/db.js'

//GET ALL PRICES
const getPrices = async (_, response) => {
    try {
        const { rows } = await db.query('SELECT * FROM price')
        response.send(rows)
    } catch (e) {
        response.status(400),
            response.send(e)
    }
}

//GET ONE PRICE
const getOnePrice = async (request, response) => {
    try {
        const { rows } = await db.query('SELECT * FROM price WHERE id = $1', [request.params.id])
        if (rows.length === 0) {
            response.status(404)
            response.send(`Not found price with id = ${request.params.id}`)
        } else {
            response.send(rows[0])
        }
    } catch (e) {
        response.status(500)
        response.send(e)
    }
}

//GET ALL PRICES BY TYPE
const getByType = async (request, response) => {
    try {
        const dbres = await db.query('SELECT * FROM price WHERE price_type = $1', [request.params.type])
        response.send(dbres.rows)

    } catch (e) {
        response.status(400)
        response.send(e)

    }
}


//POST PRICE
const postPrice = async (request, response) => {
    try {
        const { rows } = await db.query('INSERT INTO price (name,cost,price_type) VALUES ($1,$2,$3) RETURNING *', [request.query.name, request.query.cost, request.query.price_type])
        response.send(rows[0])
    } catch (e) {
        response.status(400)
        e.detail ? response.send(e.detail) :
            response.send(e)
    }
}

//PUT PRICE
const putPrice = async (request, response) => {
    try {
        const { rows } = await db.query('UPDATE price SET name = $1, cost = $2 WHERE id = $3 RETURNING *', [request.query.name, request.query.cost, request.query.id])
        response.send(rows[0])
    } catch (e) {
        response.status(400)
        response.send(e.detail)
    }
}

//DELETE ONE PRICE
const deleteOnePrice = async (request, response) => {
    try {
        const { rows } = await db.query('DELETE FROM price WHERE id = $1 RETURNING *', [request.params.id])
        if (rows.length === 0) {
            response.status(404)
            response.send(`Not found id = ${request.params.id}`)
        } else {
            response.send(rows[0])
        }
    } catch (e) {
        response.status(500)
        response.send(e)
    }
}

//DELETE ALL PRICES
const deletePrices = async (_, response) => {
    try {
        const { rows } = await db.query('DELETE FROM price')
        response.send(rows)
    } catch (e) {
        response.status(400)
        response.send(e)
    }
}

export const priceController = {
    getPrices,
    getOnePrice,
    postPrice,
    putPrice,
    deletePrices,
    deleteOnePrice,
    getByType
}