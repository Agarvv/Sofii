const Chat = require('../models/Chat');

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

module.exports = { createChat };