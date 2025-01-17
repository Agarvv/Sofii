import BlockRepository from '@repositories/user/BlockRepository';
import FollowerRepository from '@repositories/user/FollowerRepository';
import FriendRepository from '@repositories/user/FriendRepository';
import User from '@models/users/User';
import CustomError from '@outils/CustomError';
import NotificationsService from '@services/notifications/NotificationsService';
import websocket from '@websocket/websocket';
import Account from '../../types/Account';

class UsersService {
    public static async blockOrUnblock(blockedId: number, blockerId: number): Promise<string> {
        if (blockedId === blockerId) throw new CustomError("You can't block yourself.", 400);

        const target = await User.findOne({ where: { id: blockedId } });
        if (!target) throw new CustomError('User to block not found.', 404);

        const existingBlock = await BlockRepository.getBlocked(blockedId, blockerId);

        if (existingBlock) {
            await existingBlock.destroy();
            return 'UNBLOCKED';
        }

        await this.destroyAnySocialRelations(blockedId, blockerId);
        await BlockRepository.block(blockerId, blockedId);

        return 'BLOCKED';
    }

    public static async followOrUnfollow(followedId: number, follower: Account): Promise<string> {
        if (followedId === follower.user_id) throw new CustomError("You can't follow yourself.", 400);

        const follow = await FollowerRepository.getFollow(follower.user_id, followedId);
        const io = websocket.getIO();

        if (follow) {
            await follow.destroy();
            io.emit('unfollowedUser', follow);
            return 'UNFOLLOWED';
        }

        const newFollow = await FollowerRepository.follow(follower.user_id, followedId);
        io.emit('newFollower', newFollow);

        await NotificationsService.sendNotificationToUser(
            followedId,
            follower.username,
            follower.user_id,
            newFollow,
            null,
            'NEW_FOLLOWER'
        );

        return 'FOLLOWED';
    }

    public static async sendFriendRequest(receiverId: number, sender: Account): Promise<void> {
        const existingRequest = await FriendRepository.getFriendRequest(sender.user_id, receiverId);
        if (existingRequest) throw new CustomError('You have already sent a friend request to this user.', 400);

        const existingFriend = await FriendRepository.getFriend(sender.user_id, receiverId);
        if (existingFriend) throw new CustomError('You are already friends with this user.', 409);

        const friendRequest = await FriendRepository.friendRequest(sender.user_id, receiverId);
        await NotificationsService.sendNotificationToUser(
            receiverId,
            sender.username,
            sender.user_id,
            friendRequest,
            null,
            'FRIEND_REQUEST'
        );
    }

    public static async denyFriendRequest(requestId: number, user: Account): Promise<void> {
        const friendRequest = await FriendRepository.getFriendRequestById(requestId);
        if (!friendRequest) throw new CustomError('Friend request not found.', 404);

        if (friendRequest.friend_target !== user.user_id) {
            throw new CustomError('You are not authorized to deny this friend request.', 401);
        }

        await friendRequest.destroy();
    }

    public static async acceptFriendRequest(requestId: number, user: Account): Promise<void> {
        const friendRequest = await FriendRepository.getFriendRequestById(requestId);
        if (!friendRequest) throw new CustomError('Friend request not found.', 404);

        if (friendRequest.friend_target !== user.user_id) {
            throw new CustomError('You are not authorized to accept this friend request.', 401);
        }

        await FriendRepository.friends(friendRequest.request_sender_id, friendRequest.friend_target);
        
        await friendRequest.destroy(); 

        await NotificationsService.sendNotificationToUser(
            friendRequest.request_sender_id,
            user.username,
            user.user_id,
            friendRequest,
            null,
            'ACCEPTED_FRIEND_REQUEST'
        );
    }

    private static async destroyAnySocialRelations(userId1: number, userId2: number): Promise<void> {
        await FriendRepository.unfriends(userId1, userId2);
        await FollowerRepository.unfollow(userId1, userId2);
    }
}

export default UsersService;