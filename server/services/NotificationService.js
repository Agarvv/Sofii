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
                console.log('commentfklfmggjgjgjergjergljegklrejgklejrgkjegk:jegkejgk:jefgkj', content.user_id)
               originalNotification = await Notifications.create({
                    user_id: target,
                    // user target is like the sender of the notification
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
                
                io.to(target).emit('newNotification', fullNotification)
                
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
                
                io.to(target).emit('newNotification', fullNotification)
                
                break;

            case "COMMENT_LIKED":
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'COMMENT_LIKED',
                    notification: `${user.username} Liked Your Comment: "${content.comment_content}"`,
                    type_id: content.post_id
                })

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

                io.to(target).emit('newNotification', fullNotification)
                break;
            case "COMMENT_AWNSER":
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'COMMENT_AWNSER_LIKED',
                    notification: `${user.username} Liked Your Comment Awnser: "${content.awnser_content}"`,
                    type_id: content.post_id
                })

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

                io.to(target).emit('newNotification', fullNotification)
                break;
            
            case "VIDEO_COMMENT_LIKED":
                 originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'VIDEO_COMMENT_LIKED',
                    notification: `${user.username} Liked Your Comment In A Video: "${content.comment_content}"`,
                    type_id: content.video_id
                })

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

                io.to(target).emit('newNotification', fullNotification)
                break;
            
            case "VIDEO_COMMENT_AWNSER_LIKED":
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'VIDEO_COMMENT_AWNSER_LIKED',
                    notification: `${user.username} Liked Your Comment Awnser In A Video: "${content.awnser_content}"`,
                    type_id: content.video_id
                })

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

                io.to(target).emit('newNotification', fullNotification)
                break;
            
            case "AWNSERED_COMMENT":
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'AWNSERED_COMMENT',
                    notification: `${user.username} Awnsered To Your Comment: "${content.awnser_content}"`,
                    type_id: content.post_id
                })

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

                io.to(target).emit('newNotification', fullNotification)
                break;
            
            case "VIDEO_COMMENT_AWNSERED":
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'AWNSERED_VIDEO_COMMENT',
                    notification: `${user.username} Awnsered To Your Comment In A Video: "${content.awnser_content}"`,
                    type_id: content.video_id
                })

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

                io.to(target).emit('newNotification', fullNotification)
                break;
            
            case "FRIEND_REQUEST":
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'FRIEND_REQUEST',
                    notification: `${user.username} Sendt You A Friend Request!`,
                    type_id: content.user_id // OR SENDER_ID
                })

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

                io.to(target).emit('newNotification', fullNotification)
                break;

            case "CHAT_MESSAGE":
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'CHAT_MESSAGE',
                    notification: `${user.username} Sendt You A Message.`,
                    type_id: content.sender_id == target ? content.receiver_id : content.sender_id
                })

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

                io.to(target).emit('newNotification', fullNotification)
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