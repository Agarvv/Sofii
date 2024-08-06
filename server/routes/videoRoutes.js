const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const videoController = require('../controllers/videoController');
const videoService = require('../services/videoService');
const multer = require('multer');

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'media/videos'); // Carpeta de destino
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname); // Nombre del archivo
    }
});

const upload = multer({ storage: storage });

// Rutas
router.get('/videos', async (req, res) => {
    try {
        const videos = await videoService.getVideos();
        if (videos.length == 0) {
            return res.status(404).json({
                detail: "We dont have still videos, Post One!"
            });
        }
        return res.status(201).json({ videos: videos });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e });
    }
});

router.post('/add_video', upload.single('video'), async (req, res) => {
    try {
        console.log('Video path', req.file.path);
        console.log('Video: ', req.file);

        const jwt_token = req.cookies.jwt;
        if (!jwt_token) {
            return res.status(404).json({ detail: 'Your session is invalid, try logging in' });
        }

        await videoController.handleVideoCreation(jwt_token, req.file, req.body);

        return res.status(201).json({ detail: 'Video posted successfully !' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e });
    }
});

router.get('/video/:video_id', async (req, res) => {
    try {
       const videoId = req.params.video_id 
       
       const video =  await videoController.findVideoById(videoId)
        
        return res.status(201).json({video: video})
        
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: e})
    }
})

module.exports = router;