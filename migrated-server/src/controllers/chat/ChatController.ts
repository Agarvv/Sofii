
import { Request, Response} from 'express';
import ChatService from '@services/chat/ChatService';

class ChatController {
    public static async chat(req: Request, res: Response) {
      const { receiverId } = req.body; 

      const chatId = await ChatService.startOrGetChat(req.user.user_id, receiverId); 

      res.status(200).json({
        chatId: chatId
      })
    }

    public static async getChatById(req: Request, res: Response) {
      const { id } = req.params; 

      const chat = await ChatService.getChat(Number(id), req.user.user_id); 

      res.status(200).json({
        chat: chat
      })
    }

    public static async getChats(req: Request, res: Response) {
      const chats = await ChatService.getUserChats(req.user.user_id); 

      res.status(200).json({
        chats: chats
      })
    }
}

export default ChatController; 