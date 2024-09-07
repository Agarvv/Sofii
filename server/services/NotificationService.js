const Friends = require('../models/Friends');
const Notifications = require('../models/Notifications');
const { Op } = require('sequelize');
const User = require('../models/User')

const createForFriendNotification = async (user) => {
    try {
        const userFriends = await Friends.findAll({
            where: {
                [Op.or]: [
                    { friend_one_id: user.user_id },
                    { friend_two_id: user.user_id }
                ]
            }
        });
        
        if (userFriends.length > 0) {
            await Promise.all(userFriends.map(async (userFriend) => {
                const friendId = userFriend.friend_one_id == user.user_id 
                    ? userFriend.friend_two_id 
                    : userFriend.friend_one_id;
                
                await Notifications.create({
                    user_id: friendId,
                    user_target: user.user_id,
                    notification_type: "CREATED_POST",
                    notification: `${user.username} Created A New Post`
                });
            }));
        } 

    } catch (e) {
        throw new Error(e.message);  // Mejor manejo de errores para obtener un mensaje más útil.
    }
};

const sendNotificationToSingleUser = async (target, user, type) => {
    try {
        switch(type) {
            case 'POST_LIKED':
                await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: type,
                    notification: `${user.username} Liked Your Post`
                });
                break;
                
            case 'VIDEO_LIKED':
                await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: type,
                    notification: `${user.username} Liked Your Video`
                });
                break;
                
            case 'POST_COMMENT':
                await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'POST_COMMENT',
                    notification: `${user.username} Commented On Your Post`
                });
                break; 
                
            case 'VIDEO_COMMENT':
                await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'VIDEO_COMMENT',
                    notification: `${user.username} Commented On Your Video`
                });
                break;
                
            default:
                throw new Error('Unknown notification type');
        }
    } catch (e) {
        throw new Error(e);
    }
};

module.exports = {
    createForFriendNotification,
    sendNotificationToSingleUser
};