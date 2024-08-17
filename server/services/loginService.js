const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const makeLogin = async (user, userPassword) => {
    try {
        const isMatch = await bcrypt.compare(userPassword, user.password);
        
        if (!isMatch) {
            throw new Error("password_does_not_match")
        }

     
        const payload = {
            user_id: user.id,
            username: user.username,
            email: user.email,
            user_picture: user.profilePicture
        };
        
       

      const token = jwt.sign(payload, 'secret');
        
      
        return token;
        
        
    } catch (e) {
        throw e
    }
};

module.exports = {
    makeLogin
};