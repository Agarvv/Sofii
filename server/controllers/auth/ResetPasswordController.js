const findByEmail = require('@outils/findByEmail');
const PasswordResetToken = require('@models/PasswordResetToken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const CustomError = require('@outils/CustomError')

// send reset password email
const sendPasswordResetUrl = async (email) => {
    
        const user = await findByEmail(email)

        const resetAttempts = await findUserResetPasswordAttempts(user.id)

        if (resetAttempts > 2) {
            throw new CustomError('You have tried to reset your password too many times. Try again later.', 400);
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await loginService.sendPasswordResetUrl(user, resetToken, expiresAt);

};

// reset password 
const resetPassword = async(newPassword, resetToken, email) => {
      const user = await findByEmail(email)
      
      const isTokenValid = await PasswordResetToken.findOne({
           where: {
                token: resetToken,
                used: false,
                user_id: user.id,
                expires_at: {
                    [Op.gt]: new Date(),
                },
            }
       })

       if(!isTokenValid) {
          throw new CustomError('Your Reset Password Request Is Not Anymore valid maybe is expired.', 400)
       }

        const passwordEncoded = await bcrypt.hash(newPassword, 10)
        
        await loginService.resetPassword(passwordEncoded, user, isTokenValid)
}

const findUserResetPasswordAttempts = async (userId) => {
    const now = new Date();
    const resetAttempts = await PasswordResetToken.count({
                where: {
                    user_id: userId,
                    expires_at: {
                        [Op.gt]: now
                    }
                }
            });
    return resetAttempts
}