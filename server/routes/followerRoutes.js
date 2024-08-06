const express = require('express')
const router = express.Router() 
const tokenController = require('../controllers/tokenController')
const followerController = require('../controllers/followerController')
const { body } = require('express-validator')


router.post('/follow', async (req, res) => {
    try {
        console.log('follow req.body ', req.body)
         const userDecoded = 
         await tokenController.verifyJwtToken(req.cookies.jwt)
        if(!userDecoded) {
            throw new Error("Something went wrong")
        }
        
        const follower_id = userDecoded.user_id 
        const following_id = req.body.following_id
        
        await followerController.handleFollow(follower_id, following_id)
        
        return res.status(201).json({message: 'You Started Following User Nr: ', following_id})
        
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: e})
    }
})





module.exports = router 