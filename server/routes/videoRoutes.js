const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const videoController = require('../controllers/videoController');
const videoService = require('../services/videoService');
const { body } = require('express-validator')
const cloudinary = require('../config/cloudinary')
const { formidable } = require('formidable'); 
const { uploadVideo } = require('../config/cloudinary');


router.post('/add_video', async (req, res) => {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: 'Error al procesar el formulario' });
        }

        console.log(`form fields: ${JSON.stringify(fields)}, files: ${JSON.stringify(files)}`);
        
        let videoUrl; 
       
        if (files.video && files.video[0].filepath) {
            console.log('Hay un video, subiéndolo:', files.video[0].filepath);
            const uploadResult = await uploadVideo(files.video[0].filepath);
            videoUrl = uploadResult.secure_url; 
        } else {
            return res.status(400).json({ error: 'no video'});
        }

    
        const normalized = {};
        for (const key in fields) {
            normalized[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
        }

     
        const jwt_token = req.cookies.jwt || req.headers['authorization'];

     
        await videoController.handleVideoCreation(jwt_token, videoUrl, normalized);

        return res.status(201).json({ detail: 'Video Received.' });
    });
});




router.get('/videos', async (req, res) => {
    try {
        const videos = await videoService.getVideos(req.cookies.jwt);
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


router.post('/destroy_video', [
    body("video_id").isNumeric().withMessage('The Video Id Should Be An Number, Not An Text String')
    ], async (req, res) => {
    try {
        const jwtToken = req.cookies.jwt 
        const deletedVideo = await videoController.deleteVideo(req.body.video_id, jwtToken)
        return deletedVideo
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

router.get('/video/:video_id', async (req, res) => {
    try {
       const videoId = req.params.video_id 
       
       const video =  await videoController.findVideoById(videoId)
        
        return res.status(201).json({video: video})
        
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: e.message})
    }
})

module.exports = router;