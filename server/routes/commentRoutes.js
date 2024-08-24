const express = require('express')
const { body } = require('express-validator')
const router = express.Router()
const commentsController = require('../controllers/commentsController')
const commentService = require('../services/commentsService')

router.post('/comment_post', [
    body("comment").escape().trim(),
    body("post_id").isNumeric().optional(),  // `optional()` porque solo se requiere si `type` es `POST`
    body("video_id").isNumeric().optional(), // `optional()` porque solo se requiere si `type` es `VIDEO`
    body("type").isIn(['POST', 'VIDEO']) // Validación del `type`
], async (req, res) => {
    try {
        console.log('Comments req.body:', req.body);

        await commentsController.createComment(req.body, req.cookies.jwt);
        return res.status(201).json({ detail: 'Comment has been added.' });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
});

router.post('/awnser_to_comment',  [
    body("post_id").isNumeric(),
    body("video_id").isNumeric()
    ], async (req, res) => {
    try {
        
        console.log('req.body', req.body)
        
        const jwtToken = req.cookies.jwt 
        
        
        const type = req.body.type
        if(!type) {
            return res.status(400).json({ error: "type_missing"})
        }
        
        switch(type) {
            case "POST":
                const post_id = req.body.post_id
                const comment_id = req.body.comment_id 
                const awnser_content = req.body.awnser_content
                
                if(!post_id) {
                    return res.status(400).json({
                        error: "post_id_missing"
                    })
                }
                
                if(!comment_id) {
                    return res.status(400).json({
                        error: "comment_id_missing"
                    })
                }
                
                if(!awnser_content) {
                    return res.status(400).json({
                        error: "awnser_content_missing"
                    })
                }
                
                await commentsController.awnserToPostComment(jwtToken, post_id,comment_id, awnser_content)
                return res.status(201).json({
                    detail: "awnser_added_successfuly"
                })
                
                break;
            case "VIDEO":
                const video_id = req.body.video_id
                const awnserContent = req.body.awnser_content
                const video_comment_id = req.body.comment_id 
                
                if(!video_id) {
                    return res.status(400).json({
                        error: "video_id_missing"
                    })
                }
                
                if(!video_comment_id) {
                    return res.status(400).json({
                        error: "comment_id_missing"
                    })
                }
                
                if(!awnserContent) {
                    return res.status(400).json({
                        error: "awnser_content_missing"
                    })
                }
                
                await commentsController.awnserToVideoComment(jwtToken, video_id, video_comment_id, awnserContent)
                return res.status(201).json({
                    detail: "awnser_added_successfuly"
                })
                break;
        }
        
        
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
})




router.get('/postComments/:post_id', async (req, res) => {
    try {
        const comments = await commentsController.findCommentByPostId(req.params.post_id);
        return res.status(201).json({'Comments': comments });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
});

router.post('/comment_video', async (req, res) => {
    try {
        const post_id = req.body.post_id 
        const jwtToken = req.cookies.jwt
        const comment_content = req.body.comment_content 
        
        if(!post_id || !comment_content) {
            return res.status(401).json({ error: 'Bad request, data is missing.'})
        }
        
        await commentsController.createVideoComment(jwtToken, post_id, comment_content)
        
        return res.status(201).json({detail: 'Your comment has ben submited sucesfully'})
        
    } catch(e) {
        return res.status(500).json({ error: 'Internal server error'})
    }
})

module.exports = router