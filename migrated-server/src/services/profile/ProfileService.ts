import ProfileRepository from '@repositories/profile/ProfileRepository'
import User from '@models/users/User'
import { UserAttributes } from '@models/users/User'

class ProfileService {
    public static async getUserProfile(userId: number) {
        const profile = await ProfileRepository.getUserProfile(userId); 
        return profile; 
    }

    public static async changeProfileData(field: keyof UserAttributes, value: UserAttributes[keyof UserAttributes], userId: number): Promise<void> {
        const user = await User.findByPk(userId);
        
        if (user) {
            (user as any)[field] = value;  
            await user.save();
        }
    }
    
    public static async setUserStatus(status: string, userId: number) {
        
        
        const user = await User.findByPk(userId); 
        
        if(user) {
        user.active = status == 'online'; 
        await user.save(); 
        }
    }
}

export default ProfileService;