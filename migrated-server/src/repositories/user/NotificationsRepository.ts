import Notifications from "@models/notifications/Notifications";
import User from '@models/users/User'
import CustomError from '@outils/CustomError'

class NotificationsRepository {
   public static async getUserNotifications(userId: number) {
      
    return await Notifications.findAll({
            where: { user_target: userId },
            include: [
                {
                    model: User, 
                    as: 'targetUser' 
                },
                {
                    model: User,
                    as: 'sender'
                }
            ]
        });
   }
   
   public static async deleteNotification(nId: number, userId: number) {
       const notification = await Notifications.destroy({
           where: {
               id: nId,
               user_target: userId 
           }
       })
   }
}

export default NotificationsRepository; 