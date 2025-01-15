import Saved from '@models/posts/SavedPost'

class SavedRepository {
    public static async getSaved(postId: number, userId: number): Promise<Saved | null> {
        return Saved.findOne({
            where: {
                user_id: userId,
                post_id: postId 
            }
        })
    }
}