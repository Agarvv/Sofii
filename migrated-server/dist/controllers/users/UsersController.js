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
const UsersService_1 = __importDefault(require("@services/users/UsersService"));
class UsersController {
    static blockOrUnblock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const blockedOrUnblocked = yield UsersService_1.default.blockOrUnblock(userId, req.account.user_id);
            res.status(200).json({
                message: blockedOrUnblocked
            });
        });
    }
    static followOrUnfollow(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const followedOrUnfollowed = yield UsersService_1.default.followOrUnfollow(userId, req.account);
            res.status(200).json({
                message: followedOrUnfollowed
            });
        });
    }
    static getFriendsAndRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield UsersService_1.default.getFriendsAndRequests(req.account.user_id);
            res.status(200).json({
                data: data
            });
        });
    }
    static sendFriendRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            yield UsersService_1.default.sendFriendRequest(userId, req.account);
            res.status(200).json({
                message: "¡Friend Request Send!"
            });
        });
    }
    static denyFriendRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { requestId } = req.body;
            yield UsersService_1.default.denyFriendRequest(requestId, req.account);
            res.status(200).json({
                message: "¡Friend Request Denied!"
            });
        });
    }
    static acceptFriendRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { requestId } = req.body;
            yield UsersService_1.default.acceptFriendRequest(requestId, req.account);
            res.status(200).json({
                message: "¡Friend Request Accepted!"
            });
        });
    }
}
exports.default = UsersController;
