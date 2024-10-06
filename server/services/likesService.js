const VideoLikes = require('../models/VideoLikes');
const Likes = require('../models/Likes');
const CommentLikes = require('../models/CommentLikes');
const CommentAwnsersLikes = require('../models/CommentAwnsersLikes');
const VideoCommentLikes = require('../models/VideoCommentLikes');
const VideoCommentAwnsersLikes = require('../models/VideoCommentAwnsersLikes');

const CommentDislikes = require('../models/CommentDislikes')
const CommentAwnsersDislikes = require('../models/CommentAwnsersDislikes')

const VideoCommentDislikes = require('../models/VideoCommentDislikes')
const VideoCommentAwnsersDislikes = require('../models/VideoCommentAwnsersDislikes')
const websocket = require('../websocket')
const { sendNotificationToSingleUser } = require('../services/NotificationService');


const likeVideo = async (user, video) => {
    try {
       const newLike = await VideoLikes.create({
            user_id: user.user_id,
            video_id: video.id
        });
        
        console.log('conyroler udrr: ', user)

        console.log(user); 
        
        //Like that user will not send self notifications 
       if(!video.video_user_id == user.user_id) {
        await sendNotificationToSingleUser(video.video_user_id, user, video, null, 'VIDEO_LIKED')
       }

        const io = websocket.getIO()
        io.emit('videoLiked', newLike)

    } catch (e) {
        throw e;
    }
};

const unlikeVideo = async (user_id, like) => {
    try {
        
        await like.destroy()
        
        const io = websocket.getIO()
        io.emit('unlikeVideo', like)
    } catch (e) {
        throw e;
    }
};


const likePost = async (user, post) => {
    try {
       const newLike = await Likes.create({
            user_id: user.user_id,
            post_id: post.id
        });
        
       //Like that user will not send self notifications 
        if(!post.user_id == user.user_id) {
        await sendNotificationToSingleUser(post.user_id, user, post, null, 'POST_LIKED')
        }
        
        const io = websocket.getIO()
        io.emit('likePost', newLike)
        
    } catch (e) {
        throw e;
    }
};

const unlikePost = async (user_id, like) => {
    try {
    
        await like.destroy(); 
    
        const io = websocket.getIO();
        io.emit('unlikePost', like); 
    } catch (e) {
        throw e;
    }
};

const likeComment = async (user, comment, post) => {
    try {
        const newLike = await CommentLikes.create({
            user_id: user.user_id,
            comment_id: comment.id,
            post_id: post.id
        });
        
           //Like that user will not send self notifications 
     if(!comment.user_id == user.user_id) {
        await sendNotificationToSingleUser(comment.user_id, user, comment, null, 'COMMENT_LIKED')
     }
        
        
        const io = websocket.getIO()
        io.emit('likeComment', newLike)
        
    } catch (e) {
        throw e;
    }
};

const unlikeComment = async (like, user) => {
    await like.destroy()
    const io = websocket.getIO()
    io.emit('unlikeComment', like)
}



const likeCommentAnswer = async (user, post, comment, answer) => {
    try {
        const newLike = await CommentAwnsersLikes.create({
            user_id: user.user_id,
            post_id: post.id,
            comment_id: comment.id,
            awnser_id: answer.id
        });
        
        
            //Like that user will not send self notifications 
     if(!answer.user_id == user.user_id) {
        await sendNotificationToSingleUser(answer.user_id, user, answer, null, "COMMENT_AWNSER_LIKED")
     }

        const io = websocket.getIO()
        io.emit('likeCommentAwnser', newLike)
    } catch (e) {
        throw e;
    }
};

const unlikeCommentAwnser = async(awnser) => {
    await awnser.destroy()
    const io = websocket.getIO()
    io.emit('unlikeCommentAwnser', awnser)
}



const likeVideoComment = async (user, video, comment) => {
    try {
        const newLike = await VideoCommentLikes.create({
            user_id: user.user_id,
            video_id: video.id,
            comment_id: comment.id
        });
        
           //Like that user will not send self notifications 
       if(!comment.user_id == user.user_id) {
        await sendNotificationToSingleUser(comment.user_id, user, comment, null, "VIDEO_COMMENT_LIKED")
       }
        
        
        const io = websocket.getIO()
        io.emit('likeVideoComment', newLike)
    } catch (e) {
        throw e;
    }
};

