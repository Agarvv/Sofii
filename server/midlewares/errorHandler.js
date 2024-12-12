const CustomError = require('../outils/CustomError')


module.exports = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ error: err.message });
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};