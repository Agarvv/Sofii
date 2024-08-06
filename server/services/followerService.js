const Followers = require('../models/Followers')


const handleFollow = async (follower_id, following_id) => {
    try {
        await Followers.create({
            follower_id: follower_id,
            following_id: following_id
        })
        
        const successMessage = 'Follow Completed Sucessfully'
        return successMessage
        
        
    } catch(e) {
        throw new Error(e)
    }
}

module.exports = {
    handleFollow
}