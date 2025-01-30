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
const websocket_1 = __importDefault(require("@websocket/websocket"));
const NotificationsRepository_1 = __importDefault(require("@repositories/user/NotificationsRepository"));
const User_1 = __importDefault(require("@models/users/User"));
class NotificationsService {
    static getUserNotifications(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NotificationsRepository_1.default.getUserNotifications(userId);
        });
    }
    static deleteUserNotification(notificationId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield NotificationsRepository_1.default.deleteNotification(notificationId, userId);
        });
    }
    static sendNotificationToUser(target, user_name, user_id, content, chat_message, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = websocket_1.default.getIO();
            const notificationText = {
                POST_LIKED: `${user_name} Liked Your Post: "${content.description}"`,
                FRIEND_REQUEST: `${user_name} Sendt You A Friend Request!`,
                NEW_FOLLOWER: `${user_name} Started Following You!`,
                ACCEPTED_FRIEND_REQUEST: `${user_name} Acepted Your Friend Request!`,
                CHAT_MESSAGE: `${user_name} Sendt You A Message: "${chat_message}"`,
            };
            if (!(type in notificationText)) {
                throw new Error(`Unknown notification type: ${type}`);
            }
            const originalNotification = yield Notifications_1.default.create({
                user_id: user_id,
                user_target: target,
                notification_type: type,
                notification: notificationText[type],
                type_id: content.id || content.post_id || content.video_id || content.sender_id || content.friend_one_id || content.request_sender_id || user_id
            });
            const fullNotification = yield Notifications_1.default.findOne({
                where: {
                    id: originalNotification.id
                },
                include: [
                    {
                        model: User_1.default,
                        as: 'targetUser'
                    },
                    {
                        model: User_1.default,
                        as: 'sender'
                    }
                ]
            });
            io.to(String(target)).emit('newNotification', fullNotification);
            //io.emit('newNotification', originalNotification);
        });
    }
}
exports.default = NotificationsService;
