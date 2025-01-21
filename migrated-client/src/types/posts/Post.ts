import { PostComment } from "./PostComment";
import { PostOwner } from "./PostOwner";

export interface Post {
    id: number,
    description: string,
    postPicture: string,
    user: PostOwner, 
    postComments: PostComment[],
    postsLikes: any[], // only for now
    saved_post: any[] // only for now
}