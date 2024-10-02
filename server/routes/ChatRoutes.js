const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');

router.post('/chat', async (req, res) => {
    try {
        console.log("Chat req body: ", req.body)
        const jwt_token = req.cookies.jwt;
        const user_id = req.body.user_id;

        const chatResult = await ChatController.handleChat(jwt_token, user_id);

        if (chatResult.exists) {
            return res.status(200).json({ message: 'Chat already exists', chat: chatResult.chat, userToDisplayInfo: chatResult.userToDisplayInfo });
        } else {
            return res.status(201).json({ message: 'Chat created successfully', chat: chatResult.chat });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/chats',async (req, res) => {
    try {
        const jwt_token = req.cookies.jwt 
        const chatsWithUserInfo = await ChatController.getUserChats(jwt_token)
        return res.status(201).json({ chats: chatsWithUserInfo})
        
    } catch(e) {
        console.log('errno', e)
        return res.status(500).json({error: e.message})
    }
})

router.post('/user_chat/:chat_id', async (req, res) => {
    try {
        
        const chat_id = req.params.chat_id 
        const jwtToken = req.cookies.jwt
        
        if(!chat_id) {
            return res.status(404).json({error: 'Some data is missing on your request.'})
        }
        
        const userChat = await 
        ChatController.findUserChatById(jwtToken, chat_id)
        if(userChat) {
            return res.status(201).json({chat: userChat})
        } else {
            return res.status(500).json({error: 'Could not find your chat, try again...'})
        }
        
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: 'Internal Server Error !'})
    }
})

module.exports = router;