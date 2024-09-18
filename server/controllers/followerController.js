const followerService = require('../services/followerService')
const Followers = require('../models/Followers')
const User = require('../models/User')
const tokenController = require('../controllers/tokenController')

const handleFollow = async (follower, following_id) => {
    try {

        const follower_id = follower.user_id
        
        if(!following_id) {
            throw new Error("Some data is missing.")
        }
         // following means the user that we want to follow, not if the user is following him.
        const following = await User.findOne({
            where: { id: following_id }
        })
         
        // If the user that we want to follow does not exist, We trow a error.
        if(!following) {
            throw new Error("The user that you want to Follow does not exist.")
        }
        
        // Now we check if the user is following him.
        const followExists = await Followers.findOne({
            where: { following_id: following_id, follower_id: follower_id}
        })
        
        // If that is True, then we will just unfollow him.
        if(followExists) {
            await followerService.unfollowUser(followExists)
            return { unfollowed: true, followed: false }
        }
        
        await followerService.handleFollow(follower, following_id)
        return { followed: true, unfollowed: false }
      
        
    } catch(e) {
        throw new Error(e)
    }
}

module.exports = {
    handleFollow
}