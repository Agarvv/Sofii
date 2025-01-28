import SearchRepository from '@repositories/search/SearchRepository';
import Post from '@models/posts/Post';
import User from '@models/users/User';

class SearchService {
    public static async search(query: string): Promise<{ posts: Post[], users: User[] }> {
        
        const results = await SearchRepository.search(query);
        return results; 
        
    }
}

export default SearchService