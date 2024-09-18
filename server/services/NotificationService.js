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

const sendNotificationToSingleUser = async (target, user, content, chat_message, type) => {
    try {
        const io = websocket.getIO()
        console.log(`data: TARGET: ${target}, USER: ${user}, CONTENT: ${content}, type: ${type}`)
        // TARGET MEANS THE USER THAT IS GONNA RECEIVE THE NOTIFICATION
        // USER MEANS THE USER THAT "CREATED" THE NOTIFICATION
        // CONTENT MEANS THE CONTENT ASSOCIATED TO THE NOTIFICATION. EX: IF USER LIKED A COMMENT THEN THE CONTENT IS EQUAL TO THAT COMMENT.
        // TYPE MEANS THE TYPE OF THE NOTIFICATION. EX: IF USER LIKED A POST 'POST_LIKED'. THIS WILL BE USED ON THE FRONTEND FOR COMPARATIONS.
        // CHAT MESSAGE WILL NOT BE NULL ON THE CHAT_MESSAGE NOTIFICATIONS,
        // BUT IT SHOULD BE NULL IN OTHER TYPE OF NOTIFICATIONS.

        let originalNotification;
        let fullNotification;
        switch(type) {
            // WHEN A POST IS LIKED
            case 'POST_LIKED':
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: type,
                    notification: `${user.username} Liked Your Post: "${content.description}"`,
                    type_id: content.id // <-- Asegúrate de que haya una coma en la línea anterior.
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
            
            // WHEN A VIDEO IS LIKED
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
            // WHEN A COMMENT IS POSTED
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
                
            // WHEN A VIDEO COMMENT IS POSTED
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
            
            // WHEN A COMMENT IS LIKED
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

            // WHEN A COMMENT AWNSER IS LIKED
            case "COMMENT_AWNSER_LIKED":
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'COMMENT_AWNSER_LIKED',
                    notification: `${user.username} Liked Your Comment Awnser: "${content.answer_content}"`,
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
            
                // WHEN A VIDEO COMMENT IS LIKED
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
            
                // WHEN A VIDEO COMMENT AWNSER IS LIKED
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
            
                // WHEN A USER AWNSERS TO THE COMMENT OF A POST
            case "AWNSERED_COMMENT":
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'AWNSERED_COMMENT',
                    notification: `${user.username} Awnsered To Your Comment: "${content.answer_content}"`,
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
            
                // WHEN A USER AWNNSERS TO THE COMMENT OF A VIDEO
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
            
                // WHEN A USER SENDS A FRIEND REQUEST
            case "FRIEND_REQUEST":
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'FRIEND_REQUEST',
                    notification: `${user.username} Sendt You A Friend Request!`,
                    type_id: content.request_sender_id 
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

            case "NEW_FOLLOWER":
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'NEW_FOLLOWER',
                    notification: `${user.username} Started Following You!`,
                    type_id: user.user_id
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
            
                // WHEN A USER ACCEPTS A FRIEND REQUEST
            case "ACCEPTED_FRIEND_REQUEST":
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'ACCEPTED_FRIEND_REQUEST',
                    notification: `${user.username} Acepted Your Friend Request!`,
                    type_id: content.friend_one_id 
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

              
                // WHEN A USER SENDS A CHAT MESSAGE
            case "CHAT_MESSAGE":
                originalNotification = await Notifications.create({
                    user_id: target,
                    user_target: user.user_id,
                    notification_type: 'CHAT_MESSAGE',
                    notification: `${user.username} Sendt You A Message: "${chat_message}"`,
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
               

                // WHEN A USER SENDS A CHAT MESSAGE WITH FILE
                case "CHAT_MESSAGE_WITH_FILE":
                    originalNotification = await Notifications.create({
                        user_id: target,
                        user_target: user.user_id,
                        notification_type: 'CHAT_MESSAGE_WITH_FILE',
                        notification: `${user.username} Sendt A File`,
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
                throw new Error('Unknown notification type', type);
        }
         // END
    } catch (e) {
        throw new Error(e);
    }
};

module.exports = {
    createForFriendNotification,
    sendNotificationToSingleUser
};