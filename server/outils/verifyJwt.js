const jwt = require('jsonwebtoken');

const verifyJwt = (token) => {
  return jwt.verify(token, 'secret');
};

module.exports = {
  verifyJwt
};