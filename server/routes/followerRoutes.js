const express = require('express')
const router = express.Router() 
const tokenController = require('../controllers/tokenController')
const followerController = require('../controllers/followerController')
const { body } = require('express-validator')


router.post('/follow',[
    body("following_id").isNumeric()
], async (req, res) => {
    try {
         const userDecoded = 
         await tokenController.verifyJwtToken(req.cookies.jwt)
        if(!userDecoded) {
            throw new Error("Something went wrong")
        }
        
        const following_id = req.body.following_id
        if(!following_id) {
            throw new Error("Following id is required")
        }
        
        const data = await followerController.handleFollow(userDecoded, following_id)
        // DATA SHOULD BE LIKE: { followed: true, unfollowed: false } IF TH-
        // THE USER FOLLOWED.
        //BUT IF HE FOLLOWS HIM ANOTHER TIME DATA SHOULD BE:
        // { unfollowed: true, followed: false }
        // LIKE THAT WE HAVE A TOGGLE-FOLLOW SYSTEM :P
        if(data.followed && !data.unfollowed) {
            return res.status(200).json(data)
        } else if(data.unfollowed && !data.followed) {
            return res.status(200).json(data)
        }
        // we are doing that to check if all its on correct format 
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: e.message})
    }
})





module.exports = router 