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
const CustomError_1 = __importDefault(require("@outils/CustomError"));
const ChatRepository_1 = __importDefault(require("@repositories/chat/ChatRepository"));
const Chat_1 = __importDefault(require("@models/chat/Chat"));
const Message_1 = __importDefault(require("@models/chat/Message"));
const User_1 = __importDefault(require("@models/users/User"));
const NotificationsService_1 = __importDefault(require("@services/notifications/NotificationsService"));
class ChatService {
    static getUserChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chats = yield ChatRepository_1.default.getUserChats(userId);
            return chats;
        });
    }
    static getChat(chatId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield ChatRepository_1.default.getChat(chatId, userId);
            return chat;
        });
    }
    static startOrGetChat(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield ChatRepository_1.default.getUserChat(senderId, receiverId);
            if (chat) {
                return chat.chat_id;
            }
            const newChat = yield Chat_1.default.create({
                sender_id: senderId,
                receiver_id: receiverId,
            });
            return newChat.chat_id;
        });
    }
    static checkIfAuthorizedToChat(chat, userId) {
        if (chat.sender_id !== userId || chat.receiver_id !== userId) {
            throw new CustomError_1.default("You arent authorized to interact on this chat.", 401);
        }
    }
    static sendMessage(message, chatId, sender) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield ChatRepository_1.default.getChat(chatId, sender.user_id);
            if (!chat) {
                throw new CustomError_1.default("Chat Not Found.", 404);
            }
            const newMessage = yield ChatRepository_1.default.createMessage(chatId, sender.user_id, message);
            chat.last_message = message;
            yield chat.save();
            const messageNotificationTarget = chat.sender_id == sender.user_id ? chat.receiver_id : chat.sender_id;
            yield NotificationsService_1.default.sendNotificationToUser(messageNotificationTarget, sender.username, sender.user_id, chat, message, 'CHAT_MESSAGE');
            return newMessage;
        });
    }
    static readMessage(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield Message_1.default.findByPk(messageId);
            if (message) {
                message.readed = true;
                yield message.save();
                return message;
            }
            throw new CustomError_1.default("Message not found", 404);
        });
    }
    static getUserToDisplayInfo(chat, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToDisplayInfoId = chat.sender_id == userId ? chat.receiver_id : chat.sender_id;
            return User_1.default.findByPk(userToDisplayInfoId);
        });
    }
}
exports.default = ChatService;
