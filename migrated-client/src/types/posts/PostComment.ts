import { CommentOwner } from "./CommentOwner";

export interface PostComment {
  comment_content: string,
  commentUser: CommentOwner
}