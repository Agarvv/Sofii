const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likesController');

router.post('/like_content', async (req, res) => {
    try {
        const type = req.body.type;
        const token = req.cookies.jwt;

        if (!type) {
            return res.status(400).json({ error: 'Data is missing' });
        }

        let data;
        switch (type) {
            case "VIDEO":
                if (!req.body.video_id) {
                    return res.status(400).json({ error: 'Video ID is missing.' });
                }
                data = await likesController.likeVideo(token, req.body.video_id);
                break;
            case "POST":
                if (!req.body.post_id) {
                    return res.status(400).json({ error: 'Post ID is missing.' });
                }
                data = await likesController.likePost(token, req.body.post_id);
                break;
            case "COMMENT":
                if (!req.body.post_id || !req.body.comment_id) {
                    return res.status(400).json({ error: 'Post ID or Comment ID is missing.' });
                }
                data = await likesController.likeComment(token, req.body.post_id, req.body.comment_id);
                break;
            case "COMMENT_AWNSER":
                if (!req.body.post_id || !req.body.comment_id || !req.body.awnser_id) {
                    return res.status(400).json({ error: 'Post ID, Comment ID, or Answer ID is missing.' });
                }
                data = await likesController.likeCommentAnswer(token, req.body.post_id, req.body.comment_id, req.body.awnser_id);
                break;
            case "VIDEO_COMMENT":
                if (!req.body.video_id || !req.body.comment_id) {
                    return res.status(400).json({ error: 'Video ID or Comment ID is missing.' });
                }
                data = await likesController.likeVideoComment(token, req.body.video_id, req.body.comment_id);
                break;
            case "VIDEO_COMMENT_AWNSER":
                if (!req.body.video_id || !req.body.comment_id || !req.body.awnser_id) {
                    return res.status(400).json({ error: 'Video ID, Comment ID, or Answer ID is missing.' });
                }
                data = await likesController.likeVideoCommentAnswer(token, req.body.video_id, req.body.comment_id, req.body.awnser_id);
                break;
            default:
                return res.status(400).json({ error: 'Invalid type provided.' });
        }

        if (data.liked) {
            return res.status(201).json({ detail: `${type} liked successfully.` });
        } else if (data.unliked) {
            return res.status(201).json({ detail: `${type} unliked successfully.` });
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
});

router.post('/dislike_content', async (req, res) => {
    try {
        let data;
        const jwt_token = req.cookies.jwt 
        
        
        const type = req.body.type
        if(!type) {
            return res.status(400).json({
                error: "internal_server_error"
            })
        }
        
        switch(type) {
            case "COMMENT":
                if(!req.body.post_id) {
                    return res.status(400).json({
                        error: "post_id_missing"
                    })
                }
                
                if(!req.body.comment_id) {
                    return res.status(400).json({
                        error: "comment_id_missing"
                    })
                }
            
                 data = await likesController.dislikeComment(jwt_token, req.body.post_id, req.body.comment_id)
                if(data.disliked) {
                    return res.status(201).json({
                        detail: "comment_disliked"
                    })
                }
                
                if(data.unDisliked) {
                    return res.status(201).json({
                        detail: "comment unDisliked"
                    })
                }
                
                break;
            
            case "COMMENT_AWNSER":
                if(!req.body.comment_id) {
                    return res.status(400).json({
                        error: "comment_id_missing"
                    })
                }
                
                if(!req.body.post_id) {
                    return res.status(400).json({
                        error: "post_id_missing"
                    })
                }
                
                if(!req.body.awnser_id) {
                    return res.status(400).json({
                        error: "awnser_id_missing"
                    })
                }
                
                 data = await likesController.dislikeCommentAwnser(jwt_token, req.body.post_id, req.body.comment_id, req.body.awnser_id)
                
                if(data.disliked) {
                    return res.status(201).json({
                        detail: "awnser comment disliked"
                    })
                }
                
                if(data.unDisliked) {
                    return res.status(201).json({
                        detail: "awnser comment undisliked"
                    })
                }
                
                break;
            
            case "VIDEO_COMMENT":
                if(!req.body.video_id) {
                    return res.status(400).json({
                        error: "video_id_missing"
                    })
                }
                
                if(!req.body.comment_id) {
                    return res.status(400).json({
                        error: "comment_id_missing"
                    })
                }
                
                 data = await likesController.dislikeVideoComment(jwt_token, req.body.video_id, req.body.comment_id)
                if(data.disliked) {
                    return res.status(200).json({
                        detail: "comment video disliked"
                    })
                }
                
                if(data.unDisliked) {
                    return res.status(200).json({
                        detail: "video comment undisliled"
                    })
                }
                
                break;
            
            case "VIDEO_COMMENT_AWNSER":
                
                if(!req.body.video_id) {
                    return res.status(400).json({
                        error: "video_id_missing"
                    })
                }
                
                if(!req.body.comment_id) {
                    return res.status(400).json({
                        error: "comment_id_missing"
                    })
                }
                
                if(!req.body.awnser_id) {
                    return res.status(400).json({
                        error: "awnser_id_missing"
                    })
                }
                
               data =   await likesController.dislikeVideoCommentAwnser( jwt_token, req.body.video_id, req.body.comment_id, req.body.awnser_id)
              if(data.disliked) {
                  return res.status(201).json({
                      detail: "video comment awnser disliked"
                  })
              }
              
              if(data.unDisliked) {
                  return res.status(201).json({
                      detail: "video awnser comment undislikes"
                  })
              }
                
               
            
        }
        
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            error: "internal_serv_err"
        })
    }
})


module.exports = router;