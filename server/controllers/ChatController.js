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
                    as: 'messages',
                    include: [
                        {
                            model: User,
                            as: 'message_user' // Incluimos los datos del usuario que envió el mensaje
                        }
                    ]
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
                userToDisplayInfo = chat.Receiver;
            } else if(chat.Receiver.id == userDecoded.user_id) {
                userToDisplayInfo = chat.Sender;
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


const handleMessageSending = async (jwt_token, message, chat_id) => {
    try {
        
        const userDecoded = await
        tokenController.verifyJwtToken(jwt_token)
        
        const chatDoesExists = await
        Chat.findOne({
            where: { chat_id: chat_id }
        })
        
        if(!chatDoesExists) {
            throw new Error("Your conversation does not exist, Try again...")
        }
        
        console.log(`Data to compare: UserId: ${userDecoded.user_id}, chat sender id: ${chatDoesExists.sender_id}, chat sender id: ${chatDoesExists.receiver_id}`)
        
        if(
        userDecoded.user_id !== chatDoesExists.sender_id && userDecoded.user_id !== chatDoesExists.receiver_id
        ) {
            throw new Error("Not authorized to send messages here")
        }
        
       const newMessage =  await ChatService.handleMessageSending(userDecoded, message, chat_id)
       return newMessage
        
    } catch(e) {
        throw new Error(e)
    }
}

const checkIfAuthorized = async (jwtToken, room_id) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwtToken)
        
        const userChat = await Chat.findOne({
            where: { chat_id: room_id }
        })
        
        if(!userChat) {
            throw new Error("The conversation that you are looking for does not exist...")
        }
        
        if(userChat.sender_id !== userDecoded.user_id && userChat.receiver_id !== userDecoded.user_id ) {
            throw new Error("You are not authorized to connect on this chat.")
        } else if(userChat.sender_id == userDecoded.user_id || userChat.receiver_id == userDecoded.user_id) {
            return isAuthorized = true
        }
    
    } catch(e) {
        throw new Error(e)
    }
}

const getUserChats = async (jwtToken) => {
    try {
        const userDecoded = await
        tokenController.verifyJwtToken(jwtToken)
        const chatsWithUserInfo = await ChatService.getUserChats(userDecoded.user_id)
        if(chatsWithUserInfo) {
            return chatsWithUserInfo
        } else {
            throw new Error("Could not find your Chats, Try later...")
        }
    } catch(e) {
        throw new Error(e)
    }
}

const findUserChatById = async (jwtToken, chat_id) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwtToken);
        const databaseChat = await Chat.findOne({
            where: { 
                chat_id: chat_id,
                [Op.or]: {
                    sender_id: userDecoded.user_id,
                    receiver_id: userDecoded.user_id
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
        
        if (!databaseChat) {
            throw new Error("Could not find your chat...");
        }
        
        if (databaseChat.sender_id !== userDecoded.user_id && databaseChat.receiver_id !== userDecoded.user_id ) {
            throw new Error("You are not authorized to be in this chat.");
        } else {
            let userToDisplayInfo = databaseChat.sender_id === userDecoded.user_id ? databaseChat.Receiver : databaseChat.Sender;
            
            const userChat = {databaseChat, userToDisplayInfo};
            return userChat;
        }
    
    } catch (e) {
        throw new Error(`An error occurred`);
    }
};

module.exports = { 
    handleChat,
    handleMessageSending,
    checkIfAuthorized,
    getUserChats,
    findUserChatById
};