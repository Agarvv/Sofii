const express = require('express')
const router = express.Router()
const savedContentController = require('../controllers/savedContentController')


router.post('/save_content', async(req, res) => {
    try {
        
       console.log('saved req.body: ', req.body)
        
        //TYPE OF CONTENT (VIDEO OR POST)
        let type = req.body.type
        
        //JSON WEB TOKEN OF THE USER
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized access, token missing.' });
        }
        
        
        //IF THE TYPE IS EQUAL TO VIDEO, THE SAVE VIDEO METHOD IS CALLED
        
        if(type == "VIDEO") {
            
            if(!req.body.video_id) {
                return res.status(404).json({error: 'Something is wrong with the video that you want to save, Try again or Try with another video...'})
            }
            
              await savedContentController.saveVideo(token, req.body.video_id, (saved, unsaved) => {
                  if(saved) {
                      return res.status(200).json({ message: 'Video saved successfully.' })
                  } 
                  if(unsaved) {
                      return res.status(200).json({message: 'Video unsaved sucessfully'})
                  }
              })
              
        
        
        // ELSE IF THE TYPE IS EQUAL TO POST, THE SAVE POST METHOD IS CALLED.
        
        } else if(type == "POST") {
            
            if(!req.body.post_id) {
                return res.status(404).json({error: 'Something is wrong with the post that you want to save, Try again or Try with another post...'})
            }
            
            await savedContentController.savePost(token, req.body.post_id, (saved, unsaved) => {
                if(saved) {
                    return res.status(200).json({detail: 'Post saved sucesfully'})
                } 
                if(unsaved) {
                    return res.status(200).json({detail: 'Post unsaved sucesfully'})
                }
            })
        
        
        // IF THE TYPE IS NOT EQUAL TO VIDEO OR IS NOT EQUAL TO POST, THEN THAT IS AN INVALID KEY. WE SEND AN ERROR TO THE USER
        } else if(type !=="VIDEO" || type !=="POST") {
            return res.status(500).json({error: 'Invalid Content Save.'})
        }


    } catch(e) {
        console.error(e)
        return res.status(500).json({ error: 'Internal server error' })
    }
})


router.get('/get_user_saved_content', async (req, res) => {
    try {
        const saved =  await savedContentController.handleUserSavedPage(req.cookies.jwt)
         return res.status(201).json({saved: saved})
    } catch(e) {
        console.log(e)
        return res.status(500)
    }
})


module.exports = router