const User = require('../models/User')
const tokenController = require('../controllers/tokenController')

const handleProfileDataChange = async (field, value, token) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(token)
        
        if(!userDecoded) {
            throw new Error("Something went wrong with your session.")
        }
        
        // Corregido: Uso de where para buscar por ID
        const user = await User.findOne({ where: { id: userDecoded.user_id } })
        
        if(!user){
            throw new Error("User not found.")
        }
         console.log('service value', value)
        
        user[field] = value
        console.log('Profile Picture Before Save:', user.profilePicture)
        
        await user.save()
        console.log('Profile Picture After Save:', user.profilePicture)
        
        return user
        
    } catch(e) {
        console.error('Error handling profile data change:', e)
        throw new Error(e)
    }
}

module.exports = {
	handleProfileDataChange
}
