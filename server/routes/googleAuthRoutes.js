const express = require('express');
const passport = require('passport');
const router = express.Router();

// Ruta para iniciar sesión con Google
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback para Google
router.get('/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
   
});

module.exports = router;