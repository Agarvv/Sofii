"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikesRepository_1 = __importDefault(require("@repositories/posts/LikesRepository"));
const DislikesRepository_1 = __importDefault(require("@repositories/posts/DislikesRepository"));
const Comment_1 = __importDefault(require("@models/posts/comments/Comment"));
const CommentAwnser_1 = __importDefault(require("@models/posts/comments/CommentAwnser"));
const CommentLikes_1 = __importDefault(require("@models/posts/comments/CommentLikes"));
const CommentDislikes_1 = __importDefault(require("@models/posts/comments/CommentDislikes"));
const CommentAwnsersLikes_1 = __importDefault(require("@models/posts/comments/CommentAwnsersLikes"));
const CommentAwnsersDislikes_1 = __importDefault(require("@models/posts/comments/CommentAwnsersDislikes"));
const websocket_1 = __importDefault(require("@websocket/websocket"));
const User_1 = __importDefault(require("@models/users/User"));
class CommentService {
    static comment(commentValue, postId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = websocket_1.default.getIO();
            const newComment = yield Comment_1.default.create({
                post_id: postId,
                user_id: user.user_id,
                comment_content: commentValue,
            }, {
                include: [
                    { model: User_1.default, as: 'commentUser' },
                    { model: CommentLikes_1.default, as: 'comment_likes' },
                    { model: CommentDislikes_1.default, as: 'comment_dislikes' },
                    {
                        model: CommentAwnser_1.default,
                        as: 'awnsers',
                        include: [
                            { model: User_1.default, as: 'awnser_user' },
                            { model: CommentAwnsersLikes_1.default, as: 'awnser_likes' },
                            { model: CommentAwnsersDislikes_1.default, as: 'awnser_dislikes' }
                        ]
                    }
                ]
            });
            io.emit('newComment', newComment);
        });
    }
    static likeOrUnlikeComment(commentId, postId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = websocket_1.default.getIO();
            const commentLike = yield LikesRepository_1.default.getCommentLike(user.user_id, postId, commentId);
            if (commentLike) {
                yield commentLike.destroy();
                io.emit('unlikeComment', commentLike);
                return "¡Comment Unliked!";
            }
            const newLike = yield CommentLikes_1.default.create({
                user_id: user.user_id,
                post_id: postId,
                comment_id: commentId
            });
            io.emit('likeComment', newLike);
            return "Comment Liked!";
        });
    }
    static dislikeOrUndislikeComment(commentId, postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = websocket_1.default.getIO();
            const commentDislike = yield DislikesRepository_1.default.getCommentDislike(userId, postId, commentId);
            if (commentDislike) {
                yield commentDislike.destroy();
                io.emit('undislikeComment', commentDislike);
                return "¡Comment Undisliked!";
            }
            const newDislike = yield CommentDislikes_1.default.create({
                user_id: userId,
                comment_id: commentId,
                post_id: postId
            });
            io.emit('dislikeComment', newDislike);
            return "¡Comment Disliked!";
        });
    }
    static answerComment(commentId, postId, user, answerValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = websocket_1.default.getIO();
            const newAnswer = yield CommentAwnser_1.default.create({
                post_id: postId,
                comment_id: commentId,
                user_id: user.user_id,
                answer_content: answerValue
            }, {
                include: [
                    { model: User_1.default, as: 'awnser_user' },
                    { model: CommentAwnsersLikes_1.default, as: 'awnser_likes' },
                    { model: CommentAwnsersDislikes_1.default, as: 'awnser_dislikes' }
                ]
            });
            io.emit('newCommentAnswer', newAnswer);
        });
    }
    static likeOrUnlikeAnswer(answerId, commentId, postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = websocket_1.default.getIO();
            const answerLike = yield LikesRepository_1.default.getAnswerLike(userId, postId, commentId, answerId);
            if (answerLike) {
                yield answerLike.destroy();
                io.emit('unlikeCommentAwnser', answerLike);
                return "¡Answer Unliked!";
            }
            const newLike = yield CommentAwnsersLikes_1.default.create({
                user_id: userId,
                post_id: postId,
                comment_id: commentId,
                awnser_id: answerId
            });
            io.emit('likeCommentAwnser', newLike);
            return "¡Answer Liked!";
        });
    }
    static dislikeOrUndislikeAnswer(answerId, commentId, postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = websocket_1.default.getIO();
            const answerDislike = yield DislikesRepository_1.default.getAnswerDislike(userId, postId, commentId, answerId);
            if (answerDislike) {
                yield answerDislike.destroy();
                io.emit('undislikeCommentAwnser', answerDislike);
                return "¡Answer Undisliked!";
            }
            const newDislike = yield CommentAwnsersDislikes_1.default.create({
                user_id: userId,
                comment_id: commentId,
                awnser_id: answerId,
                post_id: postId
            });
            io.emit('dislikeCommentAwnser', newDislike);
            return "¡Answer Disliked!";
        });
    }
}
exports.default = CommentService;
