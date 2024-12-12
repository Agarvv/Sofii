const User = require('../../models/User');

const createUser = async (name, email, hashedPassword) => {
        const newUser = await User.create({
            username: name,
            email: email,
            password: hashedPassword
        });
        return newUser;
};

module.exports = {
    createUser
};
