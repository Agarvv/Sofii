const likesService = require('../services/likesService');
const tokenController = require('../controllers/tokenController');
const Video = require('../models/Video');
const VideoLikes = require('../models/VideoLikes');
const Likes = require('../models/Likes');
const { Op } = require('sequelize');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const CommentAnswer = require('../models/CommentAwnser');
const VideoComments = require('../models/VideoComments');
const VideoCommentAnswer = require('../models/VideoCommentAwnser');
const CommentLikes = require('../models/CommentLikes');
const CommentDislikes = require('../models/CommentDislikes')
const CommentAwnsersLikes = require('../models/CommentAwnsersLikes');
const CommentAwnsersDislikes = require('../models/CommentAwnsersDislikes')
const VideoCommentLikes = require('../models/VideoCommentLikes');
const VideoCommentDislikes = require('../models/VideoCommentDislikes')
const VideoCommentAwnsersLikes = require('../models/VideoCommentAwnsersLikes');
const VideoCommentAwnsersDislikes = require('../models/VideoCommentAwnsersDislikes')

const likeVideo = async (jwt_token, video_id) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwt_token);
        const databaseVideo = await Video.findOne({ where: { id: video_id } });

        if (!databaseVideo) {
            throw new Error("The video does not exist.");
        }

        const isLiked = await VideoLikes.findOne({
            where: {
                user_id: userDecoded.user_id,
                video_id: video_id
            }
        });

        if (isLiked) {
         
          await likesService.unlikeVideo(userDecoded, isLiked);
            return { liked: false, unliked: true };
        }

        await likesService.likeVideo(userDecoded, databaseVideo);
        return { liked: true, unliked: false };

    } catch (e) {
        throw new Error(e.message);
    }
};

const likePost = async (jwt_token, post_id) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwt_token);
        const postExists = await Post.findOne({ where: { id: post_id } });

        if (!postExists) {
            throw new Error("The post does not exist.");
        }

        const isLiked = await Likes.findOne({
            where: {
                user_id: userDecoded.user_id,
                post_id: post_id
            }
        });

        if (isLiked) {
            await likesService.unlikePost(userDecoded.user_id, isLiked);
            return { liked: false, unliked: true };
        }

        await likesService.likePost(userDecoded, postExists);
        return { liked: true, unliked: false };

    } catch (e) {
        throw new Error(e.message);
    }
};

const likeComment = async (jwt_token, post_id, comment_id) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwt_token);
        const postExists = await Post.findOne({ where: { id: post_id } });
        const commentExists = await Comment.findOne({ where: { id: comment_id } });

        if (!postExists) {
            throw new Error("Post does not exist.");
        }

        if (!commentExists) {
            throw new Error("Comment does not exist.");
        }

        const isLiked = await CommentLikes.findOne({
            where: {
                post_id: post_id,
                comment_id: comment_id,
                user_id: userDecoded.user_id
            }
        });

        if (isLiked) {
            await likesService.unlikeComment(isLiked, userDecoded)
            return { liked: false, unliked: true };
        }

        await likesService.likeComment(userDecoded, commentExists, postExists);
        return { liked: true, unliked: false };

    } catch (e) {
        throw e;
    }
};

const likeCommentAnswer = async (jwt_token, post_id, comment_id, answer_id) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwt_token);
        const postExists = await Post.findOne({ where: { id: post_id } });
        const commentExists = await Comment.findOne({ where: { id: comment_id } });
        const answerExists = await CommentAnswer.findOne({ where: { id: answer_id } });

        if (!postExists) {
            throw new Error("Post does not exist.");
        }

        if (!commentExists) {
            throw new Error("Comment does not exist.");
        }

        if (!answerExists) {
            throw new Error("Answer does not exist.");
        }

        const isLiked = await CommentAwnsersLikes.findOne({
            where: {
                post_id: post_id,
                comment_id: comment_id,
                awnser_id: answer_id,
                user_id: userDecoded.user_id
            }
        });

        if (isLiked) {
            await likesService.unlikeCommentAwnser(isLiked)
            return { liked: false, unliked: true };
        }

        await likesService.likeCommentAnswer(userDecoded, postExists, commentExists, answerExists);
        return { liked: true, unliked: false };

    } catch (e) {
        throw new Error(e.message);
    }
};

const likeVideoComment = async (jwt_token, video_id, comment_id) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwt_token);
        const videoExists = await Video.findOne({ where: { id: video_id } });
        const commentExists = await VideoComments.findOne({ where: { id: comment_id } });

        if (!videoExists) {
            throw new Error("Video does not exist.");
        }

        if (!commentExists) {
            throw new Error("Comment does not exist.");
        }

        const isLiked = await VideoCommentLikes.findOne({
            where: {
                video_id: video_id,
                comment_id: comment_id,
                user_id: userDecoded.user_id
            }
        });

        if (isLiked) {
            await likesService.unlikeVideoComment(isLiked)
            return { liked: false, unliked: true };
        }

        await likesService.likeVideoComment(userDecoded, videoExists, commentExists);
        return { liked: true, unliked: false };

    } catch (e) {
        throw new Error(e.message);
    }
};

const likeVideoCommentAnswer = async (jwt_token, video_id, comment_id, answer_id) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwt_token);
        const videoExists = await Video.findOne({ where: { id: video_id } });
        const commentExists = await VideoComments.findOne({ where: { id: comment_id } });
        const answerExists = await VideoCommentAnswer.findOne({ where: { id: answer_id } });

        if (!videoExists) {
            throw new Error("Video does not exist.");
        }

        if (!commentExists) {
            throw new Error("Comment does not exist.");
        }

        if (!answerExists) {
            throw new Error("Answer does not exist.");
        }

        const isLiked = await VideoCommentAwnsersLikes.findOne({
            where: {
                video_id: video_id,
                comment_id: comment_id,
                awnser_id: answer_id,
                user_id: userDecoded.user_id
            }
        });

        if (isLiked) {
            await likesService.unlikeVideoCommentAwnser(isLiked)
            return { liked: false, unliked: true };
        }

        await likesService.likeVideoCommentAnswer(userDecoded, videoExists, commentExists, answerExists);
        return { liked: true, unliked: false };

    } catch (e) {
        throw new Error(e.message);
    }
};

