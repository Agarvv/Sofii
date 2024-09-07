const tokenController = require('../controllers/tokenController')
const User = require('../models/User')

const setUserActiveOrInactive = async (activeOrInactive, jwtToken) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwtToken)
        
        const dbUser = await
        User.findOne({
            where: {
                id: userDecoded.user_id
            }
        })
        
        if(dbUser) {
         
        switch(activeOrInactive) {
            
            case "active":
                dbUser.active = true 
                break;
            case "inactive":
                dbUser.active = false
                break
            default:
                return
        }
        
        await dbUser.save()
        return true
        
       }
        
        
    } catch(e) {
        throw e
    }
}

module.exports = setUserActiveOrInactive