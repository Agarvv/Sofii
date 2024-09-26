const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');  // Para generar el JWT
const router = express.Router();
const loginController = require('../controllers/loginController')


router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:5000/login' }), 
  async (req, res) => {
      try {
         const jwtToken = await loginController.loginBySocialMedia(req.user)
         if(jwtToken) {
             res.cookie('jwt', jwtToken)
             return res.redirect('http://localhost:5000/')
         }
      } catch(e) {
        console.log(e)
          return res.redirect('http://localhost:5000/login')
      }
  }
);


module.exports = router;