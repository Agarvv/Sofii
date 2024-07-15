const User = require('../models/User');
const findByEmail = require('../outils/findByEmail');
const loginService = require('../services/loginService');

const handleLogin = async (email, password) => {
    try {
        const user = await findByEmail(email);
        if (!user) {
            throw new Error('Not User Found With That Email.');
        }

        console.log('User ', user);

        const token = await loginService.makeLogin(user, password);
        return token;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = {
    handleLogin
};