import fetchUrl from "../helpers/fetchUrl"


//FUNCTION TO REGISTER USER 
export async function registerUser(data) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/register', {
        name: data.name,
        email: data.email,
        password: data.password
    }, 'POST');

    const responseData = await response.json();

    if (response.ok) {
        return responseData;
    } else {
        throw new Error("Something Went Wrong");
    }
}

export async function loginUser(data) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/login', {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe
    }, 'POST')
    const ServerData = await response.json()
    if(response.ok) {
        return ServerData
    } else {
        throw new Error(serverData.error)
    }
}



// FUNCTION TO GET A SPECIFIC USER, USED IN THE USER PAGE
// USER_ID MEANS THE ID FROM THE USER THAT WE WANT TO GET, (it is not obvious?? :P)
export async function getUser(user_id, currentUser) {
  const response = await fetchUrl(process.env.VUE_APP_API_URL + `/api/sofi/user/${user_id}`, null, 'GET')
  const data = await response.json()
  console.log('data from the server', data)
  console.log('all data', currentUser)
  if(response.ok) {
      
   

  
const friendRequestSentExists = data.user.sentRequests.some(request => 
  request.request_sender_id == currentUser.user_id && request.friend_target == data.user.id
);




    

      // Here we just check if a user is following the user of the request
      data.user.isFollowing = data.user.followers.some(follower => follower.Follower.follower_id == currentUser.user_id)
        
     // Here we check if our current user is friend with the user that he is seeing
     data.user.isFriend = data.user.friends.some(friend => friend.friend_one_id == currentUser.user_id || friend.friend_two_id == currentUser.user_id)

     // here we check if our current user blocked the user that he is seeing
     data.user.isBlocked = data.user.users_blocked_me.some(block => block.blocker_id == currentUser.user_id)
     return data
  } else {
    throw new Error('Something Went Wrong.')
    // THIS WILL BE6 HANDLED ALLWAYS ON THE COMPONENT,
    // SO DONT WORRY ABOUT IT
  }
}

// FUNCTION TO SEND A RESET PASSWORD URL
export async function sendPasswordResetUrl(email) {
  const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/send_password_reset_url', {
     email: email
   }, 'POST')
  
   if(response.ok) {
    return data
   } else {
    throw new Error('something went wrong')
   }
}

// FUNCTION TO CHANGE A USER'S PASSWORD
export async function changeUserPassword(password, token) {
   const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/reset_password', {
    password: password,
    token: token // THE RESET TOKEN GENERATED IN THE SERVER 
   }, 'POST')
  
   if(response.ok) {
    return data
   } else {
    throw new Error('something went wrong')
   }
}

export function checkIfUserIsFollowed(user, currentUser) {
  // USER IS THE USER TO COMPARE THE DATA
  // current user is the current user of the session 
  console.log('user:vv', user)
  const isFollowing = user.followers.some(follower => follower.Follower.follower_id == currentUser.user_id)
  return isFollowing
}
// wenn sehen sie das, ich mochte sie weissen was ich liebe sie ;)
export async function checkIfUserIsFriend(user, currentUser) {
  // USER IS THE USER TO COMPARE THE DATA
  // current user is the current user of the session
  const isFriend = user.friends.some(friend => friend.friend_one_id == currentUser.user_id || friend.friend_two_id == currentUser.user_id)
  return isFriend
}

// USER MEANS THE USER THAT WE WANT TO FOLLOW
export async function followUser(user_id) {
   const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/follow', {
    following_id: user_id
   }, 'POST')
   const data = await response.json()
   if(response.ok) {
    return data
   } else {
    throw new Error('Something Went Wrong.')
   }
}

// USER_ID MEANS THE USER ID FROM THE USER THAT WE WANT TO BE FRIENDS.
export async function sendFriendRequest(user_id) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/send_friend_request', {
        friend_target: user_id
    }, 'POST')

    const data = await response.json() 
    if(response.ok) {
       return data
    } else {
        throw new Error('Something Went Wrong.')
    }
} 
// no se porque me pongo a hacer comentarios random
// en el medio del codigo pero, si entiendes esto,
// q sepas q te amo <3


// req_id means the friend request id.
export async function acceptFriendRequest(req_id) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/accept_friend_request', {
      request_id: req_id
    }, 'POST')
    const data = await response.json()
    if(response.ok) {
      return data
    } else {
        throw new Error('Something went wrong.')
    }
}

// req_id means the friend request id.
export async function denyFriendRequest(req_id) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + 'api/sofi/deny_friend_request', {
      request_id: req_id
    }, 'POST')
    const data = await response.json()
    if(response.ok) {
      return data
    } else {
        throw new Error('Something went wrong.')
    }
}
// Yes, i could handle the friend request logic in one function,
// but this is more easy to understand. :P

export async function blockUser(target_id) {
    const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/block_user', {
        target_id: target_id
    }, 'POST')
    
    const data = await response.json()
    if(response.ok) {
        return data 
    }
    else {
        throw new Error('error')
    }
}




// angular >>>>>> vue