import express from 'express';
import bookingsRouter from './routes/bookings.js';
import userRouter from './routes/users.js';
import imagesRouter from './routes/images.js';
import priceRouter from './routes/price.js';
import workersRouter from './routes/workers.js';
import cors from 'cors';
import path from 'path';

const PORT = 4300;
const app = express();
const __dirname = path.resolve();

const allowedOrigins = ['https://sashestudio.ru', 'https://www.sashestudio.ru'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

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