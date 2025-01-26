import express from 'express'
import { userController } from '../controllers/users.js'
const userRouter = express.Router()

userRouter.get('/users', userController.getAllUsers)
userRouter.get('/user/:id', userController.getOneUser)
userRouter.post('/users', userController.postUser)
userRouter.put('/users/:id', userController.putUser)
userRouter.delete('/user/:id', userController.deleteUser)
userRouter.delete('/users', userController.deleteAllUsers)

export default userRouter