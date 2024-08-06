const User = require('../models/User')

const tokenController = require('../controllers/tokenController')
const friendService = require('../services/friendService')
const FriendRequest = require('../models/FriendRequest')
const { Op } = require('sequelize')

const handleFriendRequest = async (jwt_token, friend_target) => {
    try {
       
        const friend_target_user = 
        await User.findOne({
            where: { id: friend_target }
        })
         
        if(!friend_target_user) {
            throw new Error("The user that you are sending a friend request does not exist")
        }
        
        const userDecoded = await tokenController.verifyJwtToken(jwt_token)
        
        if(!userDecoded) {
            throw new Error("Your session is invalid")
        }
        
        const isSendtFriendRequest = 
        await FriendRequest.findOne({
            where: {
                [Op.and]: [
    { friend_target: friend_target },
    { request_sender_id: userDecoded.user_id }
]
            }
        })
        
        if(isSendtFriendRequest) {
            throw new Error("You have already sendt a friend request to that user.")
        }
        
        const success = await friendService.handleFriendRequest(userDecoded, friend_target)
        
        return success
        
    } catch(e) {
        throw new Error(e)
    }
}

const getFriendRequestsByUserId = async (user_id) => {
    try {
        
        const databaseUser = await User.findOne({
            where: { id: user_id}
        })
        
        if(!databaseUser) {
            throw new Error("That user does not exist")
        }
        
        const requests = await friendService.getFriendRequestsByUserId(user_id)
        if(requests) {
            return requests
        } else {
            throw new Error("Could not find friend requests for this user")
        }
        
        
    } catch(e) {
        throw new Error(e)
    }
}


module.exports = {
    handleFriendRequest,
    getFriendRequestsByUserId
}