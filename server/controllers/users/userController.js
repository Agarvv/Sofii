const User = require('../models/User')
const Blocked = require('../models/Blocked')
const Friends = require('../models/Friends')
const FriendRequest = require('../models/FriendRequest')
const Follower = require('../models/Followers')
const tokenController = require('../controllers/tokenController')
const userService = require('../services/userService')
const { Op } = require('sequelize');

const blockUser = async (target_id, jwtToken) => {
    const userDecoded = await tokenController.verifyJwtToken(jwtToken);
    
    // Find the target user
    const target = await User.findOne({ where: { id: target_id } });
    if (!target) throw new Error('target_not_found');
    
    // Prevent blocking oneself
    if (userDecoded.user_id === target_id) throw new Error('blocked_yourself');
    
    // Check if the user is already blocked
    const alreadyBlocked = await Blocked.findOne({
        where: {
            blocked_id: target_id,
            blocker_id: userDecoded.user_id
        }
    });
    
    if (alreadyBlocked) {
        // Unblock if already blocked (toggle behavior)
        await userService.unblockUser(alreadyBlocked);
        return { unblocked: true, blocked: false };
    } else {
        // Destroy all follow, friend, and friend request relations

        // 1. Destroy Follow Relations (user -> target and target -> user)
        await Follower.destroy({
            where: {
                [Op.or]: [
                    { follower_id: userDecoded.user_id,  following_id: target_id },
                    { follower_id: target_id,   following_id: userDecoded.user_id }
                ]
            }
        });

        // 2. Destroy Friend Relations (bidirectional search)
        await Friends.destroy({
            where: {
                [Op.or]: [
                    { friend_one_id: userDecoded.user_id, friend_two_id: target_id },
                    { friend_one_id: target_id, friend_two_id: userDecoded.user_id }
                ]
            }
        });

        // 3. Destroy Friend Requests (again bidirectional)
        await FriendRequest.destroy({
            where: {
                [Op.or]: [
                    {  request_sender_id: userDecoded.user_id,  friend_target: target_id },
                    { request_sender_id: target_id, friend_target: userDecoded.user_id }
                ]
            }
        });

        // Now, block the user
        await userService.blockUser(target, userDecoded);

        return { blocked: true, unblocked: false };
    }
};



module.exports = {
    blockUser
}