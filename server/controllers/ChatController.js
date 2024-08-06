const tokenController = require('./tokenController');
const User = require('../models/User');
const Chat = require('../models/Chat');
const ChatService = require('../services/ChatService');
const Message = require('../models/Message')
const { Op } = require('sequelize');

const handleChat = async (jwt_token, user_id) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwt_token);
        const userExists = await User.findByPk(user_id);

        if (!userExists) {
            throw new Error("User does not exist");
        }

        // Consulta para verificar chat en ambas direcciones
        let chat = await Chat.findOne({
            where: {
                [Op.or]: [
                    {
                        sender_id: userDecoded.user_id,
                        receiver_id: user_id
                    },
                    {
                        sender_id: user_id,
                        receiver_id: userDecoded.user_id
                    }
                ]
            },
            include: [
                {
                    model: Message,
                    as: 'messages'
                },
                {
                    model: User,
                    as: 'Sender' // Usa el alias definido para el usuario que envía el chat
                },
                {
                    model: User,
                    as: 'Receiver' // Usa el alias definido para el usuario que recibe el chat
                }
            ]
        });

        if (chat) {
            let userToDisplayInfo; 
            
              if(chat.Sender.id == userDecoded.user_id) {
                  userToDisplayInfo = chat.Receiver
              } else if(chat.Receiver.id == userDecoded.user_id ) {
                  userToDisplayInfo = chat.Sender
              }

            console.log('User to display info', userToDisplayInfo);

            return { exists: true, chat, userToDisplayInfo };
        }

        chat = await ChatService.createChat(userDecoded.user_id, user_id);
        return { exists: false, chat };
    } catch (e) {
        console.error('Error in handleChat:', e.message);
        throw new Error('Failed to handle chat');
    }
};

module.exports = { 
    handleChat
};