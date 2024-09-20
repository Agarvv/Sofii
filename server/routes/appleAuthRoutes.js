const express = require('express');
const passport = require('passport');
const router = express.Router();

// Ruta para iniciar sesión con Apple
router.get('/', passport.authenticate('apple'));

// Callback para Apple
router.get('/callback', passport.authenticate('apple', { failureRedirect: '/' }), (req, res) => {
  
});

module.exports = router;
