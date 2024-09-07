export async function getPosts(user) {
    console.log('Method called ¡')
    const response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/posts', {
        method: 'GET',
        credentials: 'include'
    })
    
    const data = await response.json()
    if(response.ok) {
     console.log('response ok!', data)
        data.posts.forEach((post) => {
            console.log('recorriendo post: ', post)
            
            post.isLiked = post.postLikes.some((like) => like.user_id == user.user_id);
            
            post.saved_post.forEach((saved) => {
                if(saved.user_id == user.user_id) {
                    post.isSaved = true
                } else {
                    post.isSaved = false
                    console.log('User Not Liked That Post.')
                }
             })
            
        })
        return data 
    } else {
        throw new Error("Internal Server Error")
    }
}




export async function savePost(post_id) {
    
    const response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/save_content', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
          },
         body: JSON.stringify({ type: 'POST', post_id: post_id }),
         credentials: 'include'
     })
     const data = await response.json()
     
     if(response.ok) {
         return data
     } else {
         throw new Error("Oops, Something Went Wrong...")
     }
     
}

export async function likePost(post_id) {
    
    const response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/like_content', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
          },
         body: JSON.stringify({ type: 'POST', post_id: post_id }),
         credentials: 'include'
     })
     const data = await response.json()
     if(response.ok) {
         return data
     } else {
         throw new Error("Oops, Something Went Wrong...")
     }
     
}

export async function deletePost(post_id) {
    const response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/destroy_post/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            post_id: post_id
        }),
        credentials: 'include'
    })
    
    const data = await response.json()
    if(response.ok) {
        console.log('Response Delete Post Ok!', data)
        return data
    } else {
        throw new Error("Internal Server Error")
    }
}

export async function commentPost(post_id) {
    const response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/comment', {
        
    })
    
    const data = await response.json()
    if(response.ok) {
        console.log('Comment Ok,', data)
    } else {
        throw new Error("Internal Server Error")
    }
}

export async function checkIfUserLikedPost(post, user)  {
    
    post.postLikes.forEach((like) => {
        if(like.user_id == user.user_id) {
            return true
        } else {
            return false
        }
    })
    
}

export async function checkIfUserSavedPost(post, user)  {
    post.saved_post.forEach((saved) => {
        if(saved.user_id == user.user_id) {
            return true
        } else {
            return false
        }
    })
}

