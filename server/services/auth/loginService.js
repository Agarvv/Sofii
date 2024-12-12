const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const PasswordResetToken = require('../models/PasswordResetToken')
const transporter = require('../index')
const User = require('../models/User')
const crypto = require('crypto')
const { sendEmail } = require('../config/mailer')
const CustomError = require('@outils/CustomError')

const makeLogin = async (user, userPassword) => {
      await passwordMatch(userPassword, user.password)
      const payload = generateJwtPayload(user)
      const token = jwt.sign(payload, 'secret');
      return token;
};


const loginBySocialMedia = async (user) => {
      const payload = generateJwtPayload(user)
      const token = jwt.sign(payload, 'secret');
      return token;
}

const createNewUserBySocialMedia = async (socialMediaUser) => {
        const generatedPassword = crypto.randomBytes(20).toString('hex').slice(0, 20);
        
        const hashedGeneratedPassword = await bcrypt.hash(generatedPassword, 10)
        
        const user = await User.create({
            username: socialMediaUser.username,
            email: socialMediaUser.email,
            password: generatedPassword
        })
        
        const payload = generateJwtPayload(user)
        
      const token = jwt.sign(payload, 'secret');
      return token;
}

const passwordMatch = async (raw, crypted) => {
    const isMatch = await bcrypt.compare(raw, crypted); 
    if(!isMatch) {
        throw new CustomError('Please check your credentials.')
    }
}

const generateJwtPayload = (user) => {
    const payload = {
            user_id: user.id,
            username: user.username,
            email: user.email,
            user_picture: user.profilePicture,
            user_banner: user.banner,
            user_bio: user.bio,
            user_civil_status: user.civil_status,
            user_gender: user.gender,
            user_native_city: user.native_city,
            user_ubication: user.ubication,
            user_job: user.job
        };
    return payload 
}

module.exports = {
    makeLogin,
    loginBySocialMedia,
    createNewUserBySocialMedia
};