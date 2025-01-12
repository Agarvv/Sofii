const verifyJwt = require('../outils/verifyJwt');

const authenticate = (req, res, next) => {
  try {
    const decoded = verifyJwt(req.cookies.jwt);
    
    req.user = decoded;
    
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }
};

module.exports = authenticate;