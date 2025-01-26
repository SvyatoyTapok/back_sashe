import express from 'express'
import fs from 'fs'
import multer from 'multer';
const imagesRouter = express.Router()

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, 'images')
    },
    filename: function (request, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

//POST IMAGE
imagesRouter.post('/images', upload.single('file'), (_, response) => {
    response.send('Success')
})

//GET IMAGE
imagesRouter.get('/images', (_, response) => {
    fs.readdir('./images', (_, files) => {
        response.send(files)
    })
})

//DELETE IMAGE
imagesRouter.delete('/images/:name', (request, response) => {
    if (fs.existsSync(`./images/${request.params.name}`)) {
        fs.rm(`./images/${request.params.name}`, () => {
            response.send(`Deleted ${request.params.name}`)
        })
    } else {
        response.status(404)
        response.send(`Not found file ${request.params.name}`)
    }
})
export default imagesRouter