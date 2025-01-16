"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthRoutes_1 = __importDefault(require("./auth/AuthRoutes"));
const PostsRoutes_1 = __importDefault(require("./content/posts/PostsRoutes"));
const UsersRoutes_1 = __importDefault(require("./users/UsersRoutes"));
const ChatRoutes_1 = __importDefault(require("./chat/ChatRoutes"));
const ProfileRoutes_1 = __importDefault(require("./profile/ProfileRoutes"));
const router = express_1.default.Router();
router.use('/api/sofii/auth', AuthRoutes_1.default);
router.use('/api/sofii/posts', PostsRoutes_1.default);
router.use('/api/sofii/users', UsersRoutes_1.default);
router.use('/api/sofii/chats', ChatRoutes_1.default);
router.use('/api/sofii/profile', ProfileRoutes_1.default);
exports.default = router;
