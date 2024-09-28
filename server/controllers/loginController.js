const User = require('../models/User');
const findByEmail = require('../outils/findByEmail');
const loginService = require('../services/loginService');
const PasswordResetToken = require('../models/PasswordResetToken')
const { Op } = require('sequelize')
const tokenController = require('../controllers/tokenController')
const bcrypt = require('bcryptjs')

const handleLogin = async (email, password) => {
    try {
        
        const userExists = await
        User.findOne({
            where: {
                email: email
            }
        })
        
        if(!userExists) {
            throw new Error("Please Check your email and password.")
        }

        const token = await loginService.makeLogin(userExists, password);
        
        return token;
    }catch (e) {
    console.error('Error during login process:', e);
    throw e; 
}
};

const loginBySocialMedia = async (user) => {
    try {
        //user means the user of the social media
                const dbUser = await User.findOne({
                    where: {
                        email: user.email
                    }
                })
                
                if(dbUser) {
                    const jwtToken = await loginService.loginBySocialMedia(dbUser)
                    return jwtToken
                } else {
                    const jwtToken = await loginService.createNewUserBySocialMedia(user)
                    return jwtToken
                }
    } catch(e) {
        throw e
    }
}

const sendPasswordResetUrl = async (email) => {
    try {
        const user = await User.findOne({
            where: { email }
        });

        if (user) {
            const now = new Date(); 

            const resetAttempts = await PasswordResetToken.findAll({
                where: {
                    user_id: user.id, 
                    expires_at: {
                        [Op.gt]: now
                    }
                }
            });

            if (resetAttempts.length > 2) {
                throw new Error('You have tried to reset your password too many times. Try again later.');
            }

            const resetToken = crypto.randomBytes(32).toString('hex');
            const expiresAt = new Date(Date.now() + 15 * 60 * 1000); 
            
            await loginService.sendPasswordResetUrl(user, resetToken, expiresAt);

            return true; 
        } else {
            return true; 
        }
        
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const resetPassword = async(newPassword, resetToken, jwtToken) => {
    try {
        const userDecoded = await tokenController.verifyJwtToken(jwtToken)
         const isTokenValid = await PasswordResetToken.findOne({
            where: {
                token: resetToken,
                used: false,
                user_id: userDecoded.user_id,
                expires_at: {
                    [Op.gt]: new Date(),
                },
            }
         })

         if(!isTokenValid) {
            throw new Error('Your Reset Password Request Is Not Anymore valid maybe is expired.')
         }

        const passwordEncoded = await bcrypt.hash(newPassword, 10)
        await loginService.resetPassword(passwordEncoded, userDecoded)
        return true
        
    } catch (e) {
        throw e
    }
}


module.exports = {
    handleLogin,
    loginBySocialMedia,
    sendPasswordResetUrl,
    resetPassword
};