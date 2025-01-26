import express from 'express'
import bookingsRouter from './routes/bookings.js';
import userRouter from './routes/users.js';

const PORT = 4300
const app = express()

app.use(bookingsRouter)
app.use(userRouter)

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`)
})