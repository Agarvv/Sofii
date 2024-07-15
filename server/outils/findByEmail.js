const User = require('../models/User')

const findByEmail = (email) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await User.findOne({where: {email}})
            if(!user) {
                reject('User not Found With that email.')
            }
            resolve(user)
        } catch(e) {
            console.log(e)
            reject(e)
        }
    })
}

module.exports = findByEmail