const express = require('express');
const userService = require('../services/userService');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'media/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get('/user/:userId', async (req, res) => {
    try {
        const user = await userService.findUserById(req.params.userId);
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
});

router.post('/set_profile_banner', upload.single('profile-banner'), async (req, res) => {
    try {
        console.log(req.file)
        await userService.handleProfileDataChange('banner', req.file.path, req.cookies.jwt);
        return res.status(201).json({ success: 'Your Profile Banner Has Been Changed Successfully!' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

router.post('/set_profile_picture', upload.single('profile-picture'), async (req, res) => {
    try {
        
        
        if (!req.cookies.jwt) {
            return res.status(404).json({ err: "no token" });
        } else {
            console.log('endpoint token', req.cookies.jwt);
        }
        
        
       
        const token = req.cookies.jwt;
        
        await userService.handleProfileDataChange('profilePicture', req.file.path, token);
        
        return res.status(201).json({ success: 'Your Profile Picture Has Been Changed Successfully!' });
        
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
});

router.post('/set_native_city', async (req, res) => {
    try {
        console.log(req.body)
        await userService.handleProfileDataChange('native_city', req.body.native_city, req.cookies.jwt);
        return res.status(201).json({ success: 'Your Profile Native City Has Been Changed Successfully!' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

router.post('/set_civil_status', async (req, res) => {
    try {
        console.log(req.body)
        await userService.handleProfileDataChange('civil_status', req.body.civil_status, req.cookies.jwt);
        return res.status(201).json({ success: 'Your Profile Civil Status Has Been Changed Successfully!' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

router.post('/set_ubication', async (req, res) => {
    try {
        console.log(req.body)
        await userService.handleProfileDataChange('ubication', req.body.ubication, req.cookies.jwt);
        return res.status(201).json({ success: 'Your Profile Ubication Has Been Changed Successfully!' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

router.post('/set_bio', async (req, res) => {
    try {
        console.log('bio req.body', req.body)
        await userService.handleProfileDataChange('bio', req.body.bio, req.cookies.jwt);
        return res.status(201).json({ success: 'Your Profile Bio Has Been Changed Successfully!', bio: req.body.bio });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

router.post('/set_job', async (req, res) => {
    try {
        
        console.log('job req.body', req.body)
        await userService.handleProfileDataChange('job', req.body.job, req.cookies.jwt);
        return res.status(201).json({ success: 'Your Profile Job Has Been Changed Successfully!', Job: req.body.job });
        
    } catch(e) {
        return res.status(500).json({ error: 'Internal server error.'})
    }
})

router.post('/set_gender', async (req, res) => {
    try {
        
        console.log('gender req.body', req.body)
        await userService.handleProfileDataChange('gender', req.body.gender, req.cookies.jwt);
        return res.status(201).json({ success: 'Your Profile Gender Has Been Changed Successfully!', Gender: req.body.gender });
        
    } catch(e) {
        return res.status(500).json({ error: 'Internal server error.'})
    }
})

module.exports = router;