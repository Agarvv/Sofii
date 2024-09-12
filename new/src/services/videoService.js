import fetchUrl from '../helpers/fetchUrl'


export async function findVideos(user) {
    try {
        console.log('find videos user: ', user)
        const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/videos', null, 'GET');
        
        if(response.ok) {
            const data = await response.json()
            
            
                data.videos.forEach((video) => {
                    console.log('Video fjsj: ', video)
                    video.isLiked = video.video_likes.some(like => like.user_id == user.user_id)
                    
                    video.isSaved = video.videos_saved.some(saved => saved.user_id == user.user_id)
                })
            
            console.log('Filters passed: ', data.videos)
            
            
            
            console.log('Response from Method videos!', data)
            return data
        } else {
            throw new Error("Something Went Wrong..")
        }
        
    } catch (e) {
        console.log('error: ', e)
        throw e; 
    }
}


export async function likeVideo(video_id) {
    try {
        console.log('fetfhurlmethod: ', fetchUrl)
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
            console.log('Response from Method LikeVideo Ok!', data)
            return data
        } else {
            throw new Error("Something Went Wrong..")
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

