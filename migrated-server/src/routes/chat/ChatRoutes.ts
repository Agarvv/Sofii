import express from "express";
import ChatController from "@controllers/chat/ChatController";
import chatCreationSchema from '@validation/chat/ChatCreationSchema'
import { validateRequest } from '@middleware/ValidationMiddleware'


const chatRouter = express.Router(); 

chatRouter.get('/',
  ChatController.getChats
)

chatRouter.get('/:id',
    ChatController.getChatById
)

chatRouter.post('/', 
  validateRequest(chatCreationSchema),
  ChatController.chat
)

export default chatRouter;  