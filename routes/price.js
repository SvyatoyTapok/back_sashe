import express from 'express'
import { priceController } from '../controllers/price.js'
const priceRouter = express.Router()

priceRouter.get('/prices', priceController.getPrices)
priceRouter.get('/prices/:id', priceController.getOnePrice)
priceRouter.get('/prices/type/:type', priceController.getByType)
priceRouter.post('/prices', priceController.postPrice)
priceRouter.put('/prices', priceController.putPrice)
priceRouter.delete('/prices/:id', priceController.deleteOnePrice)
priceRouter.delete('/prices', priceController.deletePrices)

export default priceRouter