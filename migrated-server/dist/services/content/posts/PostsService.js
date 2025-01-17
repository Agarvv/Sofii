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
const PostsRepository_1 = __importDefault(require("@repositories/posts/PostsRepository"));
const LikesRepository_1 = __importDefault(require("@repositories/posts/LikesRepository"));
const SavedRepository_1 = __importDefault(require("@repositories/posts/SavedRepository"));
const Likes_1 = __importDefault(require("@models/posts/Likes"));
const SavedPost_1 = __importDefault(require("@models/posts/SavedPost"));
const CustomError_1 = __importDefault(require("@outils/CustomError"));
const NotificationsService_1 = __importDefault(require("@services/notifications/NotificationsService"));
const websocket_1 = __importDefault(require("@websocket/websocket"));
const User_1 = __importDefault(require("@models/users/User"));
class PostsService {
    static createPost(description, picture, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = websocket_1.default.getIO();
            const newPost = yield Post_1.default.create({
                description: description,
                postPicture: picture,
                user_id: userId,
            }, {
                include: [
                    {
                        model: User_1.default,
                        as: 'user'
                    },
                    {
                        model: Likes_1.default,
                        as: 'postLikes'
                    },
                    {
                        model: SavedPost_1.default,
                        as: 'saved_post'
                    },
                    {
                        model: Comment,
                        as: 'postComments'
                    }
                ]
            });
            io.emit('createdPost', newPost);
        });
    }
    static getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
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
    static likeOrDislike(postId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = websocket_1.default.getIO();
            const postLike = yield LikesRepository_1.default.getPostLike(postId, user.user_id);
            const post = yield PostsRepository_1.default.getPostWithoutDetails(postId);
            if (!post) {
                throw new CustomError_1.default("Post not found", 404);
            }
            if (postLike) {
                yield postLike.destroy();
                io.emit('unlikePost', postLike);
                return "Post Unliked!";
            }
            const newLike = yield Likes_1.default.create({
                post_id: postId,
                user_id: user.user_id
            });
            io.emit('likePost', newLike);
            if (user.user_id !== post.user_id) {
                yield NotificationsService_1.default.sendNotificationToUser(post.user_id, user.username, user.user_id, post, null, 'POST_LIKED');
            }
            return "Post Liked!";
        });
    }
    static saveOrUnsave(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = websocket_1.default.getIO();
            const saved = yield SavedRepository_1.default.getSaved(postId, userId);
            if (saved) {
                yield saved.destroy();
                io.emit('unsavedPost', saved);
                return "¡Post Unsaved!";
            }
            const newSaved = yield SavedPost_1.default.create({
                user_id: userId,
                post_id: postId
            });
            io.emit('savedPost', newSaved);
            return "¡Post Saved!";
        });
    }
}
exports.default = PostsService;
