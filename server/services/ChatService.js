const Chat = require('../models/Chat');
const Message = require('../models/Message')
const { Op } = require('sequelize');
const User = require('../models/User')

const createChat = async (sender_id, receiver_id) => {
    try {
        console.log("")
        const chat = await Chat.create({
            sender_id,
            receiver_id,
            last_message: "This is your first conversation."
        });

        return chat;
    } catch (e) {
        console.error('Error in createChat:', e.message);
        throw new Error('Failed to create chat');
    }
};

const handleMessageSending = async ( user, message, chat_id) => {
    try {
       const newMessage =  await Message.create({
            message_room_id: chat_id,
            message_user_id: user.user_id,
            message_content: message
        })
        
        return newMessage
        
        
    } catch(e) {
        throw new Error(e)
    }
}

const getUserChats = async (user_id) => {
    try {
        // Obtiene los chats en los que el usuario está involucrado
        const userChats = await Chat.findAll({
            where: {
                [Op.or]: [
                    { sender_id: user_id },
                    { receiver_id: user_id }
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

        // Si se encuentran chats, se procesa la información para cada uno
        if (userChats) {
            const chatsWithUserInfo = userChats.map(chat => {
                // Determina si el usuario actual es el remitente o el receptor
                let userToDisplayInfo;
                if (user_id === chat.sender_id) {
                    userToDisplayInfo = chat.Receiver; // El receptor del mensaje
                } else {
                    userToDisplayInfo = chat.Sender; // El remitente del mensaje
                }

                // Retorna el chat con la información del usuario adicional
                return {
                    ...chat.toJSON(),
                    userToDisplayInfo
                };
            });

            return chatsWithUserInfo;
        } else {
            throw new Error('not messagejsjwd')
        }
        
        return []; // Retorna un array vacío si no hay chats
    } catch (e) {
        throw new Error(e);
    }
};

module.exports = { 
    createChat,
    handleMessageSending,
    getUserChats
};