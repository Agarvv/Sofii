
import { PostOwner } from "./PostOwner";
import { Like } from './Like'
import { Saved } from './Saved'
import { PostCommentDetails } from './PostCommentDetails'

export interface PostDetails {
    id: number,
    description: string,
    postPicture: string,
    user: PostOwner, 
    postComments: PostCommentDetails[],
    postLikes: Like[], 
    saved_post: Saved[]
}