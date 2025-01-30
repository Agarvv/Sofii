import Notifications from "@models/notifications/Notifications";
import websocket from "@websocket/websocket";
import NotificationsRepository from "@repositories/user/NotificationsRepository";
import User from "@models/users/User";

class NotificationsService {
   public static async getUserNotifications(userId: number) {
     return await NotificationsRepository.getUserNotifications(userId); 
   }
   
   public static async deleteUserNotification(notificationId: number, userId: number) {
       
       await NotificationsRepository.deleteNotification(notificationId, userId); 
       
   }
   
   public static async sendNotificationToUser(
    target: number,
    user_name: string,
    user_id: number,
    content: any,
    chat_message: string | null,
    type: string
): Promise<void> {
        const io = websocket.getIO(); 
        const notificationText = {
            POST_LIKED: `${user_name} Liked Your Post: "${content.description}"`,
            FRIEND_REQUEST: `${user_name} Sendt You A Friend Request!`,
            NEW_FOLLOWER: `${user_name} Started Following You!`,
            ACCEPTED_FRIEND_REQUEST: `${user_name} Acepted Your Friend Request!`,
            CHAT_MESSAGE: `${user_name} Sendt You A Message: "${chat_message}"`,
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
        }, {
           include: { model: User, as: 'targetUser' }
        });

        //io.to(String(target)).emit('newNotification', originalNotification);
        io.emit('newNotification', originalNotification);
   }

}

export default NotificationsService; 