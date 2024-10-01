const FriendRequest = require('../models/FriendRequest')
const User = require('../models/User')
const Friends = require('../models/Friends')
const {Op} = require('sequelize')

const { sendNotificationToSingleUser } = require('../services/NotificationService');

const getUserFriendsAndRequests = async (user) => {
    try {
        console.log('method user: ', user);
        const userFriends = await Friends.findAll({
            where: {
                [Op.or]: [
                    { friend_one_id: user.user_id },
                    { friend_two_id: user.user_id }
                ]
            },
            include: [
                {
                    model: User,
                    as: 'friendOne'
                },
                {
                    model: User,
                    as: 'friendTwo'
                }
            ]
        });

        // Crear el array de amigos a mostrar
        const friends = [];

        userFriends.forEach((userFriend) => {
            let friendToDisplayInfo;

            if (user.user_id === userFriend.friendOne.id) {
                friendToDisplayInfo = userFriend.friendTwo;
            } else if (user.user_id === userFriend.friendTwo.id) {
                friendToDisplayInfo = userFriend.friendOne;
            }

            // Asegúrate de que friendToDisplayInfo no sea undefined antes de agregarlo
            if (friendToDisplayInfo) {
                friends.push({ friendToDisplayInfo: friendToDisplayInfo});
            }
        });

        const userFriendsRequests = await FriendRequest.findAll({
            where: {
                friend_target: user.user_id
            },
            include: [
                {
                    model: User,
                    as: 'sender'
                }
            ]
        });

        return { friends, userFriendsRequests };
    } catch (error) {
        throw new Error(error);
    }
};


const handleFriendRequest = async (user, friend_target) => {
    try {
        
        const newRequest = await FriendRequest.create({
            friend_target: friend_target,
            request_sender_id: user.user_id
        })

        await sendNotificationToSingleUser(friend_target, user, newRequest, null, "FRIEND_REQUEST")
        
        return
        
    } catch(e) {
        console.log('not working', e)
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



const acceptFriendRequest = async (user, friend_request) => {
    try {

      
       const friendship =  await Friends.create({
            friend_one_id: user.user_id,
            friend_two_id: friend_request.request_sender_id
        })

        await friend_request.destroy()
        await  sendNotificationToSingleUser(request.friend_target, user, friendship, "ACCEPTED_FRIEND_REQUEST")

        return friendship
        
    } catch(e) {
        throw new Error(e)
    }
}

const denyFriendRequest = async () => {
    try {
         
    } catch(e) {
        throw new Error(e)
    }
}
 
module.exports = {
    handleFriendRequest,
    getFriendRequestsByUserId,
    getUserFriendsAndRequests,
    acceptFriendRequest,
    denyFriendRequest
}