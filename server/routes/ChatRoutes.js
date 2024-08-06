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

module.exports = router;