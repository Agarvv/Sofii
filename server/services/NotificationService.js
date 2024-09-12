const Friends = require('../models/Friends');
const Notifications = require('../models/Notifications');
const { Op } = require('sequelize');
const User = require('../models/User')
const websocket = require('../websocket')

const createForFriendNotification = async (user, post) => {
    try {
        const io = websocket.getIO()
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
                
                const notification = await Notifications.create({
                    user_id: friendId,
                    user_target: user.user_id,
                    notification_type: "CREATED_POST",
                    notification: `${user.username} Created A New Post`,
                    type_id: post.id
                });
                
                const fullNotification = await Notifications.findOne({
                    where: {
                        id: notification.id
                    },
                    include: [
                      {
                          model: User,
                          as: 'targetUser'
                      }
                    ]
                })
                
                
                io.to(friendId).emit('newNotification', fullNotification)
            }));
        } 

    } catch (e) {
        throw new Error(e.message);  // Mejor manejo de errores para obtener un mensaje más útil.
    }
};

const sendNotificationToSingleUser = async (target, user, content, type) => {
    try {
        const io = websocket.getIO()
        console.log(`data: TARGET: ${target}, USER: ${user}, CONTENT: ${content}, type: ${type}`)
        
        let originalNotification;
        let fullNotification;
        switch(type) {
            case 'POST_LIKED':
               originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: type,
                    notification: `${user.username} Liked Your Post`,
                    type_id: content.id
                });
                
                fullNotification = await Notifications.findOne({
                    where: {
                        id: originalNotification.id
                    },
                    include: [
                      {
                          model: User,
                          as: 'targetUser'
                      }
                    ]
                })
                
                io.to(content.user_id).emit('newNotification', fullNotification)
                break;
                
            case 'VIDEO_LIKED':
               originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: type,
                    notification: `${user.username} Liked Your Video`,
                    type_id: content.id
                });
                
                fullNotification = await Notifications.findOne({
                    where: {
                        id: originalNotification.id
                    },
                    include: [
                      {
                          model: User,
                          as: 'targeUser'
                      }
                    ]
                })
                
                io.to(content.user_id).emit('newNotification', fullNotification)
                
                break;
                
            case 'POST_COMMENT':
               originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'POST_COMMENT',
                    notification: `${user.username} Commented On Your Post: "${content.comment_content}"`,
                    type_id: content.post_id
                });
                
                fullNotification = await Notifications.findOne({
                    where: {
                        id: originalNotification.id
                    },
                    include: [
                      {
                          model: User,
                          as: 'targetUser'
                      }
                    ]
                })
                
                io.to(content.user_id).emit('newNotification', fullNotification)
                
                break; 
                
            case 'VIDEO_COMMENT':
               originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'VIDEO_COMMENT',
                    notification: `${user.username} Commented On Your Video: "${content.comment_content}"`,
                    type_id: content.video_id
                });
                
                fullNotification = await Notifications.findOne({
                    where: {
                        id: originalNotification.id
                    },
                    include: [
                      {
                          model: User,
                          as: 'targetUser'
                      }
                    ]
                })
                
                io.to(content.user_id).emit('newNotification', fullNotification)
                
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