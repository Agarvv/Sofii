const express = require('express');
const { body } = require('express-validator');
const registerController = require('../controllers/auth/registerController');

const router = express.Router();

router.post('/register', [
    body("name").escape().trim().isLength({ min: 3, max: 30 }),
    body("email").escape().trim().isEmail(),
    body("password").escape().trim().isLength({ min: 3, max: 50 })
], async (req, res) => {
    const { name, email, password } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Please Enter Username." });
    }

    if (!email) {
        return res.status(400).json({ error: "Please Enter Email." });
    }

    if (!password) {
        return res.status(400).json({ error: "Please Enter Password." });
    }

    try {
        await registerController.createUser(name, email, password);
        return res.status(201).json({ success: 'Welcome To Sofii!' });
    } catch (e) {
        console.error('Error occurred:', e.message);
        switch (e.message) {
            case "username_exists":
                return res.status(400).json({ error: "The Username Already Exists." });
            case "email_exists":
                return res.status(400).json({ error: "The Email Is Already Associated To a Account." });
            default:
                return res.status(500).json({ error: "Something Went Wrong... :/" });
        }
    }
});

module.exports = router;