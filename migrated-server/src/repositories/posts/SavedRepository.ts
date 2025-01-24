import Saved from '@models/posts/SavedPost'
import Post from '@models/posts/Post';

class SavedRepository {
    public static async getSaved(postId: number, userId: number): Promise<Saved | null> {
        return Saved.findOne({
            where: {
                user_id: userId,
                post_id: postId 
            }
        })
    }

    public static async getSaveds(userId: number) {
        return
}

}
export default SavedRepository; 