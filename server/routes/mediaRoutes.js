const express = require('express')
const router = express.Router() 
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, 'media/images/');
        } else if (file.mimetype.startsWith('video/')) {
            cb(null, 'media/videos/');
        } else if (file.mimetype.startsWith('audio/')) {
            cb(null, 'media/audio/');
        } else {
            cb(new Error('Not Supported File'), false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;








router.post('/upload_media', upload.single('file'), (req, res) => {
    console.log('headers', req.headers); // Aquí se muestra si el servidor recibe correctamente los headers
    try {
        console.log('Endpoint upload called, file received:', req.file); // Debes ver detalles del archivo
        if(req.file) {
            return res.status(201).json({
                path: req.file.path
            });
        } else {
            return res.status(400).json({
                error: "No file received"
            });
        }
    } catch(e) {
        console.log('Error:', e);
        return res.status(500).json({
            error: "internal_server_error"
        });
    }
});




module.exports = router 