const express = require('express');
const { body } = require('express-validator');
const loginController = require('../controllers/loginController');
const tokenController = require('../controllers/tokenController');

const router = express.Router();

router.post('/login', [
    body("email").escape().trim().isEmail(),
    body("password").escape().trim()
], async (req, res) => {
    const { email, password, rememberMe } = req.body;
    
    console.log('Login req.body', req.body)

    if(!email) {
        return res.status(400).json({ 
            error: "email_missing"
        })
    }
    
    if(!password) {
        return res.status(400).json({
            error: "password_missing"
        })
    }


    try {
        const token = await loginController.handleLogin(email, password);
        
        
         if(rememberMe == true) {
             res.cookie('jwt', token, {
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 año en milisegundos
  });
         } else if(rememberMe == false) {
             res.cookie('jwt', token)
         }
         
         
        return res.status(200).json({ welcome: 'Welcome Back To Sofii, Have a Good Session.' });
    } catch (e) {
        console.log(e.message)
       switch(e.message) {
           case "password_does_not_match":
               return res.status(401).json({ error: "password_not_match"})
               break;
           
            case "email_not_found":
                return res.status(401).json({
                    error: "email_not_found"
                })
                break;
            default:
                  return res.status(500).json({
                      error: "internal_server_error"
                  })
                  break;
                  
       }
    }
});

router.get('/check_token',async (req, res) => {
    try {
         let token = req.cookies.jwt 
         if(!token) {
             return res.status(500).json({error: 'You Must Be Logged In.'})
         }
         
         let user = await tokenController.verifyJwtToken(token)
         if(!user) {
             return res.status(500).json({error: 'Something Went Wrong in your user Validation...'})
         }
         return res.status(201).json({user: user})
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: e})
    }
})


module.exports = router;