const Chat = require('../models/Chat');
const Message = require('../models/Message')
const { Op } = require('sequelize');
const User = require('../models/User')



const handleSindleMessage = async (user, data) => {
    try {
        // circular depenendcy issue, I have to require this file here
        const { sendNotificationToSingleUser } = require('./NotificationService')
        console.log('user: ', user, 'data: ', data)
        const createdMessage = await Message.create({
            message_room_id: data.chat_id,
            message_user_id: user.user_id,
            message_content: data.message
        })
        const newMessage = await
        Message.findOne({
            where: {
                id: createdMessage.id
            }, 
            include: [
               {
                   model: User,
                   as: 'message_user'
               }
            ]
        })

        const chatRoom = await Chat.findOne({
            where: {
                chat_id: data.chat_id
            }
        })

        chatRoom.last_message = data.message
       
        const notificationReceiver = chatRoom.sender_id == user.user_id ? chatRoom.receiver_id : chatRoom.sender_id
        
       // IT IS NOT RECOMENDED TO DO THIS IF YOUR APPLICATION IS BIG. TRY OPTIMIZING THE MORE AS YOU CAN THE DATABASE QUERIES.


     
        await sendNotificationToSingleUser(
            notificationReceiver, user, chatRoom, data.message, "CHAT_MESSAGE")
        return newMessage
        
    } catch(e) {
        throw e
    }
}

const handleMessageWithFile = async (user, data, fileType) => {
    try {
           // circular depenendcy issue, I have to require this file here
           const { sendNotificationToSingleUser } = require('./NotificationService')
           console.log('data: ', data)
           console.log('fileType: ', fileType)
           console.log('user: ', user)
        const createdMessage = await
        Message.create({
            message_room_id: data.chat_id,
            message_user_id: user.user_id,
            message_content: data.message,
            withFile: true,
            fileType: fileType,
            fileSource: data.file
        })
        
        const newMessage = await
        Message.findOne({
            where: {
                id: createdMessage.id
            }, 
            include: [
               {
                   model: User,
                   as: 'message_user'
               }
            ]
        })

        const chatRoom = await Chat.findOne({
            where: {
                chat_id: data.chat_id
            }
        })

        chatRoom.last_message = 'Sendt A File...'

        const notificationReceiver = chatRoom.sender_id == user.user_id ? chatRoom.receiver_id : chatRoom.sender_id
        
           // // const sendNotificationToSingleUser = async (target, user, content, type) => {
        await sendNotificationToSingleUser(
            notificationReceiver, user, chatRoom, null, "CHAT_MESSAGE_WITH_FILE")

        return newMessage
    } catch(e) {
        console.log(e)
        throw e
    }
}





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
    handleSindleMessage,
    handleMessageWithFile,
    getUserChats
};