const dislikeComment = async (jwtToken, post_id, comment_id) => {
    try {
        const userDecoded = await
        tokenController.verifyJwtToken(jwtToken)
        
        const postExists = await
        Post.findOne({
            where: {
                id: post_id 
            }
        })
        
        const commentExists = await
        Comment.findOne({
            where: {
                id: comment_id
            }
        })
        
        if(!postExists) {
            return res.status(400).json({
                error: "post_not_exists"
            })
        }
         
        if(!commentExists) {
            return res.status(400).json({
                error: "comment_not_exists"
            })
        }
        
        const isDisliked = await CommentDislikes.findOne({
            where: {
                comment_id: comment_id,
                post_id: post_id,
                user_id: userDecoded.user_id
            }
        })
        
        if(isDisliked) {
            await likesService.undislikeComment(isDisliked)
            return { disliked: false, unDisliked: true }
        }
        
        await likesService.dislikeComment( userDecoded, postExists, commentExists)
        return { disliked: true, unDisliked: false }
        
        
    } catch(e) {
        throw e
    }
}

const dislikeCommentAwnser  = async (jwtToken, post_id, comment_id, awnser_id) => {
    try {
        const userDecoded = await
        tokenController.verifyJwtToken(jwtToken)
        
        const postExists = await Post.findOne({
            where: {
                id: post_id
            }
        })
        
        const commentExists = await
        Comment.findOne({
            where: {
                id: comment_id
            }
        })
        
        const awnserExists = await 
        CommentAnswer.findOne({
            where: {
                id: awnser_id
            }
        })
        
        if(!postExists) {
            return res.status(404).json({
                error: "post_not_exist"
            })
        }
        
        if(!commentExists) {
            return res.status(404).json({
                error: "comment_not_exist"
            })
        }
        
        if(!awnserExists) {
            return res.status(404).json({
                error: "awnser_not_exist"
            })
        }
        
        const isDisliked = await
        CommentAwnsersDislikes.findOne({
            where: {
                awnser_id: awnser_id,
                comment_id: comment_id,
                post_id: post_id,
                user_id: userDecoded.user_id
            }
        })
        
        if(isDisliked) {
            await likesService.undislikeCommentAwnser(isDisliked)
            return { disliked: false, unDisliked: true }
        }
        
        await likesService.dislikeCommentAwnser(userDecoded, postExists, commentExists, awnserExists)
        return { disliked: true, unDisliked: false }
        
    } catch(e) {
        throw e
    }
}

const dislikeVideoComment = async (jwtToken, video_id, comment_id) => {
    try {
        
        const userDecoded = await
        tokenController.verifyJwtToken(jwtToken)
        
        const videoExists = await
        Video.findOne({
            where: {
                id: video_id
            }
        })
        
        const commentExists = await
        VideoComments.findOne({
            where: {
                id: comment_id
            }
        })
        
        if(!videoExists) {
            return res.status(404).json({
                error: "video_not_exists"
            })
        }
        
        if(!commentExists) {
            return res.status(404).json({
                error: "comment_not_exists"
            })
        }
        
        const isDisliked = await
        VideoCommentDislikes.findOne({
            where: {
                comment_id: comment_id,
                video_id: video_id,
                user_id: userDecoded.user_id
            }
        })
        
        if(isDisliked) {
            await likesService.undislikeVideoComment(isDisliked)
            return { disliked: false, unDisliked: true }
        }
        
        
        await likesService.dislikeVideoComment(userDecoded, videoExists, commentExists)
        return { disliked: true, unDisliked: false }
        
    } catch(e) {
        throw e
    }
}

const dislikeVideoCommentAwnser = async (jwt_token, video_id, comment_id, awnser_id) => {
    try {
        const userDecoded = await 
        tokenController.verifyJwtToken(jwt_token)
        
        const videoExists = await
        Video.findOne({
            where: {
                id: video_id
            }
        })
        
        const commentExists = await
        VideoComments.findOne({
            where: {
                id: comment_id
            }
        })
        
        const awnserExists = await
        VideoCommentAnswer.findOne({
            where: {
                id: awnser_id
            }
        })
        
        if(!videoExists) {
            throw new Error("video_not_exists")
        }
        
        if(!commentExists) {
            throw new Error("comment_not_exists")
        }
        
        if(!awnserExists) {
            throw new Error("awnser_not_exists")
        }
        
        const isDisliked = await
        VideoCommentAwnsersDislikes.findOne({
            where: {
                awnser_id: awnser_id,
                comment_id: comment_id,
                video_id: video_id,
                user_id: userDecoded.user_id
            }
        })
        
        if(isDisliked) {
            await likesService.undislikeVideoCommentAwnser(isDisliked)
            return { disliked: false, unDisliked: true }
        }
        
        await likesService.dislikeVideoCommentAwnser(userDecoded, videoExists, commentExists, awnserExists)
        return { disliked: true, unDisliked: false}
        
        
    } catch(e) {
        throw e
    }
}


module.exports = {
    likeVideo,
    likePost,
    likeComment,
    likeCommentAnswer,
    likeVideoComment,
    likeVideoCommentAnswer,
    dislikeComment,
    dislikeCommentAwnser,
    dislikeVideoComment,
    dislikeVideoCommentAwnser
};