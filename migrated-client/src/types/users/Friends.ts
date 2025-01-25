import { Friend } from './Friend'
import { FriendRequest } from './FriendRequest'

export interface Friends {
    friends: Friend[],
    requests: FriendRequest[]
}