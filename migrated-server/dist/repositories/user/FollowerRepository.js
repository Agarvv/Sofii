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
const Followers_1 = __importDefault(require("@models/users/Followers"));
const sequelize_1 = require("sequelize");
class FollowerRepository {
    static follow(followerId, followedId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Followers_1.default.create({
                follower_id: followerId,
                following_id: followedId
            });
        });
    }
    static unfollow(followerId, followedId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Followers_1.default.destroy({
                where: {
                    [sequelize_1.Op.or]: [
                        { follower_id: followerId, following_id: followedId },
                        { follower_id: followedId, following_id: followerId }
                    ]
                }
            });
        });
    }
    static getFollow(followerId, followedId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Followers_1.default.findOne({
                where: {
                    [sequelize_1.Op.or]: [
                        { follower_id: followerId, following_id: followedId },
                        { follower_id: followedId, following_id: followerId }
                    ]
                }
            });
        });
    }
}
exports.default = FollowerRepository;
