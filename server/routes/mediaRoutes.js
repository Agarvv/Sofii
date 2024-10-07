const express = require('express')
const router = express.Router() 
const multer = require('multer');
const path = require('path');
const cloudinary = require('../config/cloudinary')
const { formidable } = require('formidable'); 
const { uploadImage, uploadVideo } = require('../config/cloudinary');


router.post('/upload_media', (req, res) => {
    try {
        const form = formidable({ multiples: false })
        
        form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: 'while processing form' });
        }
     }
     console.log('files', files)
     
     if (files.postPicture && files.postPicture[0].filepath) {
                console.log('Subiendo imagen desde:', files.postPicture[0].filepath);
                const uploadResult = await uploadImage(files.postPicture[0].filepath);
                postPictureUrl = uploadResult.secure_url;
            } else {
                console.log('No se ha enviado una imagen');
            }
     
     
     
     if(files.image && files.image[0].filepath) {
         const uploadRes = await uploadImage(files.image[0].filepath)
         return res.status(200).json({
             filepath: uploadRes.secure_url
         })
     } else if(files.video && files.video[0].filepath) {
         const uploadRes = await uploadVideo(files.video[0].filepath)
         return res.status(200).json({
             filepath: uploadRes.secure_url
         })
     } 
         
    

        
    } catch(e) {
        console.log('Error:', e);
        return res.status(500).json({
            error: "internal_server_error"
        });
    }
});




module.exports = router 