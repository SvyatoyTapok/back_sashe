import express from 'express'
import userRouter from './routes/users.js';
import bookingsRouter from './routes/bookings.js';

const PORT = 4300
const app = express()

app.use(userRouter)
app.use(bookingsRouter)

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`)
})