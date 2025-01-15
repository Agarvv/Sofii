"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ValidationMiddleware_1 = require("@middleware/ValidationMiddleware");
const UsersController_1 = __importDefault(require("@controllers/users/UsersController"));
const BlockUserSchema_1 = __importDefault(require("@validation/users/BlockUserSchema"));
const FollowUserSchema_1 = __importDefault(require("@validation/users/FollowUserSchema"));
const SendFriendRequestSchema_1 = __importDefault(require("@validation/users/SendFriendRequestSchema"));
const FriendRequestSchema_1 = __importDefault(require("@validation/users/FriendRequestSchema"));
const usersRouter = express_1.default.Router();
usersRouter.post('/block', (0, ValidationMiddleware_1.validateRequest)(BlockUserSchema_1.default), UsersController_1.default.blockOrUnblock);
usersRouter.post('/follow', (0, ValidationMiddleware_1.validateRequest)(FollowUserSchema_1.default), UsersController_1.default.followOrUnfollow);
usersRouter.post('/friendRequest', (0, ValidationMiddleware_1.validateRequest)(SendFriendRequestSchema_1.default), UsersController_1.default.sendFriendRequest);
usersRouter.post('/friendRequest/accept', (0, ValidationMiddleware_1.validateRequest)(FriendRequestSchema_1.default), UsersController_1.default.acceptFriendRequest);
usersRouter.post('/friendRequest/deny', (0, ValidationMiddleware_1.validateRequest)(FriendRequestSchema_1.default), UsersController_1.default.denyFriendRequest);
exports.default = usersRouter;
