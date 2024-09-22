const followerService = require('../services/followerService')
const Followers = require('../models/Followers')
const User = require('../models/User')
const tokenController = require('../controllers/tokenController')

const handleFollow = async (follower, followingData) => {
    try {
        const follower_id = follower.user_id;

        if (!followingData) {
            throw new Error("Some data is missing.");
        } else {
            console.log('follow exists:', followingData.id);
        }

        console.log('follow data', follower, followingData)

        if(follower.user_id == followingData.id) {
            throw new Error('You cannot follow yourself')
        }

        // Cambiamos 'following' por 'followingData'
        const following = await User.findOne({
            where: { id: followingData.id }
        });

        // Si el usuario que queremos seguir no existe, lanzamos un error.
        if (!following) {
            throw new Error("The user that you want to Follow does not exist.");
        }

        // Ahora comprobamos si el usuario ya lo está siguiendo.
        const followExists = await Followers.findOne({
            where: { following_id: following.id, follower_id: follower_id }
        });

        // Si es cierto, simplemente lo dejaremos de seguir.
        if (followExists) {
            await followerService.unfollowUser(followExists);
            return { unfollowed: true, followed: false };
        }

        await followerService.handleFollow(follower, following.id);
        return { followed: true, unfollowed: false };

    } catch (e) {
        throw new Error(e);
    }
};


module.exports = {
    handleFollow
}