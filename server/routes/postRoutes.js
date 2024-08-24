const express = require('express');
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const createPostController = require('../controllers/createPostController');
const tokenController = require('../controllers/tokenController');
const Likes = require('../models/Likes')
const Saved = require('../models/Saved')
const  CommentAnswer  = require('../models/CommentAwnser'); // Importa el
const router = express.Router();
const postController = require('../controllers/postController')
const { User, Post, Comment
} = require('../models/relations')
const CommentLikes = require('../models/CommentLikes')
const CommentDislikes = require('../models/CommentDislikes')
const CommentAwnsersLikes = require('../models/CommentAwnsersLikes')
const CommentAwnsersDislikes = require('../models/CommentAwnsersDislikes')



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'media/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Configurar Multer para aceptar múltiples campos con diferentes nombres
const upload = multer({ storage }).fields([
  { name: 'postPicture', maxCount: 1 },
  { name: 'videoSource', maxCount: 1 }
]);

// Ruta para crear un post
router.post('/createPost', upload, [
    body("description").escape().trim(),
    body("privatePost").isBoolean(),
    body("only_friends").isBoolean(),
], async (req, res) => {
    try {
        const jwt = req.cookies.jwt;
        const decoded = await tokenController.verifyJwtToken(jwt);
        console.log('Decoded create post user: ', decoded)
        const user_id = decoded.user_id;
        const user_name = decoded.username;
        const user_img = decoded.user_picture;

        const postPicture = req.files.postPicture ? req.files.postPicture[0].path : null;
        const videoSource = req.files.videoSource ? req.files.videoSource[0].path : null;

        await createPostController.createPost(req.body,decoded, user_id, user_name, user_img, postPicture, videoSource);
        return res.status(201).json({ detail: 'Your Post Has Been Submitted To Our System.' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
});


router.get('/posts', async (req, res) => {
    try {
        
        
        const posts = await Post.findAll({
    where: { private: false },
    include: [
        {
            model: User,
            as: 'user',
            attributes: ['username', 'profilePicture', 'id']
        },
        {
            model: Comment,
            as: 'postComments',
            attributes: ['comment_content'],
            include: {
                
                model: User,
                as: 'commentUser'
                
            }
        },
        {
            model: Likes,
            as: 'postLikes'
        },
        {
            model: Saved,
            as: 'saved_post'
        }
    ]
});
        
        return res.status(200).json({ posts });
    } catch (e) {
        console.log(e)
        return res.status(500).json({ error: e.message });
    }
});

router.get('/post/:post_id', async (req, res) => {
    const post_id = req.params.post_id;

    try {
        const post = await Post.findOne({
            where: { id: post_id },
            include: [
                {
                    model: User,
                    as: 'user'
                },
                {
                    model: Comment,
                    as: 'postComments',
                    include: [
                      {
                          model: User,
                          as: 'commentUser'
                      },
                      {
                          model: CommentLikes,
                          as: 'comment_likes'
                      }, 
                      {
                          model: CommentDislikes,
                          as: 'comment_dislikes'
                      }, 
                    
                      {
                          model: CommentAnswer,
                    as: 'awnsers',
                        include: [
                            {
                                model: User,
                                as: 'awnser_user'
                            },
                            {
                                model: CommentAwnsersLikes,
                                as: 'awnser_likes'
                            },
                            {
                                model: CommentAwnsersDislikes,
                                as: 'awnser_dislikes'
                            }
                        ]
                      }
                    ]
                },
                {
                     model: Likes,
                     as: 'postLikes'
                },
                {
                    model: Saved,
                    as: 'saved_post'
                }
            ]
        });
        
        if (!post) {
            return res.status(404).json({ detail: 'Post Not Found.' });
        }
        return res.status(200).json({ post });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// Ruta para obtener los posts de un usuario específico por ID de usuario
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
