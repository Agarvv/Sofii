const User = require('../models/User')

const findUserById = (id) => {
    try {
        const databaseUser = User.findOne(
            {
                where: 
                {
                    id
                }
            }
        )
        if(!databaseUser) {
            throw new Error("User Not Found (404)")
        }
        return databaseUser
    } catch(e) {
        console.log(e)
        throw new Error("Ooops, Something Went Down Here !", e)
    }
}

module.exports = {
    findUserById
}