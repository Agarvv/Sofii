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
const ChatService_1 = __importDefault(require("@services/chat/ChatService"));
class ChatController {
    static chat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { receiverId } = req.body;
            const chatId = yield ChatService_1.default.startOrGetChat(req.user.user_id, receiverId);
            res.status(200).json({
                chatId: chatId
            });
        });
    }
    static getChatById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const chat = yield ChatService_1.default.getChat(Number(id), req.user.user_id);
            res.status(200).json({
                chat: chat
            });
        });
    }
    static getChats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const chats = yield ChatService_1.default.getUserChats(req.user.user_id);
            res.status(200).json({
                chats: chats
            });
        });
    }
}
exports.default = ChatController;
