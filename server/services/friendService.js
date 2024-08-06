const FriendRequest = require('../models/FriendRequest')
const User = require('../models/User')


const handleFriendRequest = async (user, friend_target) => {
    try {
        
        await FriendRequest.create({
            friend_target: friend_target,
            request_sender_id: user.user_id
        })
        
        const successMessage = "Request sendt sucesfully."
        return successMessage
        
    } catch(e) {
        throw new Error(e)
    }
}

const getFriendRequestsByUserId = async (user_id) => {
    try {
        const requests = await FriendRequest.findAll({
            where: { request_sender_id: user_id },
            include: [
                {
                    model: User,
                    as: 'sender',
                    attributes: ['username', 'email', 'profilePicture']
                },
                {
                    model: User,
                    as: 'target',
                    attributes: ['username', 'email', 'profilePicture']
                }
            ]
        });

        if (!requests) {
            throw new Error("Error while getting this user's friend requests.");
        }

        return requests;

    } catch (e) {
        throw new Error(e);
    }
};


module.exports = {
    handleFriendRequest,
    getFriendRequestsByUserId
}