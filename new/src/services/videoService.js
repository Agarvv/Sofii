import fetchUrl from '../helpers/fetchUrl'


// METHOD TO GET A VIDEO
export async function getVideo(video_id, currentUser) {
    console.log("Video id from the damn method: ", video_id)
    const response = await fetch(process.env.VUE_APP_API_URL + `/api/sofi/video/${video_id}`);
    const data = await response.json();

    if (response.ok) {
        data.video.isLiked = await checkIfUserLikedVideo(data.video, currentUser);
        data.video.isSaved = await checkIfUserSavedVideo(data.video, currentUser);

        for (const comment of data.video.video_comments) {
            comment.isLiked = await checkIfCommentLiked(comment, currentUser);
            comment.isDisliked = await checkIfCommentDisliked(comment, currentUser);
            comment.showAwnserInp = false
            comment.showAwnsers = false

            // Loop through "awnsers" (yes, we’ll tolerate the spelling)
            for (const awnser of comment.awnsers) {
                awnser.isLiked = await checkIfAwnserLiked(awnser, currentUser);
                awnser.isDisliked = await checkIfAwnserDisliked(awnser, currentUser);
            }
        }

        return data;
    } else {
        throw new Error(data.error);
    }
}



// METHOD TO CREATE A VIDEO
export async function createVideo(data) {
   const response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/add_video', {
    method: 'POST',
    body: data,
    credentials: 'include'
   })
   const sdata = await response.json()
   if(response.ok) {
    return sdata 
   } else {
    throw new Error('Something went')
   }
}

// METHOD TO FIND VIDEOS FOR THE VIDEOS PAGE
export async function findVideos(user) {
    try {
        const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/videos', null, 'GET');
        const data = await response.json()
        if(response.ok) {
                data.videos.forEach((video) => {
                    video.isLiked = video.video_likes.some(like => like.user_id == user.user_id)
                    video.isSaved = video.videos_saved.some(saved => saved.user_id == user.user_id)
                })
            return data
        } else {
            throw new Error("Something Went Wrong")
        }
        
    } catch (e) {
        console.log('error: ', e)
        throw e; 
    }
}


export async function likeVideo(video_id) {
    try {
        const response = await fetchUrl(process.env.VUE_APP_API_URL +
        '/api/sofi/like_content',
        {
            type: "VIDEO",
            video_id: video_id
        },
        'POST'
        )
        
        if(response.ok) {
            const data = await response.json()
            return data
        } else {
            throw new Error(data.error)
        }
    } catch(e) {
        throw e
    }
}

export async function saveVideo(video_id) {
    console.log('Save method called?')
    try {
        const response = await 
        fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/save_content',
        {
            type: "VIDEO",
            video_id: video_id
        },
        'POST'
        )
        
        if(response.ok) {
            const data = await response.json()
            console.log('Response from Method saveVideo Ok!', data)
            return data
        } else {
            throw new Error("Something Went Wrong..")
        }
        
    } catch(e) {
        throw e
    }
}

export async function deleteVideo(video_id) {
    try {
        const response = await
        fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/destroy_video',
        {
            video_id: video_id
        },
        'POST'
        )
        
        if(response.ok) {
            const data = await response.json()
            console.log('Response from Method deleteVideo Ok!', data)
            return data
        } else {
            throw new Error("Something Went Wrong..")
        }
        
    } catch(e) {
        throw e
    }
}

export async function uploadVideoComment(type, video_id,comment_content) {
    
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/comment_post', {
        type: type,
        video_id: video_id,
        comment: comment_content
    }, 'POST')
    
    const data = await response.json()
    if(response.ok) {
        return data 
    } else {
        throw new Error("Something Went Wrong")
    }
    
}

export async function awnserToVideoComment(comment_id, post_id, awnser, type)
  {
      console.log('method calle')
     const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/awnser_to_comment', {
         comment_id: comment_id,
         video_id: post_id,
         awnser_content: awnser,
         type: type
     }, 'POST')
     const data = await response.json()
   
     if(response.ok) {
         return data
     } else {
         console.error('ERROR!', data)
         throw new Error("Something Went Wrong")
     }
 }
 
 
export async function likeVideoComment(comment_id, video_id, type) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/like_content', {
        comment_id: comment_id,
        video_id: video_id,
        type: type
    }, 'POST')
    
    const data = await response.json()
    if(response.ok) {
        return data
    } else {
        throw new Error("Something Went Wrong")
    }
}

export async function dislikeVideoComment(comment_id, video_id, type) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/dislike_content', {
        comment_id: comment_id,
        video_id: video_id,
        type: type
    }, 'POST')
    
    const data = await response.json()
    if(response.ok) {
        return data
    } else {
        throw new Error("Something Went Wrong")
    }
}

export async function likeVideoCommentAwnser(comment_id, awnser_id, video_id, type) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/like_content', {
        comment_id: comment_id,
        awnser_id: awnser_id,
        video_id: video_id,
        type: type
    }, 'POST')
    
    const data = await response.json()
    if(response.ok) {
        return data
    } else {
        throw new Error("Something Went Wrong")
    }
}

export async function dislikeVideoCommentAwnser(comment_id, awnser_id, video_id, type) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/dislike_content', {
        comment_id: comment_id,
        awnser_id: awnser_id,
        video_id: video_id,
        type: type
    }, 'POST')
    
    const data = await response.json()
    if(response.ok) {
        return data
    } else {
        throw new Error("Something Went Wrong")
    }
}

export async function checkIfUserLikedVideo(video, user) {
    return video.video_likes.some(like => like.user_id == user.user_id)
}

export async function checkIfUserSavedVideo(video, user) {
    return video.videos_saved.some(saved => saved.user_id == user.user_id)
}

export async function checkIfCommentLiked(comment, user) {
    return comment.comment_likes.some(like => like.user_id == user.user_id)
}

export async function checkIfCommentDisliked(comment, user) {
    return comment.comment_dislikes.some(dislike => dislike.user_id == user.user_id)
}


export async function checkIfAwnserLiked(awnser, user) {
    return awnser.awnser_likes.some(like => like.user_id == user.user_id)
}

export async function checkIfAwnserDisliked(awnser, user) {
    return awnser.awnser_dislikes.some(dislike => dislike.user_id == user.user_id)
}
