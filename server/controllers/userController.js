const User = require('../models/User')
const Blocked = require('../models/Blocked')
const tokenController = require('../controllers/tokenController')
const userService = require('../services/userService')

const blockUser = async (target_id, jwtToken) => {
    
    const userDecoded = await tokenController.verifyJwtToken(jwtToken)
    
    //this is the target user to block
    const target = await User.findOne({
        where: {
            id: target_id
        }
    })

    if(!target) {
       throw new Error('target_not_found')
    }
    
    if (userDecoded.user_id === target_id) {
       throw new Error('blocked_yourself');
    }
    
    //Checks if the target is already blocked
    const alreadyBlocked = await Blocked.findOne({
        where: {
            blocked_id: target_id,
            blocker_id: userDecoded.user_id
        }
    })
    
    //if the target is already blocked, unblocks him to have that kind of 'loop'
    if(alreadyBlocked) {
        await userService.unblockUser(alreadyBlocked)
        return { unblocked: true, blocked: false } 
        //else, just blocks him.
    } else {
        await userService.blockUser(target, userDecoded)
        return { blocked: true, unblocked: false }
    }
}


module.exports = {
    blockUser
}