const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');  
const router = express.Router();
const loginController = require('../controllers/loginController');


router.get('/', passport.authenticate('github', { scope: ['user:email'] }));


router.get('/callback', 
  passport.authenticate('github', { failureRedirect: 'https://sofii.vercel.app/login' }), 
  async (req, res) => {
      try {
         const jwtToken = await loginController.loginBySocialMedia(req.user)
         if(jwtToken) {
             res.cookie('jwt', jwtToken);
             return res.redirect('https://sofii.vercel.app/');
         }
      } catch(e) {
          return res.redirect('https://sofii.vercel.app/login');
      }
  }
);

module.exports = router;