const unlikeVideoComment = async (like) => {
    await like.destroy()
    const io = websocket.getIO()
    io.emit('unlikedVideoComment', like)
}



const likeVideoCommentAnswer = async (user, video, comment, answer) => {
    try {
       const newLike = await VideoCommentAwnsersLikes.create({
            user_id: user.user_id,
            video_id: video.id,
            comment_id: comment.id,
            awnser_id: answer.id
        });
        
           //Like that user will not send self notifications 
      if(!answer.user_id == user.user_id) {
        await sendNotificationToSingleUser(answer.user_id, user, answer, null, "VIDEO_COMMENT_AWNSER_LIKED")
      }
        
        const io = websocket.getIO()
        io.emit('likeVideoCommentAnswer', newLike)
    } catch (e) {
        throw e;
    }
};

const unlikeVideoCommentAwnser = async (like) => {
    await like.destroy()
    const io = websocket.getIO()
    io.emit('unlikedVideoCommentAwnser', like)
}

const dislikeComment = async (user, post, comment) => {
    try {
        
       const like = await CommentDislikes.create({
            user_id: user.user_id,
            comment_id: comment.id,
            post_id: post.id
        })
        
        const io = websocket.getIO()
        io.emit('dislikeComment', like)
        
        
    } catch(e) {
        throw e
    }
}

const undislikeComment = async (dislike) => {
    await dislike.destroy()
    const io = websocket.getIO()
    io.emit('undislikeComment', dislike)
}

const dislikeCommentAwnser = async (user, post, comment, awnser) => {
    try {
        
       const like = await CommentAwnsersDislikes.create({
            user_id: user.user_id,
            comment_id: comment.id,
            awnser_id: awnser.id,
            post_id: post.id
        })
        
        const io = websocket.getIO()
        io.emit('dislikeCommentAwnser', like)
        
    } catch(e) {
        throw e
    }
}

const undislikeCommentAwnser = async (dislike)=> {
    await dislike.destroy()
    const io = websocket.getIO()
    io.emit('undislikeCommentAwnser', dislike)
}

const dislikeVideoComment = async (user, video, comment) => {
    try {
        
       const like = await VideoCommentDislikes.create({
            user_id: user.user_id,
            video_id: video.id,
            comment_id: comment.id
        })
        
        const io = websocket.getIO()
        io.emit('dislikeVideoComment', like)
        
        
    } catch(e) {
        throw e
    }
}

const undislikeVideoComment = async (dislike) => {
    await dislike.destroy()
    const io = websocket.getIO()
    io.emit('undislikedVideoComment', dislike)
}
 
const dislikeVideoCommentAwnser = async (user, video, comment, awnser) => {
    try {
         const like = await VideoCommentAwnsersDislikes.create({
            user_id: user.user_id,
            video_id: video.id,
            comment_id: comment.id,
            awnser_id: awnser.id
        })
        
        const io = websocket.getIO()
        io.emit('dislikeVideoCommentAwnser', like)
        
        
    } catch(e) {
        throw e
    }
}

const undislikeVideoCommentAwnser = async (dislike) => {
    await dislike.destroy()
    const io = websocket.getIO()
    io.emit('undislikedVideoCommentAwnser', dislike)
}


module.exports = {
    likeVideo,
    unlikeVideo,
    likePost,
    unlikePost,
    likeComment,
    unlikeComment,
    likeCommentAnswer,
    unlikeCommentAwnser,
    dislikeCommentAwnser,
    undislikeCommentAwnser,
    likeVideoComment,
    unlikeVideoComment,
    likeVideoCommentAnswer,
    unlikeVideoCommentAwnser,
    dislikeComment,
    undislikeComment,
    dislikeVideoComment,
    undislikeVideoComment,
    dislikeVideoCommentAwnser,
    undislikeVideoCommentAwnser
};