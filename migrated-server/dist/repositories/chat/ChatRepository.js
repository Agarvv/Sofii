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
const Chat_1 = __importDefault(require("@models/chat/Chat"));
const Message_1 = __importDefault(require("@models/chat/Message"));
const User_1 = __importDefault(require("@models/users/User"));
const sequelize_1 = require("sequelize");
class ChatRepository {
    static getUserChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Chat_1.default.findAll({
                where: {
                    [sequelize_1.Op.or]: [
                        { sender_id: userId },
                        { receiver_id: userId }
                    ]
                },
                include: [
                    {
                        model: User_1.default,
                        as: 'Sender',
                        attributes: ['id', 'username', 'profilePicture', 'active']
                    },
                    {
                        model: User_1.default,
                        as: 'Receiver',
                        attributes: ['id', 'username', 'profilePicture', 'active']
                    }
                ]
            });
        });
    }
    static getChat(chatId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Chat_1.default.findOne({
                where: {
                    chat_id: chatId,
                    [sequelize_1.Op.or]: {
                        sender_id: userId,
                        receiver_id: userId
                    }
                },
                include: [
                    {
                        model: User_1.default,
                        as: 'Sender',
                        attributes: ['id', 'username', 'profilePicture', 'active']
                    },
                    {
                        model: User_1.default,
                        as: 'Receiver',
                        attributes: ['id', 'username', 'profilePicture', 'active']
                    },
                    {
                        model: Message_1.default,
                        as: 'messages',
                        include: [
                            {
                                model: User_1.default,
                                as: 'message_user',
                                attributes: ['id', 'username', 'profilePicture', 'active']
                            }
                        ]
                    }
                ]
            });
        });
    }
    static getUserChat(sender, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Chat_1.default.findOne({
                where: {
                    [sequelize_1.Op.or]: [
                        {
                            sender_id: receiver,
                            receiver_id: sender
                        },
                        {
                            sender_id: sender,
                            receiver_id: receiver
                        }
                    ]
                },
                include: [
                    {
                        model: Message_1.default,
                        as: 'messages',
                        include: [
                            {
                                model: User_1.default,
                                as: 'message_user',
                                attributes: ['id', 'username', 'profilePicture', 'active']
                            }
                        ]
                    },
                    {
                        model: User_1.default,
                        as: 'Sender',
                        attributes: ['id', 'username', 'profilePicture', 'active']
                    },
                    {
                        model: User_1.default,
                        as: 'Receiver',
                        attributes: ['id', 'username', 'profilePicture', 'active']
                    }
                ]
            });
        });
    }
    static createMessage(chatId, senderId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdMessage = yield Message_1.default.create({
                message_room_id: chatId,
                message_user_id: senderId,
                message_content: message
            });
            // need to emit back to the client the message with his user relation
            const newMessage = yield Message_1.default.findOne({
                where: {
                    id: createdMessage.id
                },
                include: [
                    {
                        model: User_1.default,
                        as: 'message_user'
                    }
                ]
            });
            if (newMessage)
                return newMessage;
        });
    }
}
exports.default = ChatRepository;
