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
const User_1 = __importDefault(require("@models/users/User"));
const Likes_1 = __importDefault(require("@models/posts/Likes"));
const SavedPost_1 = __importDefault(require("@models/posts/SavedPost"));
const Comment_1 = __importDefault(require("@models/posts/comments/Comment"));
const CommentLikes = require('@models/posts/comments/CommentLikes');
const CommentDislikes = require('@models/posts/comments/CommentDislikes');
const CommentAwnsersLikes = require('@models/posts/comments/CommentAwnsersLikes');
const CommentAwnsersDislikes = require('@models/posts/comments/CommentAwnsersDislikes');
const CommentAnswer = require('@models/posts/comments/CommentAwnser');
class PostsRepository {
    // finds the post with his likes, comments, saved relations.
    static getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.default.findOne({
                where: {
                    id: id
                },
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
                        model: Comment_1.default,
                        as: 'postComments'
                    }
                ]
            });
            return post;
        });
    }
    static findAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Post_1.default.findAll({
                include: [
                    {
                        model: User_1.default,
                        as: 'user',
                        attributes: ['username', 'profilePicture', 'id']
                    },
                    {
                        model: Comment_1.default,
                        as: 'postComments',
                        attributes: ['comment_content'],
                        include: [
                            {
                                model: User_1.default,
                                as: 'commentUser',
                                attributes: ['username', 'profilePicture', 'id']
                            }
                        ]
                    },
                    {
                        model: Likes_1.default,
                        as: 'postLikes'
                    },
                    {
                        model: SavedPost_1.default,
                        as: 'saved_post'
                    }
                ]
            });
        });
    }
    static getPostDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield Post_1.default.findOne({
                where: { id: id },
                include: [
                    {
                        model: User_1.default,
                        as: 'user'
                    },
                    {
                        model: Comment_1.default,
                        as: 'postComments',
                        include: [
                            {
                                model: User_1.default,
                                as: 'commentUser'
                            },
                            {
                                model: CommentLikes,
                                as: 'comment_likes'
                            },
                            {
                                model: CommentDislikes,
                                as: 'comment_dislikes'
                            },
                            {
                                model: CommentAnswer,
                                as: 'awnsers',
                                include: [
                                    {
                                        model: User_1.default,
                                        as: 'awnser_user'
                                    },
                                    {
                                        model: CommentAwnsersLikes,
                                        as: 'awnser_likes'
                                    },
                                    {
                                        model: CommentAwnsersDislikes,
                                        as: 'awnser_dislikes'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: Likes_1.default,
                        as: 'postLikes'
                    },
                    {
                        model: SavedPost_1.default,
                        as: 'saved_post'
                    }
                ]
            });
        });
    }
    static getPostWithoutDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Post_1.default.findOne({
                where: {
                    id: id
                }
            });
        });
    }
}
exports.default = PostsRepository;
