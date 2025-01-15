import Chat from "@models/chat/Chat";
import Message from "@models/chat/Message";
import User from "@models/users/User";
import { Op } from "sequelize";

class ChatRepository {
    public static async getUserChats(userId: number): Promise<Chat[]> {
        return await Chat.findAll({
            where: {
                [Op.or]: [
                    { sender_id: userId },
                    { receiver_id: userId }
                ]
            }, 
            include: [
                {
                    model: User,
                    as: 'Sender'
                },
                {
                    model: User,
                    as: 'Receiver'
                }
            ]
        });
    }

    public static async getChat(chatId: number, userId: number) {
        return await Chat.findOne({
            where: { 
                chat_id: chatId,
                [Op.or]: {
                    sender_id: userId,
                    receiver_id: userId
                }
            },
            include: [
                {
                    model: User,
                    as: 'Sender'
                },
                {
                    model: User,
                    as: 'Receiver'
                },
                {
                    model: Message,
                    as: 'messages',
                    include: [
                       {
                           model: User,
                           as: 'message_user'
                       }
                    ]
                }
            ]
        });
    }

    public static async getUserChat(sender: number, receiver: number): Promise<Chat | null>{
        return await Chat.findOne({
            where: {
                [Op.or]: [
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
                    model: Message,
                    as: 'messages',
                    include: [
                        {
                            model: User,
                            as: 'message_user' 
                        }
                    ]
                },
                {
                    model: User,
                    as: 'Sender' 
                },
                {
                    model: User,
                    as: 'Receiver' 
                }
            ]
        });
    }
}

export default ChatRepository; 