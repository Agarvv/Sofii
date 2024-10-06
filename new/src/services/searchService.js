import fetchUrl from '../helpers/fetchUrl'
import { checkIfUserIsFollowed,
        checkIfUserIsFriend } from './usersService'
import {
    checkIfUserLikedPost,
    checkIfUserSavedPost
} from './postService'

import {
    checkIfUserLikedVideo,
    checkIfUserSavedVideo
} from './videoService'

export async function handleSearch(query, currentUser) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + `/api/sofi/search/${query}`, null, 'GET');
    const data = await response.json();
    
    if (response.ok) {
        data.results.results.users.forEach(user => {
            user.following = user.followers.some(follower => follower.Follower.follower_id === currentUser.user_id);
            
            user.isYourFriend = user.friends.some(friend => 
                friend.friend_one_id === currentUser.user_id || 
                friend.friend_two_id === currentUser.user_id
            );
        });


        data.results.results.posts.forEach(post => {
            post.isLiked = post.postLikes.some(like => like.user_id === currentUser.user_id);
            post.isSaved = post.saved_post.some(saved => saved.user_id === currentUser.user_id);
        });



        data.results.results.videos.forEach(video => {
            video.isLiked = video.video_likes.some(like => like.user_id === currentUser.user_id);
            video.isSaved = video.videos_saved.some(saved => saved.user_id === currentUser.user_id);
        });

        return data;
    } else {
        throw new Error(data.error);
    }
}