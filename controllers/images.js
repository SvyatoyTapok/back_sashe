import fs from 'fs'
import multer from 'multer';

//STORAGE CFG
const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, 'images')
    },
    filename: function (request, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

//GET IMAGE
const getImage = (_, response) => {
    fs.readdir('./images', (_, files) => {
        response.send(files)
    })
}

//POST IMAGE
const postImage = (request, response) => {
    upload.single('file')(request, response, (err) => {
        if (err) {
            return response.send(err);
        }
        response.send('Success');
    });
}

//DELETE IMAGE
const deleteImage = (request, response) => {
    if (fs.existsSync(`./images/${request.params.name}`)) {
        fs.rm(`./images/${request.params.name}`, () => {
            response.send(`Deleted ${request.params.name}`)
        })
    } else {
        response.status(404)
        response.send(`Not found file ${request.params.name}`)
    }
}

export const imagesController = {
    getImage,
    postImage,
    deleteImage
}