const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const commentsController = require('../controllers/commentsController')
const commentService = require('../services/commentsService')

// Ruta para comentar en un post
router.post('/comment_post', [
    body("comment").escape().trim(),
    body("post_id").isNumeric()
], async (req, res) => {
    try {
        console.log('Comments req.body, ', req.body)
        await commentsController.createComment(req.body, req.cookies.jwt);
        return res.status(201).json({ detail: 'Comment has been added.' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
});


router.get('/postComments/:post_id', async (req, res) => {
    try {
        const comments = await commentsController.findCommentByPostId(req.params.post_id);
        return res.status(201).json({'Comments': comments });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
});

module.exports = router