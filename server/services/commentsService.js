const Comment = require('../models/Comment')
const VideoComments = require('../models/VideoComments')
const tokenController = require('../controllers/tokenController')
const NotificationService = require('./NotificationService')

const VideoCommentAwnser = require('../models/VideoCommentAwnser')


const createComment = async (type, resource, user, comment_content) => {
    try {
        let comment;
        switch (type) {
            case 'POST':
                comment = await Comment.create({
                    post_id: resource.id,
                    user_id: user.user_id,
                    comment_content: comment_content
                });
                
                if(comment) {
                    await NotificationService.sendNotificationToSingleUser(resource.user_id, user, 'POST_COMMENT')
                    return comment
                }
                
                break;
            case 'VIDEO':
                
                comment = await VideoComments.create({
                    video_id: resource.id,
                    user_id: user.user_id,
                    comment_content: comment_content
                });
                if(comment) {
                    await NotificationService.sendNotificationToSingleUser(resource.video_user_id, user, 'VIDEO_COMMENT')
                    return comment
                }
                
                break;
        }
        return comment;
        
    } catch (e) {
        throw e; // Re-lanzamos el error tal cual
    }
}

const findCommentByPostId = async (post_id) => {
    try {
        const comments = 
        await Comment.findAll({ where: { post_id: post_id} })
        if(!comments) {
            return res.status(500).json({detail: 'No comments found for that post...'})
        }
        return comments
    } catch(e) {
        console.log(e)
        throw new Error(e)
    }
}

const awnserToPostComment = async (user, post_id,comment, awnser_content) => {
    try {
        
    
        
        
    } catch(e) {
        throw new Error(e)
    }
}

const awnserToVideoComment = async (user, video_id,comment, awnser_content) => {
    try {
        
    
        
        
    } catch(e) {
        throw new Error(e)
    }
}




module.exports = {
    createComment,
     findCommentByPostId,
      awnserToPostComment,
       awnserToVideoComment
}