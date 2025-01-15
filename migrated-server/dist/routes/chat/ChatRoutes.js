"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ChatController_1 = __importDefault(require("@controllers/chat/ChatController"));
const ChatCreationSchema_1 = __importDefault(require("@validation/chat/ChatCreationSchema"));
const ValidationMiddleware_1 = require("@middleware/ValidationMiddleware");
const chatRouter = express_1.default.Router();
chatRouter.get('/', ChatController_1.default.getChats);
chatRouter.get('/:id', ChatController_1.default.getChatById);
chatRouter.post('/', (0, ValidationMiddleware_1.validateRequest)(ChatCreationSchema_1.default), ChatController_1.default.chat);
exports.default = chatRouter;
