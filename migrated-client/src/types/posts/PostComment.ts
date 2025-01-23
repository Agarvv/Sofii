import { CommentOwner } from "./CommentOwner";
import { CommentLikes } from "./CommentLikes"
import { CommentDislikes } from './CommentDislikes'
import { CommentAnswer } from './CommentAnswer'

export interface PostComment {
  id: number,
  post_id: number,
  comment_content: string,
  commentUser: CommentOwner,
  comment_likes: CommentLikes[],
  comment_dislikes: CommentDislikes[]
}