const bcrypt = require('bcryptjs')
const registerService = require('../services/registerService.js')
const User = require('../models/User')

const createUser = (name, email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const emailExists = await User.findOne({ where: { email } });
            if (emailExists) {
                return reject(new Error("email_exists"));
            }

            const usernameExists = await User.findOne({ where: { username: name } });
            if (usernameExists) {
                return reject(new Error("username_exists"));
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            if (hashedPassword) {
                try {
                    await registerService.createUser(name, email, hashedPassword);
                    resolve(true);
                } catch (e) {
                    reject(e);
                }
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

module.exports = {
    createUser
}