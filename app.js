import express from 'express';
import bookingsRouter from './routes/bookings.js';
import userRouter from './routes/users.js';
import imagesRouter from './routes/images.js';
import priceRouter from './routes/price.js';
import workersRouter from './routes/workers.js';
import cors from 'cors';

const PORT = 4300;
const app = express();
const __dirname = path.resolve();

app.use(cors({
    origin: 'https://sashestudio.ru',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use('/images/gallery', express.static(path.join(__dirname, 'images', 'gallery'), { redirect: false })); app.use(express.json());

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