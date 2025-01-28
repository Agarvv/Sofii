import { PostComment } from "./PostComment";
import { PostOwner } from "./PostOwner";
import { Like } from './Like'
import { Saved } from './Saved'

export interface Post {
    id: number,
    description: string,
    postPicture: string,
    user: PostOwner, 
    postComments: PostComment[],
    postLikes: Like[], 
    saved_post: Saved[]
}