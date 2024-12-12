const User = require('../models/User')
const CustomError = require('@outils/CustomError')

const findByEmail = async (email) => {
    const user = await User.findOne({where: {email}})
    if(!user) {
        throw new CustomError('User not Found With that email.')
   }
}

module.exports = findByEmail