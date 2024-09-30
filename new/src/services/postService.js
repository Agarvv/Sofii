import fetchUrl from '../helpers/fetchUrl'
import  { checkIfUserIsFollowed } from './usersService'

export async function createPost(vdata) {
const response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/createPost', {
    method: 'POST',
    body: vdata,
     credentials: 'include'
})

const sdata = await response.json()
if(response.ok) {
    return sdata
} else {
    throw new Error('Something Went Wrong...')
}
}

export async function getPosts(user) {
    console.log('Method called ¡')
    const response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/posts', {
        method: 'GET',
        credentials: 'include'
    })
    
    const data = await response.json()
    if(response.ok) {
        data.posts.forEach((post) => { 
            post.isLiked = post.postLikes.some((like) => like.user_id == user.user_id);
            post.isSaved = post.saved_post.some(saved => saved.user_id == user.user_id )
        })
        // IS FOLLOWING MEANS IF YOU AR FOLLOWING THIS USER.
        data.users.forEach(otherUser => {
            otherUser.isFollowing = checkIfUserIsFollowed(otherUser, user)
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
    console.log('typddb: ', type)
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

export async function getPost(post_id) {
      const response = await fetchUrl(process.env.VUE_APP_API_URL + `/api/sofi/post/${post_id}`, null, 'GET')
      const data = await response.json()

      if(response.ok) {
          
          data.post.isLiked = 
          
          return data.post
      } else {
          console.log('not ok')
          throw new Error("intern_serv_err")
      }
    
}


export async function awnserToComment(type, post_id, comment_id, awnser_content) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/awnser_to_comment', 
    {
        type: type,
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
    console.log('Methld called: ', type, comment_id, awnser_id, post_id)
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/dislike_content', {
        type: type,
        comment_id: comment_id,
        awnser_id: awnser_id,
        post_id: post_id
    }, 'POST')
    
    const data = await response.json()
    
    if(response.ok) {
        return data
    } else {
        throw new Error("intern_serv_err")
    }
}

export async function checkIfUserLikedPost(post, user) {
    return post.postLikes.some(like => like.user_id === user.user_id);
}

export async function checkIfUserSavedPost(post, user) {
    return post.saved_post.some(saved => saved.user_id === user.user_id);
}

export async function checkIfCommentIsLiked(comment, user) {
    return comment.comment_likes.some(like => like.user_id == user.user_id)
}

export async function checkIfCommentIsDisliked(comment, user) {
    return comment.comment_dislikes.some(dislike => dislike.user_id == user.user_id)
}


export async function checkIfAwnserIsDisliked(awnser, user) {
    return awnser.awnser_likes.some(like => like.user_id == user.user_id)
}

export async function checkIfAwnserIsDisliked(awnser, user) {
    return awnser.awnser_dislikes.some(dislike => dislike.user_id == user.user_id)
}




this.post.postComments.forEach(comment => {
            this.commentsById[comment.id] = comment;
            comment.isLiked = comment.comment_likes.some(like => like.user_id == this.usuario.user_id)
            
            comment.isDisliked = comment.comment_dislikes.some(dislike => dislike.user_id == this.usuario.user_id)
            
            
         
            comment.awnsers.forEach(awnser => {
            this.awnsersById[awnser.id] = awnser; 
            
            awnser.isLiked = awnser.awnser_likes.some(like => like.user_id == this.usuario.user_id)
            
            awnser.isDisliked = awnser.awnser_dislikes.some(dislike => dislike.user_id == this.usuario.user_id)
            
            
          });
          
          console.log('final comment: ', comment)
          
         });
          