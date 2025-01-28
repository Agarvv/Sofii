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
const PostsService_1 = __importDefault(require("@services/content/posts/PostsService"));
class PostsController {
    static createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { description, picture } = req.body;
            const userId = req.account.user_id;
            yield PostsService_1.default.createPost(description, picture, userId);
            res.status(201).json({
                message: "Post Created!"
            });
        });
    }
    static getPostsAndUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield PostsService_1.default.getPostsAndUsersMayLike();
            res.status(200).json({
                "data": posts
            });
        });
    }
    static GetPostById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield PostsService_1.default.getPostDetails(Number(req.params.id));
            res.status(200).json({
                "post": post
            });
        });
    }
    static likeOrUnlike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId } = req.body;
            const likedOrUnliked = yield PostsService_1.default.likeOrDislike(postId, req.account);
            res.status(200).json({
                message: likedOrUnliked
            });
        });
    }
    static saveOrUnsave(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { postId } = req.body;
            const savedOrUnsaved = yield PostsService_1.default.saveOrUnsave(postId, req.account.user_id);
            res.status(200).json({
                message: savedOrUnsaved
            });
        });
    }
    static getSaveds(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const saveds = yield PostsService_1.default.getSaveds(req.account.user_id);
            res.status(200).json({
                saveds: saveds
            });
        });
    }
}
exports.default = PostsController;
