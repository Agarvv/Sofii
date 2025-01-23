import { AnswerOwner } from './AnswerOwner'
import { AnswerLikes } from './AnswerLikes'
import { AnswerDislikes } from './AnswerDislikes'

export interface CommentAnswer {
    id: number,
    post_id: number,
    comment_id: number,
    answer_content: string,
    awnser_user: AnswerOwner,
    awnser_likes: AnswerLikes[],
    awnser_dislikes: AnswerDislikes[] 
}