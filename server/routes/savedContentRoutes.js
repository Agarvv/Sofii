const express = require('express')
const router = express.Router()
const savedContentController = require('../controllers/savedContentController')


router.post('/save_content', async (req, res) => {
    try {
        console.log('saved req.body: ', req.body);

        const { type, video_id, post_id } = req.body;
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized access, token missing.' });
        }

        let data = { saved: false, unsaved: false }
        let errorMessage = null;

        switch (type) {
            case 'VIDEO':
                if (!video_id) {
                    errorMessage = 'Something is wrong with the video that you want to save, try again or try with another video...';
                } else {
                     data = await savedContentController.saveVideo(token, video_id)
                }
                
                break;

            case 'POST':
                if (!post_id) {
                    errorMessage = 'Something is wrong with the post that you want to save, try again or try with another post...';
                } else {
                   data = await savedContentController.savePost(token, post_id)
                }
                break;

            default:
                errorMessage = 'Invalid content type.';
                break;
        }

        if (errorMessage) {
            return res.status(400).json({ error: errorMessage });
        }
        
        console.log('datavdhd', data)

        if(data.saved) {
            return res.status(200).json({
                saved: true
            })
        } else {
            return res.status(200).json({
                unsaved: true
            })
        }
        
        
        
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Internal server error' });
    }
});





router.get('/get_user_saved_content', async (req, res) => {
    try {
        const saved =  await savedContentController.handleUserSavedPage(req.cookies.jwt)
         return res.status(201).json({saved: saved})
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: e.message})
    }
})


module.exports = router