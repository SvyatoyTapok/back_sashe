import express from 'express'
import { imagesController } from '../controllers/images.js';
const imagesRouter = express.Router()

imagesRouter.get('/images/gallery', imagesController.getAllGallery)
imagesRouter.delete('/images/gallery/:name', imagesController.deleteOneGallery)
imagesRouter.post('/images/gallery', imagesController.postGalleryImage)
imagesRouter.post('/images/small', imagesController.postSmallImage)
imagesRouter.post('/images/big', imagesController.postBigImage)
imagesRouter.get('/images', imagesController.getImage)
imagesRouter.post('/images', imagesController.postImage)
imagesRouter.delete('/images/:name', imagesController.deleteImage)

export default imagesRouter