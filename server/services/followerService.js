const Followers = require('../models/Followers')
const websocket = require('../websocket')
const   NotificationService = require('./NotificationService')

const handleFollow = async (follower, following_id) => {
    try {
        
       // We just create a new notification object in the database
       const newFollowDBObject = await Followers.create({
            follower_id: follower.user_id,
            following_id: following_id
        })

        // We handle the Notifications
        await NotificationService.sendNotificationToSingleUser(
            newFollowDBObject.following_id, 
            follower,
            newFollowDBObject,
            'NEW_FOLLOWER'
        )
        
        // And we return an object that will be handled on the frontend for some comparations.
        return true
        
    } catch(e) {
        throw new Error(e)
    }
}

// follow is the follower object from the database, we will just destroy it and-
// send a message back like { unfollowed: true, followed: false }, that will be-
// handled on the frontend for some comparations.
const unfollowUser = async (follow) => {
    try {
       const io = websocket.getIO()
       await follow.destroy()
       // We send a websocket event to the frontend
       io.emit('unfollowedUser',follow)
       return true
    } catch(e) {
        throw e
    }
}

module.exports = {
    handleFollow,
    unfollowUser
}