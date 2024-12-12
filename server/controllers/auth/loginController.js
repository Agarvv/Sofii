const User = require('../models/User');
const findByEmail = require('@outils/findByEmail');
const loginService = require('@services/auth/loginService');
const PasswordResetToken = require('../models/PasswordResetToken')
const { Op } = require('sequelize')
const tokenController = require('../controllers/tokenController')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')


const handleLogin = async (email, password) => {
    
        const user = await findByEmail(email)
        const jwtToken = await loginService.makeLogin(user, password);
        return jwtToken;
};

// when /callback endpoint is reached during social media auth, this function is called.
const loginBySocialMedia = async (user) => {
    const user = await findByEmail(user.email)
    
     jwtToken = await user ? loginBySocialMedia(user.email) : createNewUserBySocialMedia(user)
     
     return jwtToken 
}

module.exports = {
    handleLogin,
    loginBySocialMedia
}