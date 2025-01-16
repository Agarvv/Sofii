import { Request, Response } from 'express'
import ProfileService from '@services/profile/ProfileService'

class ProfileController {
    public static async getUserProfile(req: Request, res: Response) {
        let { profileId } = req.params; 
        
        if(profileId == "s") {
            profileId = req.user.user_id;
        } // if the param value "profileId" is equal to "s" that means we have to get our autenthicated current user profile. 
        const profile = await ProfileService.getUserProfile(Number(profileId)); 
        
        res.status(200).json({
            profile: profile 
        })
    }
    
    public static async changeProfileData(req: Request, res: Response) {
        const { field, value } = req.body; 
        
        await ProfileService.changeProfileData(field, value, req.user.user_id); 
        
        res.status(200).json({
            message: `Your ${field} Has Been Updated.`
        })
    }
}

export default ProfileController; 