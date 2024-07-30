const express = require('express');
const { body } = require('express-validator');
const loginController = require('../controllers/loginController');
const tokenController = require('../controllers/tokenController');

const router = express.Router();

router.post('/login', [
    body("email").escape().trim().isEmail(),
    body("password").escape().trim()
], async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email or Password Missing' });
    }

    try {
        const token = await loginController.handleLogin(email, password);
        res.cookie('jwt', token);
        return res.status(200).json({ welcome: 'Welcome Back To Sofii, Have a Good Session.' });
    } catch (e) {
        console.log(e);
        return res.status(401).json({ error: e.message });
    }
});


module.exports = router;