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
const SavedPost_1 = __importDefault(require("@models/posts/SavedPost"));
const Post_1 = __importDefault(require("@models/posts/Post"));
const User_1 = __importDefault(require("@models/users/User"));
const Likes_1 = __importDefault(require("@models/posts/Likes"));
const Comment_1 = __importDefault(require("@models/posts/comments/Comment"));
class SavedRepository {
    static getSaved(postId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return SavedPost_1.default.findOne({
                where: {
                    user_id: userId,
                    post_id: postId
                }
            });
        });
    }
    static getSaveds(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const saveds = yield SavedPost_1.default.findAll({
                where: {
                    user_id: userId
                },
                include: [{
                        model: Post_1.default,
                        as: 'saved_post',
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
                    }]
            });
            return saveds;
        });
    }
}
exports.default = SavedRepository;
