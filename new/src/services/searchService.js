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
        
        for (const user of data.results.results.users) {
            user.following = await checkIfUserIsFollowed(user, currentUser);
            user.isYourFriend = await checkIfUserIsFriend(user, currentUser);
        }

        for (const post of data.results.results.posts) {
            post.isLiked = await checkIfUserLikedPost(post, currentUser);
            post.isSaved = await checkIfUserSavedPost(post, currentUser);
        }

        for (const video of data.results.results.videos) {
            video.isLiked = await checkIfUserLikedVideo(video, currentUser);
            video.isSaved = await checkIfUserSavedVideo(video, currentUser);
        }

        return data;
    } else {
        throw new Error(data.error);
    }
}