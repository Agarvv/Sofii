const jwt = require('jsonwebtoken');
const User = require('../models/User')

const verifyJwtToken = (token) => {
    if(!token) {
        throw new Error("token_not_provided")
    }
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'secret', async (err, decoded) => {
            if (err) {
                console.log(err);
                reject(new Error("err_jwt_verify"));
                return;
            }
            console.log('Decoded Token: ', decoded);

            try {
                const dbUser = await User.findOne({
                    where: {
                        id: decoded.user_id
                    }
                });

                if (dbUser) {
                    resolve({
                        user_id: dbUser.id,
                        username: dbUser.username,
                        email: dbUser.email,
                        user_picture: dbUser.profilePicture,
                        user_banner: dbUser.banner,
                        user_bio: dbUser.bio,
                        user_civil_status: dbUser.civil_status,
                        user_gender: dbUser.gender,
                        user_native_city: dbUser.native_city,
                        user_ubication: dbUser.ubication,
                        user_job: dbUser.job
                    });
                } else {
                    reject(new Error("User not found"));
                }
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    });
};

module.exports = {
    verifyJwtToken
};
