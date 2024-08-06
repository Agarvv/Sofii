const followerService = require('../services/followerService')
const Followers = require('../models/Followers')
const User = require('../models/User')

const handleFollow = async (follower_id, following_id) => {
    try {
        
        if(!follower_id || !following_id) {
            throw new Error("Some data is missing.")
        }
        
        const following = await User.findOne({
            where: { id: following_id }
        })
         
        if(!following) {
            throw new Error("The user that you want to Follow does not exist.")
        }
        
        const followExists = await Followers.findOne({
            where: { following_id: following_id}
        })
        
        if(followExists) {
            throw new Error("You are already Following this person.")
        }
        
       const successMessage =  await followerService.handleFollow(follower_id, following_id)
       
        return successMessage
        
    } catch(e) {
        throw new Error(e)
    }
}

module.exports = {
    handleFollow
}