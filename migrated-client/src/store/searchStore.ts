import { defineStore } from 'pinia'
import { SearchResults } from '@/types/search/SearchResults'

interface SearchFilters {
  users: {
    following: boolean;
    friend: boolean;
    popular: boolean;
  };
  posts: {
    mostLiked: boolean;
    mostSaved: boolean;
    mostCommented: boolean;
    liked: boolean;
    latest: boolean;
    popular: boolean;
    trending: boolean;
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
            const userId = Number(localStorage.getItem("userId"))

            const filteredUsers = this.originalResults.users.filter(user => {
                return (
                    (filters.users.following ? user.followers.some((f) => f.follower_id == userId) : true) &&
                    (filters.users.friend ? user.friends.some((f) => f.friend_one_id == userId || f.friend_two_id == userId) : true) &&
                    (filters.users.popular ? user.followers.length > 1000 : true)
                );
            });

            const filteredPosts = this.originalResults.posts.filter(post => {
                return (
                    (filters.posts.mostLiked ? post.postsLikes.length > 100 : true) &&
                    
                    (filters.posts.mostSaved ? post.saved_post.length > 50 : true) &&
                    
                    (filters.posts.mostCommented ? post.postComments.length > 50 : true) &&
                    
                    (filters.posts.liked ? post.postsLikes.some(like => like.user_id == userId) : true) &&
                    
                    (filters.posts.popular ? post.postsLikes.length > 500 || post.postComments.length > 100 : true)
                    
                );
            });
            
            this.filteredResults = { users: filteredUsers, posts: filteredPosts };
            
            console.log("filtered results", this.filteredResults)
        }
    }
})