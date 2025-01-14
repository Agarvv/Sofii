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
const Likes_1 = __importDefault(require("@models/posts/Likes"));
const CommentLikes_1 = __importDefault(require("@models/posts/comments/CommentLikes"));
const CommentAwnsersLikes_1 = __importDefault(require("@models/posts/comments/CommentAwnsersLikes"));
class LikesRepository {
    static getPostLike(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Likes_1.default.findOne({
                where: {
                    user_id: userId,
                    post_id: postId
                }
            });
        });
    }
    static getCommentLike(userId, postId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CommentLikes_1.default.findOne({
                where: {
                    user_id: userId,
                    comment_id: commentId,
                    post_id: postId
                }
            });
        });
    }
    static getAnswerLike(userId, postId, commentId, answerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CommentAwnsersLikes_1.default.findOne({
                where: {
                    user_id: userId,
                    post_id: postId,
                    comment_id: commentId,
                    awnser_id: answerId
                }
            });
        });
    }
}
exports.default = LikesRepository;
