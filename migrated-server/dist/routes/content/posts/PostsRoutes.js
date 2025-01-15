"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommentRoutes_1 = __importDefault(require("./CommentRoutes"));
const PostsController_1 = __importDefault(require("@controllers/content/posts/PostsController"));
const PostCreationSchema_1 = require("@validation/posts/PostCreationSchema");
const ValidationMiddleware_1 = require("@middleware/ValidationMiddleware");
const LikePostSchema_1 = __importDefault(require("@validation/posts/LikePostSchema"));
const postsRouter = express_1.default.Router();
postsRouter.use('/comments', CommentRoutes_1.default);
postsRouter.get('/', PostsController_1.default.GetPosts);
postsRouter.get('/:id', PostsController_1.default.GetPostById);
postsRouter.post('/', (0, ValidationMiddleware_1.validateRequest)(PostCreationSchema_1.postCreationSchema), PostsController_1.default.createPost);
postsRouter.post('/like', (0, ValidationMiddleware_1.validateRequest)(LikePostSchema_1.default), PostsController_1.default.likeOrUnlike);
exports.default = postsRouter;
