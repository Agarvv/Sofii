import Notifications from "@models/notifications/Notifications";

class NotificationsRepository {
   public static async getUserNotifications(userId: number) {
    return Notifications.findAll({
        where: {
            user_target: userId
        }
    })
   }
}

export default NotificationsRepository; 