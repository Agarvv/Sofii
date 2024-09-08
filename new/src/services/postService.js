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

export async function postComment(post_id, type, comment_content) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/comment_post', {
        post_id: post_id,
        type: type,
        comment: comment_content
    }, 'POST')
    
    const data = await response.json()
    if(response.ok) {
        console.log('Comment Ok,', data)
        return data
    } else {
        throw new Error("Internal Server Error")
    }
}

export async function checkIfUserLikedPost(post, user) {
    return post.postLikes.some(like => like.user_id === user.user_id);
}

export async function checkIfUserSavedPost(post, user) {
    return post.saved_post.some(saved => saved.user_id === user.user_id);
}


export async function getPost(post_id) {
      
      
      const response = await fetchUrl(process.env.VUE_APP_API_URL + `/api/sofi/post/${postId}`, null, 'GET')
      const data = await response.json()
      console.log('post id: ', data)

      
      if(response.ok) {
          console.log('respond ol: ',)
          return data.post
      } else {
          console.log('not ok')
          throw new Error("intern_serv_err")
      }
      
      
}


export async function awnserToComment(post_id, comment_id, awnser_content) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/awnser_to_comment', 
    {
        post_id: post_id,
        comment_id: comment_id,
        awnser_content: awnser_content
    },
    'POST'
    )
    
    const data = await response.json()

    if(response.ok) {
        return data
    } else {
        throw new Error("internal_serv_err")
    }
}

export async function likeComment(type, comment_id, post_id) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/like_content', {
          type: type,
          comment_id: comment_id,
          post_id: post_id
    }, 'POST')
    
    const data = await response.json()

      if(response.ok) {
          return data
      } else {
          throw new Error("intern_serv_err")
      }
}

export async function likeCommentAwnser(type, comment_id, awnser_id, post_id) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/like_content', {
        type: type,
        awnser_id: awnser_id,
        comment_id: comment_id,
        post_id: post_id
    }, 'POST')
    
    const data = await response.json()
    
    if(response.ok) {
        return data
    } else {
        throw new Error("intern_serv_err")
    }
}

export async function dislikeComment(type, comment_id, post_id) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/dislike_content', {
        type: type,
        comment_id: comment_id,
        post_id: post_id
    }, 'POST')
    
    const data = await response.json()
    
    if(response.ok) {
        return data
    } else {
        throw new Error("intern_serv_err")
    }
}

export async function dislikeCommentAwnser(type, comment_id, awnser_id, post_id) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/dislike_content', {
        type: type,
        comment_id: comment_id,
        awnser_id: awnser_id,
        post_id: post_id
    })
    
    const data = await response.json()
    
    if(response.ok) {
        return data
    } else {
        throw new Error("intern_serv_err")
    }
}