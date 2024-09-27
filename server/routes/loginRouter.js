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
            error: "Please Enter Email."
        })
    }
    
    if(!password) {
        return res.status(400).json({
            error: "Please Enter Password."
        })
    }


    try {
        const token = await loginController.handleLogin(email, password);
        
        
         if(rememberMe == true) {
            res.cookie('jwt', token, {
                maxAge: 365 * 24 * 60 * 60 * 1000, 
                secure: true, 
                httpOnly: true,
                sameSite: 'None' 
            });
            
         } else if(rememberMe == false) {
             res.cookie('jwt', token, {
                secure: true,
                httpOnly: true,
                sameSite: 'None' 
             })
         }
         
        return res.status(200).json({ welcome: 'Welcome Back To Sofii, Have a Good Session.' });
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({error: e.message})
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

router.post('/send_password_reset_url', [
   body("email").trim().isEmail().withMessage('Please enter a valid email')
], async (req, res) => {
    try {
        const email = req.body.email
        if(!email) {
            return res.status(400)
        }

        await loginController.sendPasswordResetUrl(email)
        return res.status(200).json({ detail: 'OK'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error})
    }
})

router.post('/reset_password', [
 body("password").trim()
], async (req, res) => {
  try {
      const { password, token } = req.body 
      if(!password) {
        return res.status(400)
      } 

      if(!token) {
        return res.status(400)
      }

      if(!req.cookies.jwt) {
        return res.status(401)
      }
      
     await loginController.resetPassword(password, token, req.cookies.jwt)
     return res.status(200).json({detail: 'OK'})
  } catch (e) {
    return res.status(500).json({ error: e})
  }
})

module.exports = router;