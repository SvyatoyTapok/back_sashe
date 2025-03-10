import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const determineFilename = (req) => {
    if (req.path.includes('/big')) {
        return 'big.jpg';
    } else if (req.path.includes('/small')) {
        return 'small.jpg';
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../images');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, determineFilename(req));
    }
});
const storageGallery = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join('images/gallery');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadGallery = multer({ storage: storageGallery });
const upload = multer({ storage: storage });

// GET IMAGE
const getImage = (req, res) => {
    fs.readdir(path.join(__dirname, 'images'), (err, files) => {
        if (err) {
            return res.status(500).send('Ошибка при чтении папки');
        }
        res.send(files);
    });
};

// GET ALL GALLERY IMAGES
const getAllGallery = (req, res) => {
    const galleryPath = path.join('images/gallery');

    fs.readdir(galleryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Ошибка при чтении папки Gallery');
        }
        res.send(files);
    });
};

// POST IMAGE
const postImage = (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send('Success');
    });
};

//POST GALLERY IMAGE
const postGalleryImage = (req, res) => {
    uploadGallery.single('file')(req, res, (err) => {
        if (err) {
            return res.status(500).send(`Ошибка загрузки файла: ${err.message}`);
        }
        res.send(`Файл успешно загружен в images/gallery`);
    });
};

// DELETE ONE GALLERY IMAGE
const deleteOneGallery = (req, res) => {
    const filePath = path.join('images/gallery', req.params.name);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send(`Файл ${req.params.name} не найден`);
        }
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).send('Ошибка при удалении файла');
            }
            res.send(`Удалено: ${req.params.name}`);
        });
    });
};

// DELETE IMAGE
const deleteImage = (req, res) => {
    const filePath = path.join(__dirname, '../images', req.params.name);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send(`Файл ${req.params.name} не найден`);
        }

        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).send('Ошибка при удалении файла');
            }
            res.send(`Удалено: ${req.params.name}`);
        });
    });
};

//POST BIG IMAGE
const postBigImage = (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(500).send(`Ошибка загрузки файла: ${err.message}`);
        }
        res.send(`Файл сохранён как big.jpg`);
    });
};

const postSmallImage = (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(500).send(`Ошибка загрузки файла: ${err.message}`);
        }
        res.send(`Файл сохранён как small.jpg`);
    });
};

export const imagesController = {
    getImage,
    postImage,
    deleteImage,
    getAllGallery,
    deleteOneGallery,
    postGalleryImage,
    postBigImage,
    postSmallImage,
};