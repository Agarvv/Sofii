const PasswordResetToken = require('../models/PasswordResetToken')
const bcrypt = require('bcryptjs');
const transporter = require('../index')
const { sendEmail } = require('../config/mailer')
const CustomError = require('@outils/CustomError')


const sendPasswordResetUrl = async(user, resetToken, expiresAt) => {
        await PasswordResetToken.create({
            token: resetToken,
            expires_at: expiresAt,
            used: false,
            user_id: user.id
        })

        sendEmail(user.email, 'YOUR RESET PASSWORD URL SOFII',
        `Here is your Reset Password URL at Sofii: https://sofii.vercel.app/reset_password/${resetToken}/${user.email}`
        )
}

const resetPassword = async(newPassword, user, token) => {
       user.password = newPassword 
       token.destroy()
 
       await user.save()
       await token.save()
}
