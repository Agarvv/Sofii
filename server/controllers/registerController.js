const bcrypt = require('bcryptjs')
const registerService = require('../services/registerService.js')

const createUser = (name, email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            if(hashedPassword) {
                 try {
                     await registerService.createUser(name, email, hashedPassword)
                     resolve(true)
                 } catch(e) {
                     reject(e)
                 }
            }
            
        } catch(e) {
            console.log(e)
        }
    })
}

module.exports = {
    createUser
}