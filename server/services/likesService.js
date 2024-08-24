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



const likeVideo = async (user, video) => {
    try {
        await VideoLikes.create({
            user_id: user.user_id,
            video_id: video.id
        });
    } catch (e) {
        throw e;
    }
};

const unlikeVideo = async (user_id, video_id) => {
    try {
        await VideoLikes.destroy({
            where: {
                user_id: user_id,
                video_id: video_id
            }
        });
    } catch (e) {
        throw e;
    }
};

const likePost = async (user, post) => {
    try {
        await Likes.create({
            user_id: user.user_id,
            post_id: post.id
        });
    } catch (e) {
        throw e;
    }
};

const unlikePost = async (user_id, post_id) => {
    try {
        await Likes.destroy({
            where: {
                user_id: user_id,
                post_id: post_id
            }
        });
    } catch (e) {
        throw e;
    }
};

const likeComment = async (user, comment, post) => {
    try {
        await CommentLikes.create({
            user_id: user.user_id,
            comment_id: comment.id,
            post_id: post.id
        });
    } catch (e) {
        throw e;
    }
};

const likeCommentAnswer = async (user, post, comment, answer) => {
    try {
        await CommentAwnsersLikes.create({
            user_id: user.user_id,
            post_id: post.id,
            comment_id: comment.id,
            awnser_id: answer.id
        });
    } catch (e) {
        throw e;
    }
};

const likeVideoComment = async (user, video, comment) => {
    try {
        await VideoCommentLikes.create({
            user_id: user.user_id,
            video_id: video.id,
            comment_id: comment.id
        });
    } catch (e) {
        throw e;
    }
};

const likeVideoCommentAnswer = async (user, video, comment, answer) => {
    try {
        await VideoCommentAwnsersLikes.create({
            user_id: user.user_id,
            video_id: video.id,
            comment_id: comment.id,
            awnser_id: answer.id
        });
    } catch (e) {
        throw e;
    }
};

const dislikeComment = async (user, post, comment) => {
    try {
        
        await CommentDislikes.create({
            user_id: user.user_id,
            comment_id: comment.id,
            post_id: post.id
        })
        
        return 
        
        
    } catch(e) {
        throw e
    }
}

const dislikeCommentAwnser = async (user, post, comment, awnser) => {
    try {
        
        await CommentAwnsersDislikes.create({
            user_id: user.user_id,
            comment_id: comment.id,
            awnser_id: awnser.id,
            post_id: post.id
        })
        
        return 
        
    } catch(e) {
        throw e
    }
}

const dislikeVideoComment = async (user, video, comment) => {
    try {
        
        await VideoCommentDislikes.create({
            user_id: user.user_id,
            video_id: video.id,
            comment_id: comment.id
        })
        
        return 
        
        
    } catch(e) {
        throw e
    }
}

const dislikeVideoCommentAwnser = async (user, video, comment, awnser) => {
    try {
        await VideoCommentAwnsersDislikes.create({
            user_id: user.user_id,
            video_id: video.id,
            comment_id: comment.id,
            awnser_id: awnser.id
        })
        
        return 
        
        
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