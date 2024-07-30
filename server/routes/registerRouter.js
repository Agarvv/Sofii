const express = require('express');
const { body } = require('express-validator');
const registerController = require('../controllers/registerController');

const router = express.Router();

router.post('/register', [
    body("name").escape().trim().isLength({ min: 3, max: 30 }),
    body("email").escape().trim().isEmail(),
    body("password").escape().trim().isLength({ min: 3, max: 50 })
], async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Data Is Missing.' });
    }

    try {
        await registerController.createUser(name, email, password);
        return res.status(201).json({ success: 'Welcome To Sofii!' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
});

module.exports = router;