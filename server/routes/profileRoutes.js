const express = require('express');
const userService = require('../services/userService');
const userController = require('../controllers/userController')
const router = express.Router();
const { body } = require('express-validator')
const { formidable } = require('formidable'); 
const { uploadImage } = require('../config/cloudinary');



router.get('/user/:userId', async (req, res) => {
    try {
        const user = await userService.findUserById(req.params.userId);
        return res.status(200).json({ user, isok: 'pk' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
});

router.post('/set_profile_banner', async (req, res) => {
    try {
        const form = formidable({ multiples: false });

        
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({ error: 'Error FORM' });
            }

            if (files['profile-banner'] && files['profile-banner'][0].filepath) {
                
                const uploadResult = await uploadImage(files['profile-banner'][0].filepath);
                
                
                await userService.handleProfileDataChange('banner', uploadResult.secure_url, req.cookies.jwt);
                
                return res.status(201).json({ success: 'OK' });
            } else {
                return res.status(400).json({ error: 'NO BANNER PROVIDED' });
            }
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});


router.post('/set_profile_picture', async (req, res) => {
    try {
        const token = req.cookies.jwt;

        const form = formidable({ multiples: false });

        // Parsear el formulario
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({ error: 'Error FORM' });
            }
            
       
            if (files['profile-picture'] && files['profile-picture'][0].filepath) {
                // Subir la imagen a Cloudinary
                const uploadResult = await uploadImage(files['profile-picture'][0].filepath);
                
          
                await userService.handleProfileDataChange('profilePicture', uploadResult.secure_url, token);
                
                return res.status(201).json({ success: 'OK' });
            } else {
                return res.status(400).json({ error: 'NO PROFILE PIC PROVIDED' });
            }
        });
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



router.post('/block_user', [
      body("target_id").isNumeric()
    ], async (req, res) => {
    try {
       const jwt = req.cookies.jwt 
       
       
       //this is the target id from the user that we want to block
       const target_id = req.body.target_id  
       
       
       if(!target_id) {
           //returns a bad request error
           return res.status(400)
       }
       
       const data = await userController.blockUser(target_id, jwt)
       //Data should be a object like:
       // if the user already blocked him and blocks him another time, data should be:
       // {unblocked: true, blocked: false} 
       // but if the user does not blocked the target, data should be:
       // { blocked: true, unblocked: false }
       //Like that we have a 'loop' and
       // we dont have to do 2 endpoints.
       
       return res.status(200).json(data)
       
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: e})
    }
})





module.exports = router;