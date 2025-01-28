import { defineStore } from 'pinia'
import { SearchResults } from '@/types/search/SearchResults'

interface SearchFilters {
  users: {
    following: boolean;
    popular: boolean;
  };
  posts: {
    mostLiked: boolean;
    mostSaved: boolean;
    mostCommented: boolean;
    liked: boolean;
    popular: boolean;
  };
}

interface SearchStore {
  originalResults: SearchResults,
  filteredResults: SearchResults 
}

export const searchStore = defineStore('search', {
    state: (): SearchStore => ({
        originalResults: { users: [], posts: []},
        filteredResults: { users: [], posts: [] }
    }),
    actions: {
        setOriginalResults(results: SearchResults) {
            this.originalResults = results;
        },
        setFilteredResults(results: SearchResults) {
            this.filteredResults = results;
        },
        filter(filters: SearchFilters) {
            let filteredUsers = [...this.originalResults.users];
            let filteredPosts = [...this.originalResults.posts];
        
            const userId = Number(localStorage.getItem("userId"));
        
            if (filters.users.following) {
                filteredUsers = filteredUsers.filter(user =>
                    user.followers.some(f => f.id === userId)
                );
            }
            if (filters.users.popular) {
                filteredUsers = filteredUsers.filter(user => user.followers.length > 1000);
            }
        
            if (filters.posts.liked) {
                filteredPosts = filteredPosts.filter(post =>
                    post.postLikes.some(like => like.user_id === userId)
                );
            }
          
            if (filters.posts.popular) {
                filteredPosts = filteredPosts.filter(
                    post => post.postLikes.length > 500 || post.postComments.length > 100
                );
            }
        
            if (filters.posts.mostLiked) {
                filteredPosts.sort((a, b) => b.postLikes.length - a.postLikes.length);
            }
            if (filters.posts.mostSaved) {
                filteredPosts.sort((a, b) => b.saved_post.length - a.saved_post.length);
            }
            if (filters.posts.mostCommented) {
                filteredPosts.sort((a, b) => b.postComments.length - a.postComments.length);
            }
        
            this.filteredResults = { users: filteredUsers, posts: filteredPosts };
        
            console.log("Filtered Results", this.filteredResults);
        }        
    }
})
