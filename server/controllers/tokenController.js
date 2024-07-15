const jwt = require('jsonwebtoken');

const verifyJwtToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, 'secret', (err, decoded) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log('Decoded Token: ', decoded);
                resolve(decoded)
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};

module.exports = {
    verifyJwtToken
};