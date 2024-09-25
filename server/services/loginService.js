const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
const PasswordResetToken = require('../models/PasswordResetToken')
const transporter = require('../index')
const User = require('../models/User')
const crypto = require('crypto')

const makeLogin = async (user, userPassword) => {
    try {
        const isMatch = await bcrypt.compare(userPassword, user.password);
        
        if (!isMatch) {
            throw new Error("password_does_not_match")
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
        const generatedPassword = crypto.randomBytes(20).toString('hex').slice(0, cifras);
        
        const hashedGeneratedPassword = await bcrypt.hash(generatedPassword)
        
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

        const mailOptions = {
            from: 'casluagarv@gmail.com', // Remitente
            to: user.email, // Destinatario
            subject: 'Reset your password At Sofii',
            text: `Enter this link to resset your password: http://localhost:5000/reset_password/${resetToken}`,
        };

        await transporter.sendMail(mailOptions)

        return true
    } catch (e) {
        throw e
    }
}

const resetPassword = async(newPassword, userDecoded) => {
    try {
       const user = await User.findOne({
        where: {
            id: userDecoded.user_id
        }
       })

       user.password = newPassword 
       await user.save()

       return true 
    } catch(e) {
        throw e
    }
}

module.exports = {
    makeLogin,
    loginBySocialMedia,
    sendPasswordResetUrl,
    resetPassword
};