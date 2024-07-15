const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const makeLogin = async (user, userPassword) => {
    try {
        console.log('makeLogin service activated', userPassword, user.password);
        const isMatch = await bcrypt.compare(userPassword, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            throw new Error('Password does not match');
        }

        console.log('Password matches.');
        const payload = {
            user_id: user.id,
            username: user.username,
            email: user.email,
            user_picture: user.profilePicture
        };
        console.log(payload);

        const token = jwt.sign(payload, 'secret');
        console.log(token);
        return token;
    } catch (e) {
        throw e;
    }
};

module.exports = {
    makeLogin
};