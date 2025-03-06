import express from 'express'
import { bookingsController } from '../controllers/bookings.js'
const bookingsRouter = express.Router()

//GET
bookingsRouter.get('/bookings', bookingsController.getAllBookings)
bookingsRouter.get('/bookings/:id', bookingsController.getOneBooking)
bookingsRouter.get('/bookings/lastBooking', bookingsController.getLastBooking)
bookingsRouter.get('/userbookings/:id', bookingsController.getUserBookings)

//POST
bookingsRouter.post('/bookings', bookingsController.postBooking)

//PUT
bookingsRouter.put('/bookings', bookingsController.putBooking)

//DELETE
bookingsRouter.delete('/bookings/:id', bookingsController.deleteBooking)
bookingsRouter.delete('/bookings', bookingsController.deleteAllBookings)

export default bookingsRouter