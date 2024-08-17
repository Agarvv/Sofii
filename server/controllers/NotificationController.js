const Notifications = require('../models/Notifications')
const User = require('../models/User') // Asegúrate de que User esté importado si no lo estaba.
const tokenController = require('./tokenController')

const handleUserNotifications = async (user_id) => {
    try {
        const userNotifications = await Notifications.findAll({
            where: { user_id: user_id },
            include: [
                {
                    model: User, // Asegúrate de que el modelo User esté correctamente definido e importado
                    as: 'targetUser' // Usamos el alias definido en las asociaciones
                    
                }
            ]
        });
        
        return userNotifications;
    } catch(e) {
        throw new Error(e.message);
    }
}

const destroyNotificationById = async (jwt_token, notification_id) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwt_token)
        const dbNotification = await
        Notifications.findOne({
            where: {id: notification_id}
        })
        
        if(!dbNotification) {
            throw new Error("Your Notification was not found.")
        }
        
        if(dbNotification.user_id == userDecoded.user_id) {
            await dbNotification.destroy()
            return 
        } else if(dbNotification.user_id !== userDecoded.user_id ) {
            throw new Error("You are not authorized to do that.")
        }
        
    } catch(e) {
        throw new Error(e)
    }
}

module.exports = {
    handleUserNotifications,

    destroyNotificationById
}