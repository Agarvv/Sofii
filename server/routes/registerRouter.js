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

    if (!name) {
        return res.status(400).json({ error: "name_missing" });
    }

    if (!email) {
        return res.status(400).json({ error: "email_missing" });
    }

    if (!password) {
        return res.status(400).json({ error: "password_missing" });
    }

    try {
        await registerController.createUser(name, email, password);
        return res.status(201).json({ success: 'Welcome To Sofii!' });
    } catch (e) {
        console.error('Error occurred:', e.message);
        switch (e.message) {
            case "username_exists":
                return res.status(400).json({ error: "username_exists" });
            case "email_exists":
                return res.status(400).json({ error: "email_exists" });
            default:
                return res.status(500).json({ error: "internal_server_error" });
        }
    }
});

module.exports = router;