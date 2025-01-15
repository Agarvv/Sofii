import Friends from '@models/users/Friends';
import FriendRequest from '@models/users/FriendRequest';
import { Op } from 'sequelize'

class FriendRepository {
    public static async friendRequest(sender: number, receiver: number): Promise<FriendRequest> {
        return await FriendRequest.create({
            request_sender_id: sender,
            friend_target: receiver 
        })
    }
    
    public static async friends(oneId: number, twoId: number): Promise<void> {
        await Friends.create({
            friend_one_id: oneId,
            friend_two_id: twoId
        })
    }
    
    public static async unfriends(oneId: number, twoId: number) {
        await Friends.destroy({
            where: {
                [Op.or]: [
                    { friend_one_id: oneId, friend_two_id: twoId },
                    { friend_one_id: twoId, friend_two_id: oneId }
                ]
            }
        })
        
        await FriendRequest.destroy({
            where: {
                [Op.or]: [
                    {  request_sender_id: oneId,  friend_target: twoId },
                    { request_sender_id: twoId, friend_target: oneId }
                ]
            }
        });
    }
    
    public static async getFriendRequest(sender: number, receiver: number): Promise<FriendRequest | null> {
        return await FriendRequest.findOne({
            where: {
                [Op.or]: [
                    {  request_sender_id: sender,  friend_target: receiver },
                    { request_sender_id: receiver, friend_target: sender }
                ]
            }
        });
    }
    
    public static async getFriendRequestById(id: number): Promise<FriendRequest | null> {
        return await FriendRequest.findOne({
            where: {
                id: id 
            }
        })
    }
    
    public static async getFriend(oneId: number, twoId: number): Promise<Friends | null> {
        return await Friends.findOne({
            where: {
                [Op.or]: [
                    { friend_one_id: oneId, friend_two_id: twoId },
                    { friend_one_id: twoId, friend_two_id: oneId }
                ]
            }
        })
    }
}

export default FriendRepository; 