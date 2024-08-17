const express = require('express')//
const router = express.Router() 
const tokenController = require('../controllers/tokenController')
const NotificationController = require('../controllers/NotificationController')

router.get('/notifications', async (req, res) => {
    try {
        const jwtToken = req.cookies.jwt 
        const userDecoded = await tokenController.verifyJwtToken(jwtToken) 
        
        const userNotifications = await NotificationController.handleUserNotifications(userDecoded.user_id)
        if(userNotifications) {
            return res.status(201).json({
                notifications: 
                userNotifications
            })
        } else {
            return res.status(500).json({ error: 'Something Went Down !'})
        }
        
    } catch(e) {
        console.log(e)
        return res.status(500).json({ error: 'Intenal serve rerror ! '})
    }
})

router.post('/destroy_notification',async (req, res) => {
    try {
        
        console.log('destroy notification req.body: ', req.body)
        const notification_id = req.body.notification_id 
        const jwt_token = req.cookies.jwt 
        if(!notification_id) {
            return res.status(404).json({ error: 'Data missing on request '})
        }
        
        await NotificationController.destroyNotificationById(jwt_token, notification_id)
        
        return res.status(201).json({ message: 'Notification Deleted Sucesfully'})
        
        
    } catch(e) {
        throw new Error(e)
    }
})




module.exports = router 