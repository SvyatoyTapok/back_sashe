import express from 'express'
import { bookingsController } from '../controllers/bookings.js'
const bookingsRouter = express.Router()

bookingsRouter.get('/bookings', bookingsController.getAllBookings)
bookingsRouter.get('/bookings/:id', bookingsController.getOneBooking)
bookingsRouter.get('/userbookings/:id', bookingsController.getUserBookings)
bookingsRouter.post('/bookings', bookingsController.postBooking)
bookingsRouter.put('/bookings', bookingsController.putBooking)
bookingsRouter.delete('/bookings/:id', bookingsController.deleteBooking)
bookingsRouter.delete('/bookings', bookingsController.deleteAllBookings)

export default bookingsRouter