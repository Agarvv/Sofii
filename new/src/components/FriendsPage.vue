<template>
    <div> 
    
    <header> 
  <div class="logo">
  <i class="fa fa-arrow-left"></i>
   <!-- <font-awesome-icon icon="arrowLeft"/> -->
    <h1>Sofii</h1>
  </div>
</header>

<div class="container">
  
  <aside>

    
    <div class="aside-content">
      
      <div @click="toggleSelectedOption('friends')" class="only-friends">
     
       <font-awesome-icon icon="userFriends"/> 
        <h4>Only My Friends</h4>
    
      </div>
       
      <div @click="toggleSelectedOption('friend_requests')" class="pending-requests">
        <font-awesome-icon icon="userPlus"/>
        <h4>Pending requests</h4>
       
      </div>
      
      
    </div>
    
    
  </aside>
  
  <main>
      

    <div class="responsive-main-header">
      
      <div @click="toggleSelectedOption('friends')" class="rmh-only-friends">
        <font-awesome-icon icon="userFriends"/> 
      
        <h4>Only My Friends</h4>
        
        
      </div>
      <div @click="toggleSelectedOption('friend_requests')"class="rmh-pending-requests">

       <font-awesome-icon icon="userPlus"/> 

        <h4>Pending requests</h4>
        
       
        
        
      </div>
    
    </div>
    
          <h4 style="width: 100%;
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 20px;
           padding: 10px;
           color: gray" v-if="friends.length == 0 && friend_requests.length == 0">You Do Not Have Friends And Friend Request Yet</h4>
    
    <div v-if="selectedOption === 'friend_requests' || selectedOption === null" class="friends-requests">
      <h4 v-if="friend_requests.length > 0">Your Friend Requests</h4>
      
      <h4 style="width: 100%;
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 20px;
           padding: 10px;
           color: gray" v-if="selectedOption === 'friend_requests' && friend_requests.length === 0">You Do Not Have Pending Friend Requests</h4>
     
      <div v-for="request in friend_requests" :key="request.id" class="friend">
        
        <div class="friend-details">
          
          <div @click="goToUserPage(request.sender.id)" class="friend-img">
            <img style="width: 80px; border-radius: 50%" :src="'http://localhost:3000/' + request.sender.profilePicture">
          </div>
          
          <div class="friend-username-and-buttons">
            <h2>{{request.sender.username}}</h2>
            
            <div  class="friend-buttons">
              <button @click="acceptRequest(request.id)" class="f-button-accept">
                Accept
              </button>
              <button @click="declineRequest(request.id)" class="f-button-deny">
                Deny
              </button>
            </div>
            
          </div>
          
        </div>
        
      </div> <!-- END OF FRIEND DIV --> 
      
      
    </div>
    
    <div v-if="selectedOption == 'friends' || selectedOption == null" class="friends"> 
    <h4 v-if="friends.length > 0">Your Friends</h4>
    
          <h4 style="width: 100%;
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 20px;
           padding: 10px;
           color: gray" v-if="selectedOption === 'friends' && friends.length === 0">You Do Not Have Friends Yet</h4>

      
      <div  v-for="friend in friends" :key="friend.friendToDisplayInfo.id"class="friend" @click="goToUserPage(friend.friendToDisplayInfo.id)">
          
          
        
        <div class="friend-details">
           
          <div class="friend-img"> 
            
            <img :src="'http://localhost:3000/' + friend.friendToDisplayInfo.profilePicture">
            
          </div>
          
          <div class="friend-username">
              <h3>{{friend.friendToDisplayInfo.username}}</h3>
          </div>
          
          
        </div> 
        
        <div class="friend-chat">
           <font-awesome-icon icon="message"/>
         
        </div>
        
      </div>
      
    </div>
    
    
  </main>
  
  
</div>


</div>
</template>

<script>
import { getUserFriends,  acceptFriendRequest, denyFriendRequest } from '../services/usersService'

export default {
    name: 'FriendsPage',
    data() {
        return {
            friends: [],
            friend_requests: [],
            selectedOption: null,
            loading: true,
            error: ""
        };
    },
    methods: {
        async getFriends() {
            try {
               const data = await getUserFriends()
               console.log('all went ok', data)
                this.friend_requests = data.friends.userFriendsRequests;
                this.friends = data.friends.friends;
            } catch (error) {
                this.error = "Something Went Wrong..."
                console.error('Error getting friends:', error);
            } finally {
              this.loading = false;
            }
        },
  async acceptRequest(request_id) {
    try {
        const data = await acceptFriendRequest(request_id);
        console.log('all went ok', data)
        this.friend_requests = this.friend_requests.filter(request => request.id !== request_id);

    } catch (error) {
        console.error('Error accepting friend request:', error);
    }
},

async declineRequest(request_id) {
    try {
        const data = await denyFriendRequest(request_id);
        console.log('all went ok', data);
        this.friend_requests = this.friend_requests.filter(request => request.id !== request_id);
    } catch (error) {
        console.error('Error declining friend request:', error);
    }
},

goToUserPage(user_id) {
    this.$router.push('/user/' + user_id)
},
toggleSelectedOption(option) {
    if(this.friends.length == 0 && this.friend_requests.length == 0) {
        return 
    }
    this.selectedOption = option
}
    },
    async created() {
        await this.getFriends();
    }
};
</script>

<style scoped>
    * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

header {
  padding: 20px;
  background-color: #f5f5f5;
}

header .logo {
  display: flex;
  gap: 15px;
  align-items: center;
}

.container {
  border: none;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  gap: 20px;
}

.container aside {
  background-color: #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.container main {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

main .responsive-main-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  border-bottom: 2px solid #ddd;
}

.rmh-only-friends, .rmh-pending-requests {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
}

aside .aside-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #ddd;
}

aside .aside-content {
  padding: 10px;
}

aside .aside-content div {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

aside .aside-content div input[type="radio"] {
  width: 20px;
  height: 20px;
}

main .friends-requests {
  padding: 15px;
}

main friends-requests .friend {
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.friends-requests .friend .friend-details {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
}

.friends-requests .friend-img img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.friend-username-and-buttons {
  width: 100%;
}

.friends-requests .friend .friend-buttons {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.f-button-accept {
  background: #28a745;
  border: none;
  color: white;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
}

.f-button-deny {
  background: #dc3545;
  border: none;
  color: white;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
}

.friends {
  padding: 15px;
}

.friends .friend {
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}

.friends .friend .friend-details {
  display: flex;
  align-items: center;
  gap: 15px;
}

.friends .friend .friend-img img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.friends .friend .friend-username {
  font-size: 20px;
  font-weight: 600;
}

.friends .friend .friend-chat i {
  font-size: 24px;
  color: #007bff;
  cursor: pointer;
}

@media (max-width: 600px) {
  .container aside {
    display: none;
  }
  
  .container {
    grid-template-columns: 1fr;
  }
}



</style>