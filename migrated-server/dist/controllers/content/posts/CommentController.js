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
const CommentService_1 = __importDefault(require("@services/content/posts/CommentService"));
class CommentController {
    static comment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentValue, postId } = req.body;
            yield CommentService_1.default.comment(commentValue, postId, req.user);
            res.status(201).json({
                "message": "¡Comment Created!"
            });
        });
    }
    static likeComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentId, postId } = req.body;
            const likedOrUnliked = yield CommentService_1.default.likeOrUnlikeComment(commentId, postId, req.user);
            res.status(200).json({
                "message": likedOrUnliked
            });
        });
    }
    static dislikeComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentId, postId } = req.body;
            const userId = req.account.user_id;
            const dislikedOrUndisliked = yield CommentService_1.default.dislikeOrUndislikeComment(commentId, postId, userId);
            res.status(200).json({
                "message": dislikedOrUndisliked
            });
        });
    }
    static answerComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { answerValue, commentId, postId } = req.body;
            yield CommentService_1.default.answerComment(commentId, postId, req.user, answerValue);
            res.status(201).json({
                "message": "¡Comment Answered!"
            });
        });
    }
    static likeCommentAnswer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentId, answerId, postId } = req.body;
            const userId = 1;
            const likedOrUnliked = yield CommentService_1.default.likeOrUnlikeAnswer(answerId, commentId, postId, userId);
            res.status(201).json({
                "message": likedOrUnliked
            });
        });
    }
    static dislikeCommentAnswer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { commentId, answerId, postId } = req.body;
            const userId = 1;
            const dislikedOrUndisliked = yield CommentService_1.default.dislikeOrUndislikeAnswer(answerId, commentId, postId, userId);
            res.status(200).json({
                "message": dislikedOrUndisliked
            });
        });
    }
}
exports.default = CommentController;
