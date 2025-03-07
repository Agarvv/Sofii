import fetchUrl from '../helpers/fetchUrl'
import { checkIfUserIsFollowed } from './usersService'

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
    throw new Error(sdata.error)
}

}

// METHOD TO GET POST AND RECOMMENDED USERS
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
           // post.isOwn = post.user_id == user.user_id
        })
        // IS FOLLOWING MEANS IF YOU AR FOLLOWING THIS USER.
        data.users.forEach(otherUser => {
            otherUser.isFollowing = otherUser.followers.some(follower => follower.Follower.follower_id == user.user_id)
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

export async function getPost(post_id, currentUser) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + `/api/sofi/post/${post_id}`, null, 'GET');
    const data = await response.json();

    if (response.ok) {
        console.log('get post current user', currentUser)
        console.log('get post data', data)
        data.post.isLiked = await checkIfUserLikedPost(data.post, currentUser);
        data.post.isSaved = await checkIfUserSavedPost(data.post, currentUser);
       // data.post.isOwn = data.post.user_id == currentUser.user_id

        
        await Promise.all(data.post.postComments.map(async (comment) => {
            comment.isLiked = await checkIfCommentIsLiked(comment, currentUser);
            comment.isDisliked = await checkIfCommentIsDisliked(comment, currentUser);
            

            if (comment.awnsers) {
                await Promise.all(comment.awnsers.map(async (awnser) => {
                    awnser.isLiked = await checkIfAwnserIsLiked(awnser, currentUser);
                    awnser.isDisliked = await checkIfAwnserIsDisliked(awnser, currentUser);
                }));
            }
        }));

        return data.post;
    } else {
        console.log('not ok');
        throw new Error("intern_serv_err");
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


export async function checkIfAwnserIsLiked(awnser, user) {
    return awnser.awnser_likes.some(like => like.user_id == user.user_id)
}

export async function checkIfAwnserIsDisliked(awnser, user) {
    return awnser.awnser_dislikes.some(dislike => dislike.user_id == user.user_id)
}


