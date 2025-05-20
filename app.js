import express from 'express';
import bookingsRouter from './routes/bookings.js';
import userRouter from './routes/users.js';
import imagesRouter from './routes/images.js';
import priceRouter from './routes/price.js';
import workersRouter from './routes/workers.js';
import cors from 'cors';

const PORT = 4300;
const app = express();

app.use(cors({
    origin: true,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
}));
app.use(express.json());

app.use('/images', express.static('images')),
    app.use(
        workersRouter,
        priceRouter,
        bookingsRouter,
        imagesRouter,
        userRouter,
    );

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});