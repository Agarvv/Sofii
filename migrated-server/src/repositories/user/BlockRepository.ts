
import Blocked from '@models/users/Blocked';


class BlockRepository {
    public static async block(blockerId: number, blockedId: number): Promise<void> {
        await Blocked.create({
            blocker_id: blockerId,
            blocked_id: blockedId 
        })
    }
    
    public static async getBlocked(blockedId: number, blockerId: number): Promise<Blocked | null> {
        return Blocked.findOne({
            where: {
                blocked_id: blockedId,
                blocker_id: blockerId 
            }
        })
    }
}

export default BlockRepository; 