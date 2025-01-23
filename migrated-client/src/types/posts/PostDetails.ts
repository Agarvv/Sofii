import { PostComment } from "./PostComment";
import { PostOwner } from "./PostOwner";
import { Like } from './Like'
import { Saved } from './Saved'


export interface PostDetails {
    id: number,
    description: string,
    postPicture: string,
    user: PostOwner, 
    postComments: PostComment[],
    postsLikes: Like[], 
    saved_post: Saved[]
}