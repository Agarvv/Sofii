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
const Friends_1 = __importDefault(require("@models/users/Friends"));
const FriendRequest_1 = __importDefault(require("@models/users/FriendRequest"));
const sequelize_1 = require("sequelize");
class FriendRepository {
    static friendRequest(sender, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FriendRequest_1.default.create({
                request_sender_id: sender,
                friend_target: receiver
            });
        });
    }
    static friends(oneId, twoId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Friends_1.default.create({
                friend_one_id: oneId,
                friend_two_id: twoId
            });
        });
    }
    static unfriends(oneId, twoId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Friends_1.default.destroy({
                where: {
                    [sequelize_1.Op.or]: [
                        { friend_one_id: oneId, friend_two_id: twoId },
                        { friend_one_id: twoId, friend_two_id: oneId }
                    ]
                }
            });
            yield FriendRequest_1.default.destroy({
                where: {
                    [sequelize_1.Op.or]: [
                        { request_sender_id: oneId, friend_target: twoId },
                        { request_sender_id: twoId, friend_target: oneId }
                    ]
                }
            });
        });
    }
    static getFriendRequest(sender, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FriendRequest_1.default.findOne({
                where: {
                    [sequelize_1.Op.or]: [
                        { request_sender_id: sender, friend_target: receiver },
                        { request_sender_id: receiver, friend_target: sender }
                    ]
                }
            });
        });
    }
    static getFriendRequestById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield FriendRequest_1.default.findOne({
                where: {
                    id: id
                }
            });
        });
    }
    static getFriend(oneId, twoId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Friends_1.default.findOne({
                where: {
                    [sequelize_1.Op.or]: [
                        { friend_one_id: oneId, friend_two_id: twoId },
                        { friend_one_id: twoId, friend_two_id: oneId }
                    ]
                }
            });
        });
    }
}
exports.default = FriendRepository;
