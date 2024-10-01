const express = require('express')
const friendController = require('../controllers/friendController')
const router = express.Router() 
const sendEmail = require('../config/mailer')

router.get('/friends',async (req, res) => {
    try {
        console.log('friend method claled')
        const jwt_token = req.cookies.jwt 
        
        const friends = await friendController.getUserFriendsAndRequests(jwt_token) 
        
        if(friends) {
            return res.status(201).json({ friends: friends })
        } else {
            return res.status(500).json({ error: 'Could not get your friends..'})
        }
        
    } catch(e) {
        console.log(e)
        return res.status(500).json({ error: e.message})
    }
}) 

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
        return res.status(500).json({error: e.message})
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





router.post('/accept_friend_request', async (req, res) => {
    try {
        console.log('accept req.body: ', req.body)
        const request_id = req.body.request_id 
        if(!request_id) {
            return res.status(401).json({ error: 'data missing'})
        }
        
        const jwt_token = req.cookies.jwt
        
        await friendController.acceptFriendRequest(jwt_token, request_id)
        return res.status(201).json({ detail: 'This person is now your friend.'})
        
    } catch(e) {
        sendEmail('casluagarv@gmail.com', 'error at sofii', e)
        return res.status(500).json({error: e.message})
    }
})


router.post('/deny_friend_request', async (req, res) => {
    try {
        
        console.log('deny re qbody', req.body)
        
        await friendController.denyFriendRequest(req.body.request_id, req.cookies.jwt)
        return res.status(201).json({ detail: 'Friend request removed sucesfully'})
        
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: e.message})
    }
})



module.exports = router 