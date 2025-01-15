import CustomError from '@outils/CustomError';
import ChatRepository from "@repositories/chat/ChatRepository";
import Chat from "@models/chat/Chat";
import Message from "@models/chat/Message";
import { Model } from 'sequelize';
import User from "@models/users/User";

class ChatService {
   public static async getUserChats(userId: number): Promise<Chat[]> {
      const chats = await ChatRepository.getUserChats(userId);
      return chats;
   }

   public static async getChat(chatId: number, userId: number): Promise<Chat | null> {
        const chat = await ChatRepository.getChat(chatId, userId);

        return chat;
   }

   public static async startOrGetChat(senderId: number, receiverId: number): Promise<number>{
      const chat = await ChatRepository.getUserChat(senderId, receiverId); 
      
      if(chat) {
        this.checkIfAuthorizedToChat(chat, senderId)
        return chat.chat_id; 
      }

      const newChat = await Chat.create({
        sender_id: senderId,
        receiver_id: receiverId,
      })

      return newChat.chat_id;
   }

   public static checkIfAuthorizedToChat(chat: Chat, userId: number) {
     if(chat.sender_id !== userId || chat.receiver_id !== userId) {
        throw new CustomError("You arent authorized to interact on this chat.", 401); 
     }
   }

   public static async sendMessage() {

   }

   public static async getUserToDisplayInfo(chat: Chat, userId: number): Promise<User | null> {
     const userToDisplayInfoId = chat.sender_id == userId ? chat.receiver_id : chat.sender_id;
     return User.findByPk(userToDisplayInfoId); 
   }
}

export default ChatService; 