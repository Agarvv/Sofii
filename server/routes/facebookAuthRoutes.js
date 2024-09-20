const express = require('express');
const passport = require('passport');
const router = express.Router();

// Ruta para iniciar sesión con Facebook
router.get('/', passport.authenticate('facebook', { scope: ['email'] }));

// Callback para Facebook
router.get('/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  
});

module.exports = router;
