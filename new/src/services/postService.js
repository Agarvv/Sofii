import fetchUrl from '../helpers/fetchUrl'



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
            
            post.isSaved = post.saved_post.some(saved => saved.user_id == user.user_id )
            
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


export async function getPost(post_id) {
      
      const response = await fetchUrl(process.env.VUE_APP_API_URL + `/api/sofi/post/${postId}`, null, 'GET')
      if(response.ok) {
          const data = await response.json()
          return data.post
      } else {
          throw new Error("intern_serv_err")
      }
      
      
}

export async function postComment(post_id, type, comment_content) => {
        
        const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/comment_post', {
            comment: comment_content,
            type: type,
            post_id: post_id
        }, 'POST')
        
        if(response.ok) {
            return data
        } else {
            throw new Error("intern_serv_err")
        }
      
}

export async function awnserToComment(post_id, comment_id, awnser_content) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/awnser_to_comment', 
    {
        post_id: post_id,
        comment_id: comment_id:
        awnser_content: awnser_content
    },
    'POST'
    )

    if(response.ok) {
        return data
    } else {
        throw new Error("internal_serv_err")
    }
}