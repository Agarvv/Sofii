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
    try {
        const response = await fetchUrl(process.env.VUE_APP_API_URL + `/api/sofi/search/${query}`, null, 'GET');
        const data = await response.json();
        if (response.ok) {

            await Promise.all(data.results.results.users.map(async (user) => {
                user.following = await checkIfUserIsFollowed(user, currentUser);
                user.isYourFriend = await checkIfUserIsFriend(user, currentUser);
            }));

            await Promise.all(data.results.results.posts.map(async (post) => {
                post.isLiked = await checkIfUserLikedPost(post, currentUser);
                post.isSaved = await checkIfUserSavedPost(post, currentUser);
            }));

            await Promise.all(data.results.results.videos.map(async (video) => {
                video.isLiked = await checkIfUserLikedVideo(video, currentUser);
                video.isSaved = await checkIfUserSavedVideo(video, currentUser);
            }));

            return data;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error("Error en handleSearch:", error);
        throw error;
    }
}