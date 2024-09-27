const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');  // Para generar el JWT
const router = express.Router();
const loginController = require('../controllers/loginController')


router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/callback', 
  passport.authenticate('google', { failureRedirect: 'https://sofii.vercel.app/login' }), 
  async (req, res) => {
      try {
         const jwtToken = await loginController.loginBySocialMedia(req.user)
         if(jwtToken) {
          res.cookie('jwt', jwtToken, {
            secure: true,
            httpOnly: true,
            sameSite: 'None' 
         })
             return res.redirect('https://sofii.vercel.app/')
         }
      } catch(e) {
        console.log(e)
          return res.redirect('https://sofii.vercel.app/login')
      }
  }
);


module.exports = router;