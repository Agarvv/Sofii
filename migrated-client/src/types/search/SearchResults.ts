import { UserResult } from './UserResult'
import { PostDetails } from '../posts/PostDetails'

export interface SearchResults {
    users: UserResult[],
    posts: PostDetails[] 
}