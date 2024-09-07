import fetchUrl from '../helpers/fetchUrl'


export async function findVideos(user) {
    try {
        console.log('find videos user: ', user)
        const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/videos', null, 'GET');
        
        if(response.ok) {
            const data = await response.json()
            
            data.videos.forEach((video) => {
                if(video.video_user_id == user.user_id) {
                    video.isOwnVideo = true
                } else {
                    video.isOwnVideo = false
                }
                
                video.video_likes.forEach((like) => {
                    if(like.user_id == user.user_id) {
                        video.isLiked = true
                    } else {
                        video.isLiked = false
                    }
                })
                
                video.videos_saved.forEach((saved) => {
                    if(saved.user_id == user.user_id) {
                        video.isSaved = true
                    } else {
                        video.isSaved = false
                    }
                })
            })
            
            console.log('Filters passed: ', data.videos)
            
            
            
            console.log('Response from Method videos!', data)
            return data
        } else {
            throw new Error("Something Went Wrong..")
        }
        
    } catch (e) {
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