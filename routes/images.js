import express from 'express'
import { imagesController } from '../controllers/images.js';
const imagesRouter = express.Router()

imagesRouter.get('/images', imagesController.getImage)
imagesRouter.post('/images', imagesController.postImage)
imagesRouter.delete('/images/:name', imagesController.deleteImage)

export default imagesRouter