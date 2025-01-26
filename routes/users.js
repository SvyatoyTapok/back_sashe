import express from 'express'
import { userController } from '../controllers/users.js'
const userRouter = express.Router()

userRouter.get('/users', userController.getAllUsers)
userRouter.get('/users/:id', userController.getOneUser)
userRouter.post('/users', userController.postUser)
userRouter.put('/users/:id', userController.putUser)
userRouter.delete('/users/:id', userController.deleteUser)
userRouter.delete('/users', userController.deleteAllUsers)

export default userRouter