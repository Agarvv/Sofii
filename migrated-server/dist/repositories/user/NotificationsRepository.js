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
const Notifications_1 = __importDefault(require("@models/notifications/Notifications"));
const User_1 = __importDefault(require("@models/users/User"));
class NotificationsRepository {
    static getUserNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Notifications_1.default.findAll({
                where: { user_target: userId },
                include: [
                    {
                        model: User_1.default,
                        as: 'targetUser'
                    }
                ]
            });
        });
    }
    static deleteNotification(nId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = yield Notifications_1.default.destroy({
                where: {
                    id: nId,
                    user_target: userId
                }
            });
        });
    }
}
exports.default = NotificationsRepository;
