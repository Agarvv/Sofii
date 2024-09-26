const followerService = require('../services/followerService')
const Followers = require('../models/Followers')
const User = require('../models/User')
const tokenController = require('../controllers/tokenController')

const handleFollow = async (follower, following_id) => {
    try {
        const follower_id = follower.user_id;

        if (!following_id) {
            throw new Error("Some data is missing.");
        } else {
            console.log('follow exists:', following_id);
        }

        console.log('follow data', follower, following_id)

        if(follower.user_id == following_id) {
            throw new Error('You cannot follow yourself')
        }

        // Cambiamos 'following' por 'followingData'
        const following = await User.findOne({
            where: { id: following_id }
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
        console.log(e)
        throw new Error(e);
    }
};


module.exports = {
    handleFollow
}