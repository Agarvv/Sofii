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



const likeVideo = async (user, video) => {
    try {
       const newLike = await VideoLikes.create({
            user_id: user.user_id,
            video_id: video.id
        });
        
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
        io.emit('unlikePost', like); // Emitimos el objeto completo del "like" eliminado
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
        
        const io = websocket.getIO()
        io.emit('likeComment', newLike)
        
    } catch (e) {
        throw e;
    }
};

const likeCommentAnswer = async (user, post, comment, answer) => {
    try {
        const newLike = await CommentAwnsersLikes.create({
            user_id: user.user_id,
            post_id: post.id,
            comment_id: comment.id,
            awnser_id: answer.id
        });
        
        const io = websocket.getIO()
        io.emit('likeCommentAwnser', newLike)
    } catch (e) {
        throw e;
    }
};

const likeVideoComment = async (user, video, comment) => {
    try {
        const newLike = await VideoCommentLikes.create({
            user_id: user.user_id,
            video_id: video.id,
            comment_id: comment.id
        });
        
        const io = websocket.getIO()
        io.emit('likeVideoComment', newLike)
    } catch (e) {
        throw e;
    }
};

const likeVideoCommentAnswer = async (user, video, comment, answer) => {
    try {
       const newLike = await VideoCommentAwnsersLikes.create({
            user_id: user.user_id,
            video_id: video.id,
            comment_id: comment.id,
            awnser_id: answer.id
        });
        
        const io = websocket.getIO()
        io.emit('likeVideoCommentAnswer', newLike)
    } catch (e) {
        throw e;
    }
};

const dislikeComment = async (user, post, comment) => {
    try {
        
       const like = await CommentDislikes.create({
            user_id: user.user_id,
            comment_id: comment.id,
            post_id: post.id
        })
        
        const io = websocket.getIO()
        io.emit('unlikeComment', like)
        
        
    } catch(e) {
        throw e
    }
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
        io.emit('unlikeCommentAwnser', like)
        
    } catch(e) {
        throw e
    }
}

const dislikeVideoComment = async (user, video, comment) => {
    try {
        
       const like = await VideoCommentDislikes.create({
            user_id: user.user_id,
            video_id: video.id,
            comment_id: comment.id
        })
        
        const io = websocket.getIO()
        io.emit('unlikeVideoComment', like)
        
        
    } catch(e) {
        throw e
    }
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
        io.emit('unlikeVideoCommentAwnser', like)
        
        
    } catch(e) {
        throw e
    }
}


module.exports = {
    likeVideo,
    unlikeVideo,
    likePost,
    unlikePost,
    likeComment,
    likeCommentAnswer,
    likeVideoComment,
    likeVideoCommentAnswer,
    dislikeComment,
    dislikeCommentAwnser,
    dislikeVideoComment,
    dislikeVideoCommentAwnser
};