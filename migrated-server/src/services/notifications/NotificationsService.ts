import Notifications from "@models/notifications/Notifications";
import websocket from "@websocket/websocket";
import NotificationsRepository from "@repositories/user/NotificationsRepository";
import User from "@models/users/User";

class NotificationsService {
   public static async GetUserNotifications(userId: number) {
     return await NotificationsRepository.getUserNotifications(userId); 
   }
   
   public static async sendNotificationToUser(
    target: number,
    user_name: any,
    user_id: number,
    content: any,
    chat_message: string | null,
    type: string
): Promise<void> {
        const io = websocket.getIO(); 
        const notificationText = {
            POST_LIKED: `${user_name} Liked Your Post: "${content.description}"`,
            POST_COMMENT: `${user_name} Commented On Your Post: "${content.comment_content}"`,
            COMMENT_LIKED: `${user_name} Liked Your Comment: "${content.comment_content}"`,
            COMMENT_AWNSER_LIKED: `${user_name} Liked Your Comment Awnser: "${content.answer_content}"`,
            AWNSERED_COMMENT: `${user_name} Awnsered To Your Comment: "${content.answer_content}"`,
            FRIEND_REQUEST: `${user_name} Sendt You A Friend Request!`,
            NEW_FOLLOWER: `${user_name} Started Following You!`,
            ACCEPTED_FRIEND_REQUEST: `${user_name} Acepted Your Friend Request!`,
            CHAT_MESSAGE: `${user_name} Sendt You A Message: "${chat_message}"`,
            CHAT_MESSAGE_WITH_FILE: `${user_name} Sendt A File`,
        };

        if (!(type in notificationText)) {
            throw new Error(`Unknown notification type: ${type}`);
        }

        const originalNotification = await Notifications.create({
            user_id: user_id,
            user_target: target,
            notification_type: type,
            notification: notificationText[type as keyof typeof notificationText],
            type_id: content.id || content.post_id || content.video_id || content.sender_id || content.friend_one_id || content.request_sender_id || user_id,
        });

        // need to send the notification with his user relation
        const fullNotification = await Notifications.findOne({
            where: { id: originalNotification.id },
            include: [{ model: User, as: 'targetUser' }],
        });

        io.to(String(target)).emit('newNotification', fullNotification);
   }

}

export default NotificationsService; 