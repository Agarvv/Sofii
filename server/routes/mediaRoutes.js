const express = require('express')
const router = express.Router() 
const multer = require('multer');
const path = require('path');
const cloudinary = require('../config/cloudinary')
const { formidable } = require('formidable'); 
const { uploadImage, uploadVideo, uploadAudio } = require('../config/cloudinary');


router.post('/upload_media', (req, res) => {
    try {
        const form = formidable({ multiples: false })
        
        form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: 'while processing form' });
        }
     }
     
     if(files.)
        
        

        
    } catch(e) {
        console.log('Error:', e);
        return res.status(500).json({
            error: "internal_server_error"
        });
    }
});




module.exports = router 