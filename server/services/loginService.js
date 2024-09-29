const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const PasswordResetToken = require('../models/PasswordResetToken')
const transporter = require('../index')
const User = require('../models/User')
const crypto = require('crypto')
const { sendEmail } = require('../config/mailer')

const makeLogin = async (user, userPassword) => {
    try {
        const isMatch = await bcrypt.compare(userPassword, user.password);
        
        if (!isMatch) {
            throw new Error("Please Check your email and password.")
        }

        user.last_login = Date.now()

     
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
        
       
      const token = jwt.sign(payload, 'secret');

      try { 
        sendEmail(user.email, 'YOUR SOFII ACCOUNT', 'WE HAVE DETECTED A LOGIN IN YOUR ACCOUNT, IF YOU DID NOT LOGGED IN IN YOUR ACCOUNT RECENTLY, CHANGE YOUR PASSWORD.')
         console.log('notified user')
      } catch(e) {
        console.log('could not notify user')
      }

      return token;
        
    } catch (e) {
        throw e
    }
};


const loginBySocialMedia = async (user) => {
    try {
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
        
      const token = jwt.sign(payload, 'secret');
      return token;
      
    } catch(e) {
        throw e 
    }
}

const createNewUserBySocialMedia = async (socialMediaUser) => {
    try {
        //When a user logs in with a social media, he will not have the password.
        //So we include a secure password, 
        // because the user logged in with social media
        // probably is never going to log in on a form, so that means that he will never use also the password
        // but we generate a secure password in case 
        // what a malicious user knows our logged by social media user's email.
        const generatedPassword = crypto.randomBytes(20).toString('hex').slice(0, 20);
        
        const hashedGeneratedPassword = await bcrypt.hash(generatedPassword, 10)
        
        const user = await User.create({
            username: socialMediaUser.username,
            // we generate a email that always should be unique, if the social media API does not provide it.
            email: socialMediaUser.email || 'not_haves_email' + hashedGeneratedPassword + '@gmail.com',
            password: generatedPassword
        })
        
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
        
      const token = jwt.sign(payload, 'secret');
      return token;
        
        
    } catch(e) {
        throw e
    }
}

const sendPasswordResetUrl = async(user, resetToken, expiresAt) => {
    try {
        await PasswordResetToken.create({
            token: resetToken,
            expires_at: expiresAt,
            used: false,
            user_id: user.id
        })

        sendEmail(user.email, 'YOUR RESET PASSWORD URL SOFII',
        `Here is your Reset Password URL at Sofii: https://sofii.vercel.app/reset_password/${resetToken}/${user.email}`
        )

        return true
    } catch (e) {
        throw e
    }
}

const resetPassword = async(newPassword, user, token) => {
    try {
      
       user.password = newPassword 
       token.used = true 
 
       await user.save()
       await token.save()

       return true 
    } catch(e) {
        throw e
    }
}

module.exports = {
    makeLogin,
    loginBySocialMedia,
    createNewUserBySocialMedia,
    sendPasswordResetUrl,
    resetPassword
};