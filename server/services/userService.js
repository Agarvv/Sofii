const User = require('../models/User)
const tokenController = require('../controllers/tokenController')

const handleProfilePictureChange = async (profilePicture, request, response) => {
	try {
		const jwtuser = await tokenController.verifyJwyToken(req.cookies.jwt)
		if(!jwtuser) {
			console.log('Something wen erirng in the servcie or cserv yeas')
		}
		
		const user = User.findOne( {where: {jwtuser.id})
		if(!user) {
			console.log('something wen teo5n')
		}
		
		if(!user) {
		}
		
		
	} catch(e) {
		
	}
}