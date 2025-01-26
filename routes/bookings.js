import express from 'express'
import { bookingsController } from '../controllers/bookings.js'
const bookingsRouter = express.Router()

bookingsRouter.get('/bookings', bookingsController.getAllBookings)
bookingsRouter.get('/userbookings/:id', bookingsController.getUserBookings)
bookingsRouter.post('/bookings', bookingsController.postBooking)
bookingsRouter.put('/booking/:id', bookingsController.putBooking)
bookingsRouter.delete('/booking/:id', bookingsController.deleteBooking)
bookingsRouter.delete('/bookings', bookingsController.deleteAllBookings)

export default bookingsRouter