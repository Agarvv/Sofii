const express = require('express')
const friendController = require('../controllers/friendController')
const router = express.Router() 



router.post('/send_friend_request', async (req, res) => {
    try {
        console.log('friend req bodh', req.body)
        const token = req.cookies.jwt
        if(!token) {
            return res.status(404).json({error: 'Your Session Is Not Valid.'})
        }
        
        const friend_target = 
        req.body.friend_target 
        
        await friendController.handleFriendRequest(token, friend_target)
        
        return res.status(201).json({message: 'Your Friend Request Has Been Sucesfully Sendt.'})
        
        
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: e})
    }
})

router.get('/friend_requests/:user_id',async (req, res) => {
    try {
         
         const requests = await friendController.getFriendRequestsByUserId(req.params.user_id)
         
         if(requests.length == 0) {
             return res.status(404).json({detail: 'That user does not have friend requests'})
         }
         
         return res.status(201).json({ requests: requests})
         
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: e})
    }
})





router.post('/add_friend', (req, res) => {
    try {
        
        
        
        
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: e})
    }
})




module.exports = router 