import express from 'express'
import ProfileController from '@controllers/profile/ProfileController'
import profileDataChangeSchema from '@validation/profile/ProfileDataChangeSchema'

const profileRouter = express.Router(); 

profileRouter.get('/:profileId',
  ProfileController.getUserProfile
)

profileRouter.post('/set', 
  ProfileController.changeProfileData
)

export default profileRouter; 