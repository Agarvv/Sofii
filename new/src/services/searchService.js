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
            user.following = checkIfUserIsFollowed(user, currentUser);
            user.isYourFriend = checkIfUserIsFriend(user, currentUser);
        });

        data.results.results.posts.forEach(post => {
            post.isLiked = checkIfUserLikedPost(post, currentUser);
            post.isSaved = checkIfUserSavedPost(post, currentUser);
        });

        data.results.results.videos.forEach(video => {
            video.isLiked = checkIfUserLikedVideo(video, currentUser);
            video.isSaved = checkIfUserSavedVideo(video, currentUser);
        });

        return data;
    } else {
        throw new Error(data.error);
    }
}