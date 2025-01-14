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
const Post_1 = __importDefault(require("@models/posts/Post"));
const websocket_1 = __importDefault(require("@websocket/websocket"));
const PostsRepository_1 = __importDefault(require("@repositories/posts/PostsRepository"));
class PostsService {
    static createPost(description, picture, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = yield Post_1.default.create({
                description: description,
                postPicture: picture,
                user_id: userId,
            });
            // i need to emit back to the client a post with likes saved and comment relations.
            const fullPost = yield PostsRepository_1.default.getPostById(newPost.id);
            this.io.emit('createdPost', fullPost);
        });
    }
    static getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            // need posts with some relations.
            return yield PostsRepository_1.default.findAllPosts();
        });
    }
    static getPostDetails(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield PostsRepository_1.default.getPostDetails(postId);
            return post;
        });
    }
    static deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield PostsRepository_1.default.getPostById(id);
            yield post.destroy();
        });
    }
}
PostsService.io = websocket_1.default.getIO();
exports.default = PostsService;
