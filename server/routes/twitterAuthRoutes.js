const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');  
const router = express.Router();
const loginController = require('../controllers/loginController');
router.get('/', (req, res, next) => {
    passport.authenticate('twitter', { failWithError: true })(req, res, next);
  });
  
  router.get('/callback', 
    passport.authenticate('twitter', { failureRedirect: 'https://sofii.vercel.app/login', failWithError: true }),
    async (req, res) => {
      try {
        const jwtToken = await loginController.loginBySocialMedia(req.user);
        if (jwtToken) {
          res.cookie('jwt', jwtToken, {
            secure: true,
            httpOnly: true,
            sameSite: 'None' 
          });
          return res.redirect('https://sofii.vercel.app/');
        }
      } catch (e) {
        // Retorna un error JSON en caso de fallo
        return res.status(500).json({
          message: "Error al iniciar sesión con Twitter.",
          error: e// Aquí puedes incluir detalles del error
        });
      }
    },
    (err, req, res, next) => {
      // Manejo de errores si la autenticación falla
      return res.status(500).json({
        message: "Error de autenticación con Twitter.",
        error: err // Muestra el mensaje de error
      });
    }
  );
  

module.exports = router;