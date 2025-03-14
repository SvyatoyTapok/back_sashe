import express from 'express'
import { workersController } from '../controllers/workers.js'
const workersRouter = express.Router()

workersRouter.get('/workers', workersController.getWorkers)

export default workersRouter