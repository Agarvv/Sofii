"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthRoutes_1 = __importDefault(require("./auth/AuthRoutes"));
const PostsRoutes_1 = __importDefault(require("./content/posts/PostsRoutes"));
const router = express_1.default.Router();
router.use('/api/sofii/auth', AuthRoutes_1.default);
router.use('/api/sofii/posts', PostsRoutes_1.default);
exports.default = router;
