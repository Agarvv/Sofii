import Follower from '@models/users/Followers';
import { Op } from 'sequelize'


class FollowerRepository {
    public static async follow(followerId: number, followedId: number): Promise<Follower> {
        return await Follower.create({
            follower_id: followerId,
            following_id: followedId 
        })
    }
    public static async unfollow(followerId: number, followedId: number): Promise<void> {
        await Follower.destroy({
            where: {
                [Op.or]: [
                    { follower_id: followerId,  following_id: followedId },
                    { follower_id: followedId,   following_id: followerId }
                ]
            }
        });
    }
    
    public static async getFollow(followerId: number, followedId: number): Promise<Follower | null>  {
        return await Follower.findOne({
            where: {
                [Op.or]: [
                    { follower_id: followerId,  following_id: followedId },
                    { follower_id: followedId,   following_id: followerId }
                ]
            }
        });
        
    }
}

export default FollowerRepository; 