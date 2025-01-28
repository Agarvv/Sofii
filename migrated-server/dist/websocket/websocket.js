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
const JwtHelper_1 = __importDefault(require("@helpers/JwtHelper"));
const socket_io_1 = require("socket.io");
const cookie_1 = __importDefault(require("cookie"));
const ChatService_1 = __importDefault(require("@services/chat/ChatService"));
const ProfileService_1 = __importDefault(require("@services/profile/ProfileService"));
let io = null;
exports.default = {
    init: (server) => {
        io = new socket_io_1.Server(server, {
            cors: {
                origin: 'https://sofii-vsly.vercel.app',
                methods: ['GET', 'POST'],
                credentials: true,
            },
        });
        io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
            const cookies = socket.request.headers.cookie
                ? cookie_1.default.parse(socket.request.headers.cookie)
                : {};
            const jwtToken = cookies.jwt;
            if (!jwtToken)
                return;
            const userDecoded = yield JwtHelper_1.default.verifyToken(jwtToken);
            socket.join(userDecoded.user_id);
            yield ProfileService_1.default.setUserStatus('online', userDecoded.user_id);
            socket.on('chatMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
                const { message, chat_id } = data;
                socket.join(String(chat_id));
                const newMessage = yield ChatService_1.default.sendMessage(message, chat_id, userDecoded);
                io === null || io === void 0 ? void 0 : io.to(String(chat_id)).emit('chatMessage', newMessage);
            }));
            socket.on('typing', (chatId) => {
                socket.join(chatId);
                socket.to(chatId).emit('typing');
            });
            socket.on('stopTyping', (chatId) => {
                socket.join(chatId);
                socket.to(chatId).emit('stopTyping');
            });
            socket.on('readMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
                socket.join(String(data.chatId));
                const readedMessage = yield ChatService_1.default.readMessage(data.messageId);
                socket.to(String(data.chatId)).emit('readMessage', readedMessage);
            }));
            socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
                yield ProfileService_1.default.setUserStatus('offline', userDecoded.user_id);
            }));
        }));
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('Socket.io not Initialized');
        }
        return io;
    },
};
