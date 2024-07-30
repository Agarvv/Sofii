const User = require('../models/User')
const tokenController = require('../controllers/tokenController')

const handleProfileDataChange = (field, value, token) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(token)
        
        if(!userDecoded) {
            throw new Error("Something Went Wrong With Your Session")
        }
        
        const user = User.findOne({where: userDecoded.user_id})
        
        if(!user){
            throw new Error("Something Went Wrong With Your Session")
        }
        
        user[field] = value
        await user.save()
        return user
        
        
        
    } catch(e) {
        throw new Error(e)
    }
}


module.exports = {
	handleProfileDataChange
}