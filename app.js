import express from 'express'
import userRouter from './routes/users.js';
const app = express();

app.use(userRouter)

app.listen(4300, () => {
    console.log(`Server is started on port 4300`)
})