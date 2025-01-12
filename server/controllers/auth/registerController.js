const bcrypt = require('bcryptjs');
const registerService = require('../../services/auth/registerService');
const User = require('../../models/User');
const CustomError = require('../../outils/CustomError');

const createUser = async (name, email, password) => {
    await validateUniqueField('username', name, 'Username already taken');
    
    await validateUniqueField('email', email, 'Email already taken');

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await registerService.createUser(name, email, hashedPassword);
};

const validateUserUniqueField = async (field, value, errorMessage) => {
    const user = await User.findOne({
        where: { [field]: value },
    });

    if (user) {
        throw new CustomError(errorMessage);
    }
};

module.exports = {
    createUser,
};