const express = require('express');
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const tokenController = require('../controllers/tokenController');
const Likes = require('../models/Likes')
const Saved = require('../models/Saved')
const  CommentAnswer  = require('../models/CommentAwnser'); 
const router = express.Router();
const postController = require('../controllers/postController')
const { User, Post, Comment
} = require('../models/relations')
const CommentLikes = require('../models/CommentLikes')
const CommentDislikes = require('../models/CommentDislikes')
const CommentAwnsersLikes = require('../models/CommentAwnsersLikes')
const CommentAwnsersDislikes = require('../models/CommentAwnsersDislikes');
const sequelize = require('../config/database');
const cloudinary = require('../config/cloudinary')
const { formidable } = require('formidable'); 
const { uploadImage, uploadVideo } = require('../config/cloudinary');

router.post('/createPost', async (req, res) => {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: 'Error al procesar el formulario' });
        }

        console.log(`form fields: ${JSON.stringify(fields)}, files: ${JSON.stringify(files)}`);

        try {
            const jwt = req.cookies.jwt;
            const decoded = await tokenController.verifyJwtToken(jwt);
            console.log('Usuario decodificado del JWT: ', decoded);

            const user_id = decoded.user_id;
            const user_name = decoded.username;
            const user_img = decoded.user_picture;

            let postPictureUrl = null;
            let videoSourceUrl = null;

            if (files.postPicture && files.postPicture[0].filepath) {
                console.log('Subiendo imagen desde:', files.postPicture[0].filepath);
                const uploadResult = await uploadImage(files.postPicture[0].filepath);
                postPictureUrl = uploadResult.secure_url;
            } else {
                console.log('No se ha enviado una imagen');
            }

            if (files.videoSource && files.videoSource[0].filepath) {
                console.log('Subiendo video desde:', files.videoSource[0].filepath);
                const uploadResult = await uploadVideo(files.videoSource[0].filepath);
                videoSourceUrl = uploadResult.secure_url;
            } else {
                console.log('No se ha enviado un video');
            }

            // Normaliza los campos de entrada
            const normalizedFields = {};
            for (const key in fields) {
                // Si el campo es un array, toma el primer elemento, de lo contrario, lo deja como está
                normalizedFields[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
            }

            // Llama a createPost con los campos normalizados
            await postController.createPost(
                normalizedFields, 
                decoded, 
                user_id, 
                user_name, 
                user_img, 
                postPictureUrl, 
                videoSourceUrl
            );

            return res.status(201).json({ detail: 'Your post has been sent sucesfuly' });

        } catch (e) {
            console.error('Error al crear la publicación:', e);
            return res.status(500).json({ error: e.message });
        }
    });
});



router.post('/destroy_post', async (req, res) => {
    try {
        
        const jwtToken = req.cookies.jwt 
        const deletedPost = await postController.deletePost(req.body.post_id, jwtToken)
        if(deletedPost) {
            return res.status(201).json({
                post: deletedPost
            })
        } else {
            return res.status(500).json({
                error: "Internal Server Error"
            })
        }
        
    }catch(e) {
        console.log(e)
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
})


router.get('/posts', async (req, res) => {
    try {
        const data = await postController.serveHomePage(req.cookies.jwt)
        return res.status(200).json({
            posts: data.posts,
            users: data.randomUsers
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: e});
    }
});

router.get('/post/:post_id', async (req, res) => {
    const post_id = req.params.post_id;
    try {
        
       const post = await postController.findPost(post_id)
        
        return res.status(200).json({ post });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});


router.get('/post_user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const posts = await Post.findAll({ where: { userId } });
    return res.status(200).json({ posts });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
});







module.exports = router;
