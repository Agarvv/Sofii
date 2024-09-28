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
      console.log("Autenticación exitosa, usuario:", req.user); // Comprobar que req.user existe
      const jwtToken = await loginController.loginBySocialMedia(req.user);
      if (jwtToken) {
        res.cookie('jwt', jwtToken, {
          secure: true,
          httpOnly: true,
          sameSite: 'None' 
        });
        return res.redirect('https://sofii.vercel.app/');
      } else {
        throw new Error("No se pudo generar el JWT");  // Forzar un error si no hay JWT
      }
    } catch (e) {
      // Devuelve todo el stacktrace en la respuesta JSON para saber qué está pasando
      return res.status(500).json({
        message: "Error al iniciar sesión con Twitter.",
        error: e.message,
        stack: e.stack  // Incluye el stack trace en la respuesta
      });
    }
  },
  (err, req, res, next) => {
    // Devuelve el error completo de autenticación
    return res.status(500).json({
      message: "Error de autenticación con Twitter.",
      error: err.message,
      stack: err.stack  // También puedes incluir el stack trace en caso de error en autenticación
    });
  }
);

module.exports = router;