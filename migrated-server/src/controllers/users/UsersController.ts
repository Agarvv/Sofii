import { Request, Response } from 'express'
import UsersService from '@services/users/UsersService'

class UsersController {
    public static async blockOrUnblock(req: Request, res: Response) {
        const { userId } = req.body; 
        
        const blockedOrUnblocked = await UsersService.blockOrUnblock(userId, req.account.user_id); 
        
       res.status(200).json({
            message: blockedOrUnblocked
        })
    }
    
    public static async followOrUnfollow(req: Request, res: Response) {
        const { userId } = req.body; 
        
        const followedOrUnfollowed = await UsersService.followOrUnfollow(userId, req.account); 
        
        res.status(200).json({
            message: followedOrUnfollowed 
        })
    }
    
    public static async sendFriendRequest(req: Request, res: Response) {
        const { userId } = req.body; 
        
        await UsersService.sendFriendRequest(userId, req.account); 
        
        res.status(200).json({
            message: "¡Friend Request Send!"
        })
    }
    
    public static async denyFriendRequest(req: Request, res: Response) {
        const { requestId } = req.body; 
        
        await UsersService.denyFriendRequest(requestId, req.account);
        
        res.status(200).json({
            message: "¡Friend Request Denied!"
        })
    }
    
    public static async acceptFriendRequest(req: Request, res: Response) {
        const { requestId } = req.body; 
        
        await UsersService.acceptFriendRequest(requestId, req.account);
        
        res.status(200).json({
            message: "¡Friend Request Accepted!"
        })
    }
}

export default UsersController; 