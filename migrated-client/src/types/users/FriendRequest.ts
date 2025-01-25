import { FriendRequestSender } from "./FriendRequestSender"

export interface FriendRequest {
     id: number,
     friend_target: number,
     request_sender_id: number,
     sender: FriendRequestSender
}