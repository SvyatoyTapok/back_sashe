import express from 'express'
import bookingsRouter from './routes/bookings.js';
import userRouter from './routes/users.js';
import imagesRouter from './routes/images.js'

const PORT = 4300
const app = express()

app.use('/images', express.static('images'))
app.use(imagesRouter)

app.use(bookingsRouter)
app.use(userRouter)


app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`)
})