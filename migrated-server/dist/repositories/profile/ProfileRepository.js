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
const User_1 = __importDefault(require("@models/users/User"));
const Post_1 = __importDefault(require("@models/posts/Post"));
const Comment_1 = __importDefault(require("@models/posts/comments/Comment"));
const Likes_1 = __importDefault(require("@models/posts/Likes"));
const Friends_1 = __importDefault(require("@models/users/Friends"));
const FriendRequest_1 = __importDefault(require("@models/users/FriendRequest"));
const SavedPost_1 = __importDefault(require("@models/posts/SavedPost"));
const Blocked_1 = __importDefault(require("@models/users/Blocked"));
const sequelize_1 = require("sequelize");
class ProfileRepository {
    static getUserProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.findOne({
                where: { id: userId },
                include: [
                    {
                        model: Post_1.default,
                        as: 'posts',
                        include: [
                            { model: User_1.default, as: 'user' },
                            { model: Comment_1.default, as: 'postComments' },
                            { model: Likes_1.default, as: 'postLikes' },
                            { model: SavedPost_1.default, as: 'saved_post' }
                        ]
                    },
                    {
                        model: FriendRequest_1.default,
                        as: 'sentRequests'
                    },
                    {
                        model: FriendRequest_1.default,
                        as: 'receivedRequests'
                    },
                    {
                        model: User_1.default,
                        as: 'followers'
                    },
                    {
                        model: User_1.default,
                        as: 'following'
                    },
                    {
                        model: User_1.default,
                        as: 'friends',
                        through: {
                            model: Friends_1.default,
                            where: {
                                [sequelize_1.Op.or]: [
                                    { friend_one_id: userId },
                                    { friend_two_id: userId }
                                ]
                            },
                            attributes: []
                        }
                    },
                    {
                        model: User_1.default,
                        as: 'friendsOf',
                        through: {
                            model: Friends_1.default,
                            attributes: []
                        }
                    },
                    {
                        model: Blocked_1.default,
                        as: 'users_blocked_me'
                    }
                ]
            });
        });
    }
}
exports.default = ProfileRepository;
