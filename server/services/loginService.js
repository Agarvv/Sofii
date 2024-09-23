const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
const PasswordResetToken = require('../models/PasswordResetToken')
const transporter = require('../index')

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

const sendPasswordResetUrl = async(user, resetToken, expiresAt) => {
    try {
        await PasswordResetToken.create({
            token: resetToken,
            expires_at: expiresAt,
            used: false,
            user_id: user.id
        })

        const mailOptions = {
            from: 'tu-email@gmail.com', // Remitente
            to: 'destinatario@example.com', // Destinatario
            subject: 'Prueba de Nodemailer',
            text: 'Hola, este es un correo de prueba enviado desde Nodemailer en mi servidor Express.',
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
    sendPasswordResetUrl,
    resetPassword
};