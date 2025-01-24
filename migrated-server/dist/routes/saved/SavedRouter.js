"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PostsController_1 = __importDefault(require("@controllers/content/posts/PostsController"));
const savedPostsRouter = express_1.default.Router();
savedPostsRouter.get('/', PostsController_1.default.getSaveds);
exports.default = savedPostsRouter;
