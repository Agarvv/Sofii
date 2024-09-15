const User = require('../models/User');
const findByEmail = require('../outils/findByEmail');
const loginService = require('../services/loginService');

const handleLogin = async (email, password) => {
    try {
        
        const userExists = await
        User.findOne({
            where: {
                email: email
            }
        })
        
        if(!userExists) {
            throw new Error("email_not_found")
        }

        const token = await loginService.makeLogin(userExists, password);
        
        return token;
    }catch (e) {
    console.error('Error during login process:', e);
    throw e; // Esto es importante para que el error llegue al router
}
};


module.exports = {
    handleLogin
};