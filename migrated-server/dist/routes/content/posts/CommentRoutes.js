"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ValidationMiddleware_1 = require("@middleware/ValidationMiddleware");
const CommentController_1 = __importDefault(require("@controllers/content/posts/CommentController"));
const CreateCommentSchema_1 = require("@validation/posts/comments/CreateCommentSchema");
const AnswerCommentSchema_1 = require("@validation/posts/comments/AnswerCommentSchema");
const LikeCommentSchema_1 = require("@validation/posts/comments/LikeCommentSchema");
const DislikeCommentSchema_1 = require("@validation/posts/comments/DislikeCommentSchema");
const LikeCommentAnswerSchema_1 = require("@validation/posts/comments/LikeCommentAnswerSchema");
const DislikeCommentAnswerSchema_1 = require("@validation/posts/comments/DislikeCommentAnswerSchema");
const commentRoutes = express_1.default.Router();
// create comment 
commentRoutes.post('/', (0, ValidationMiddleware_1.validateRequest)(CreateCommentSchema_1.createCommentSchema), CommentController_1.default.comment);
// answer comment 
commentRoutes.post('/answer', (0, ValidationMiddleware_1.validateRequest)(AnswerCommentSchema_1.answerCommentSchema), CommentController_1.default.answerComment);
// like comment 
commentRoutes.post('/like', (0, ValidationMiddleware_1.validateRequest)(LikeCommentSchema_1.likeCommentSchema), CommentController_1.default.likeComment);
// dislike comment 
commentRoutes.post('/dislike', (0, ValidationMiddleware_1.validateRequest)(DislikeCommentSchema_1.dislikeCommentSchema), CommentController_1.default.dislikeComment);
// like comment answer
commentRoutes.post('/answers/like', (0, ValidationMiddleware_1.validateRequest)(LikeCommentAnswerSchema_1.likeCommentAnswerSchema), CommentController_1.default.likeCommentAnswer);
// dislike comment answer 
commentRoutes.post('/answers/dislike', (0, ValidationMiddleware_1.validateRequest)(DislikeCommentAnswerSchema_1.dislikeCommentAnswerSchema), CommentController_1.default.dislikeCommentAnswer);
exports.default = commentRoutes;
