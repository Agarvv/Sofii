import CustomError from '@outils/CustomError';
import ChatRepository from "@repositories/chat/ChatRepository";
import Chat from "@models/chat/Chat";
import Message from "@models/chat/Message";
import { Model } from 'sequelize';
import User from "@models/users/User";
import NotificationsService from '@services/notifications/NotificationsService'
import Account from '../../types/Account';

class ChatService {
   
   public static async getUserChats(userId: number): Promise<Chat[]> {
    const chats = await ChatRepository.getUserChats(userId);

    const chatsWithUserInfo = await Promise.all(
        chats.map(async (chat) => {
            const chatData = chat.toJSON() as Chat & { userToDisplayInfo?: any };
            
            chatData.userToDisplayInfo = await this.getUserToDisplayInfo(chat, userId);
            return chatData;
        })
    );

    return chatsWithUserInfo;
}


   public static async getChat(chatId: number, userId: number):
   Promise<{ chat: Chat | null, userToDisplayInfo: User}> {
       
        const chat = await ChatRepository.getChat(chatId, userId);
        
        const userToDisplayInfo = await this.getUserToDisplayInfo(chat, userId); 
        
        return { chat, userToDisplayInfo } 
   }

   public static async startOrGetChat(senderId: number, receiverId: number): Promise<number> {
      const chat = await ChatRepository.getUserChat(senderId, receiverId); 
      
      if(chat) {
        return chat.chat_id; 
      }

      const newChat = await Chat.create({
        sender_id: senderId,
        receiver_id: receiverId,
      })

      return newChat.chat_id;
   }

   public static async sendMessage(message: string, chatId: number, sender: Account) {
       const chat = await ChatRepository.getChat(chatId, sender.user_id); 
       
       if(!chat) {
           throw new CustomError("Chat Not Found.", 404); 
       }
       
       const newMessage = await ChatRepository.createMessage(chatId, sender.user_id, message); 
       
       chat.last_message = message; 
       await chat.save(); 
        console.log(`sender: ${sender.user_id}, receiver: ${chat.receiver_id}`)

       const messageNotificationTarget = chat.sender_id == sender.user_id ? chat.receiver_id : chat.sender_id 
       console.log("notification target",messageNotificationTarget )
       await NotificationsService.sendNotificationToUser(
          messageNotificationTarget,
          sender.username,
          sender.user_id,
          chat, 
          message,
          'CHAT_MESSAGE'
       ); 
       
       return newMessage; 
   }
   
   public static async readMessage(messageId: number) {
       
       const message = await Message.findByPk(messageId); 
       
       if(message) {
           message.readed = true; 
           await message.save(); 
           return message
       }
       
       throw new CustomError("Message not found", 404)
   }

   private static async getUserToDisplayInfo(chat: any, userId: number): Promise<User> {
        return chat.Sender.id == userId ? chat.Receiver : chat.Sender; 
    }
}

export default ChatService; 
