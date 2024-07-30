const express = require('express');
const { body } = require('express-validator');
const createPostController = require('../controllers/createPostController');
const tokenController = require('../controllers/tokenController');
const Post = require('../models/Post');
const multer = require('multer');
const path = require('path'); // Asegúrate de haber requerido 'path'
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'media/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/createPost', upload.single('postPicture'), [
    body("description").escape().trim(),
    body("privatePost").isBoolean(),
    body("only_friends").isBoolean(),
], async (req, res) => {
    try {
        const jwt = req.cookies.jwt;
        const decoded = await tokenController.verifyJwtToken(jwt);
        const user_id = decoded.user_id;
        const user_name = decoded.username;
        const user_img = decoded.userPicture;

        await createPostController.createPost(req.body, user_id, user_name, user_img, req.file.path);
        return res.status(201).json({ detail: 'Your Post Has Been Submitted To Our System.' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
});

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.findAll({ where: { private: false } });
        return res.status(200).json({ posts });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

router.get('/post/:post_id', async (req, res) => {
    const post_id = req.params.post_id;

    try {
        const post = await Post.findOne({ where: { id: post_id } });
        if (!post) {
            return res.status(404).json({ detail: 'Post Not Found.' });
        }
        return res.status(200).json({ post });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

router.get('/post_user/:userId', (req, res) => {
  try {
    // Implementar lógica para obtener posts de un usuario específico
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
});

router.post('/comment_post', [
    body("comment").escape().trim(),
    body("post_id").isNumeric()
], async (req, res) => {
    try {
        await postController.createComment(req.body, req.cookies.jwt);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
});

module.exports = router;