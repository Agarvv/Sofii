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
const uploadImage = require('../config/cloudinary')
const formidable = require('formidable'); 


router.post('/createPost', async (req, res) => {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: 'Error al procesar el formulario.' });
        }

        try {
            const jwt = req.cookies.jwt;
            const decoded = await tokenController.verifyJwtToken(jwt);
            console.log('Decoded create post user: ', decoded);
            const user_id = decoded.user_id;
            const user_name = decoded.username;
            const user_img = decoded.user_picture;

            let postPictureUrl = null;
            if (files.postPicture) {
                const uploadResult = await cloudinary.uploader.upload(files.postPicture.path, {
                    folder: '/images', 
                });
                postPictureUrl = uploadResult.secure_url; 
            }

            
            let videoSourceUrl = null;
            if (files.videoSource) {
                const uploadResult = await cloudinary.uploader.upload(files.videoSource.path, {
                    folder: '/videos',
                    resource_type: 'video', 
                });
                videoSourceUrl = uploadResult.secure_url; 
            }

            await postController.createPost(fields, decoded, user_id, user_name, user_img, postPictureUrl, videoSourceUrl);

            return res.status(201).json({ detail: 'Your Post Has Been Submitted To Our System.' });
        } catch (e) {
            console.log(e);
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
