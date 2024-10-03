const Comment = require('../models/Comment');
const VideoComments = require('../models/VideoComments');
const tokenController = require('../controllers/tokenController');
const NotificationService = require('./NotificationService');
const CommentAnswer = require('../models/CommentAwnser');
const User = require('../models/User');
const CommentLikes = require('../models/CommentLikes');
const CommentDislikes = require('../models/CommentDislikes');
const CommentAwnsersLikes = require('../models/CommentAwnsersLikes');
const CommentAwnsersDislikes = require('../models/CommentAwnsersDislikes');
const VideoCommentLikes = require('../models/VideoCommentLikes');
const VideoCommentDislikes = require('../models/VideoCommentDislikes');
const VideoCommentAwnser = require('../models/VideoCommentAwnser');
const VideoCommentAwnsersLikes = require('../models/VideoCommentAwnsersLikes');
const VideoCommentAwnsersDislikes = require('../models/VideoCommentAwnsersDislikes');
const websocket = require('../websocket');
const { sendNotificationToSingleUser } = require('../services/NotificationService');

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

                if (comment) {
                    const fullComment = await Comment.findOne({
                        where: { id: comment.id },
                        include: [
                            { model: User, as: 'commentUser' },
                            { model: CommentLikes, as: 'comment_likes' },
                            { model: CommentDislikes, as: 'comment_dislikes' },
                            {
                                model: CommentAnswer,
                                as: 'awnsers',
                                include: [
                                    { model: User, as: 'awnser_user' },
                                    { model: CommentAwnsersLikes, as: 'awnser_likes' },
                                    { model: CommentAwnsersDislikes, as: 'awnser_dislikes' }
                                ]
                            }
                        ]
                    });

                    if (fullComment) {
                        const io = websocket.getIO();
                        await NotificationService.sendNotificationToSingleUser(resource.user_id, user,comment, null, 'POST_COMMENT');
                        io.emit('newComment', fullComment);
                        return;
                    } else {
                        throw new Error("something went wrong");
                    }
                } else {
                    throw new Error("something went wrong");
                }
                break;

            case 'VIDEO':
                comment = await VideoComments.create({
                    video_id: resource.id,
                    user_id: user.user_id,
                    comment_content: comment_content
                });

                if (comment) {
                    const fullComment = await VideoComments.findOne({
                        where: { id: comment.id },
                        include: [
                            { model: User, as: 'video_comment_user' },
                            { model: VideoCommentLikes, as: 'comment_likes' },
                            { model: VideoCommentDislikes, as: 'comment_dislikes' },
                            {
                                model: VideoCommentAwnser,
                                as: 'awnsers',
                                include: [
                                    { model: User, as: 'comment_awnser_user' },
                                    { model: VideoCommentAwnsersLikes, as: 'awnser_likes' },
                                    { model: VideoCommentAwnsersDislikes, as: 'awnser_dislikes' }
                                ]
                            }
                        ]
                    });

                    if (fullComment) {
                        const io = websocket.getIO();
                        io.emit('newVideoComment', fullComment);
                        await NotificationService.sendNotificationToSingleUser(resource.video_user_id, user, comment, 'VIDEO_COMMENT');
                    }
                }
                break;
        }
        return comment;

    } catch (e) {
        throw e;
    }
};

const findCommentByPostId = async (post_id) => {
    try {
        const comments = await Comment.findAll({ where: { post_id: post_id } });
        if (!comments) {
            return res.status(500).json({ detail: 'No comments found for that post...' });
        }
        return comments;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

const awnserToPostComment = async (user, post_id, comment, awnser_content) => {
    try {
        const newCommentAwnser = await CommentAnswer.create({
            post_id: post_id,
            comment_id: comment.id,
            user_id: user.user_id,
         answer_content: awnser_content
        });

        if (newCommentAwnser) {
            const fullComment = await CommentAnswer.findOne({
                where: { id: newCommentAwnser.id },
                include: [
                    { model: User, as: 'awnser_user' },
                    { model: CommentAwnsersLikes, as: 'awnser_likes' },
                    { model: CommentAwnsersDislikes, as: 'awnser_dislikes' }
                ]
            });
    
            if (fullComment) {
                await sendNotificationToSingleUser(comment.user_id, user, newCommentAwnser, "AWNSERED_COMMENT")
                const io = websocket.getIO();
                io.emit('newCommentAwnser', fullComment);
                return;
            } else {
                throw new Error("something went wrong");
            }
        } else {
            throw new Error("something went wrong");
        }

    } catch (e) {
        throw e;
    }
};

const awnserToVideoComment = async (user, video_id, comment, awnser_content) => {
    try {
        const awnser = await VideoCommentAwnser.create({
            video_id: video_id,
            comment_id: comment.id,
            user_id: user.user_id,
            awnser_content: awnser_content
        });

        const fullAwnser = await VideoCommentAwnser.findOne({
            where: { id: awnser.id },
            include: [
                { model: User, as: 'comment_awnser_user' },
                { model: VideoCommentAwnsersLikes, as: 'awnser_likes' },
                { model: VideoCommentAwnsersDislikes, as: 'awnser_dislikes' }
            ]
        });

        // const sendNotificationToSingleUser = async (target, user, content, type) => {

        if (fullAwnser) {
            await sendNotificationToSingleUser(comment.user_id, user, awnser, "VIDEO_COMMENT_AWNSERED")

            const io = websocket.getIO();
            io.emit('newVideoCommentAwnser', fullAwnser);
            return;
        } else {
            throw new Error("something went wrong");
        }

    } catch (e) {
        throw new Error(e);
    }
};

module.exports = {
    createComment,
    findCommentByPostId,
    awnserToPostComment,
    awnserToVideoComment
};