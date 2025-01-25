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
const BlockRepository_1 = __importDefault(require("@repositories/user/BlockRepository"));
const FollowerRepository_1 = __importDefault(require("@repositories/user/FollowerRepository"));
const FriendRepository_1 = __importDefault(require("@repositories/user/FriendRepository"));
const User_1 = __importDefault(require("@models/users/User"));
const CustomError_1 = __importDefault(require("@outils/CustomError"));
const NotificationsService_1 = __importDefault(require("@services/notifications/NotificationsService"));
const websocket_1 = __importDefault(require("@websocket/websocket"));
class UsersService {
    static blockOrUnblock(blockedId, blockerId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (blockedId === blockerId)
                throw new CustomError_1.default("You can't block yourself.", 400);
            const target = yield User_1.default.findOne({ where: { id: blockedId } });
            if (!target)
                throw new CustomError_1.default('User to block not found.', 404);
            const existingBlock = yield BlockRepository_1.default.getBlocked(blockedId, blockerId);
            if (existingBlock) {
                yield existingBlock.destroy();
                return 'UNBLOCKED';
            }
            yield this.destroyAnySocialRelations(blockedId, blockerId);
            yield BlockRepository_1.default.block(blockerId, blockedId);
            return 'BLOCKED';
        });
    }
    static followOrUnfollow(followedId, follower) {
        return __awaiter(this, void 0, void 0, function* () {
            if (followedId === follower.user_id)
                throw new CustomError_1.default("You can't follow yourself.", 400);
            const follow = yield FollowerRepository_1.default.getFollow(follower.user_id, followedId);
            const io = websocket_1.default.getIO();
            if (follow) {
                yield follow.destroy();
                io.emit('unfollowedUser', follow);
                return 'UNFOLLOWED';
            }
            const newFollow = yield FollowerRepository_1.default.follow(follower.user_id, followedId);
            io.emit('newFollower', newFollow);
            yield NotificationsService_1.default.sendNotificationToUser(followedId, follower.username, follower.user_id, newFollow, null, 'NEW_FOLLOWER');
            return 'FOLLOWED';
        });
    }
    static getFriendsAndRequests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const friends = yield FriendRepository_1.default.getUserFriends(userId);
            const requests = yield FriendRepository_1.default.getUserFriendRequests(userId);
            return { friends, requests };
        });
    }
    static sendFriendRequest(receiverId, sender) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingRequest = yield FriendRepository_1.default.getFriendRequest(sender.user_id, receiverId);
            if (existingRequest)
                throw new CustomError_1.default('You have already sent a friend request to this user.', 400);
            const existingFriend = yield FriendRepository_1.default.getFriend(sender.user_id, receiverId);
            if (existingFriend)
                throw new CustomError_1.default('You are already friends with this user.', 409);
            const friendRequest = yield FriendRepository_1.default.friendRequest(sender.user_id, receiverId);
            yield NotificationsService_1.default.sendNotificationToUser(receiverId, sender.username, sender.user_id, friendRequest, null, 'FRIEND_REQUEST');
        });
    }
    static denyFriendRequest(requestId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const friendRequest = yield FriendRepository_1.default.getFriendRequestById(requestId);
            if (!friendRequest)
                throw new CustomError_1.default('Friend request not found.', 404);
            if (friendRequest.friend_target !== user.user_id) {
                throw new CustomError_1.default('You are not authorized to deny this friend request.', 401);
            }
            yield friendRequest.destroy();
        });
    }
    static acceptFriendRequest(requestId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const friendRequest = yield FriendRepository_1.default.getFriendRequestById(requestId);
            if (!friendRequest)
                throw new CustomError_1.default('Friend request not found.', 404);
            if (friendRequest.friend_target !== user.user_id) {
                throw new CustomError_1.default('You are not authorized to accept this friend request.', 401);
            }
            yield FriendRepository_1.default.friends(friendRequest.request_sender_id, friendRequest.friend_target);
            yield friendRequest.destroy();
            yield NotificationsService_1.default.sendNotificationToUser(friendRequest.request_sender_id, user.username, user.user_id, friendRequest, null, 'ACCEPTED_FRIEND_REQUEST');
        });
    }
    static destroyAnySocialRelations(userId1, userId2) {
        return __awaiter(this, void 0, void 0, function* () {
            yield FriendRepository_1.default.unfriends(userId1, userId2);
            yield FollowerRepository_1.default.unfollow(userId1, userId2);
        });
    }
}
exports.default = UsersService;
