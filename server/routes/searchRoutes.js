const express = require('express')
const router = express.Router()
const searchService = require('../services/searchService')

router.get('/search/:query', async (req, res) => {
    try {
        let query = req.params.query.toLowerCase()
        const results = await searchService.handleSearch(query, req.cookies.jwt)
        
        
        return res.status(201).json({results: results})
    } catch(e) {
        console.log(e)
        return res.status(500).json({error: e})
    }
})




module.exports = router
