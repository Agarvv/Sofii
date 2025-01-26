import Notifications from "@models/notifications/Notifications";
import User from '@models/users/User'

class NotificationsRepository {
   public static async getUserNotifications(userId: number) {
      
    return await Notifications.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: User, 
                    as: 'targetUser' 
                }
            ]
        });
        
   }
   
   
}

export default NotificationsRepository; 