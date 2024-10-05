<template>
  <div>
    <header>
    <div @click="toggleBlock" class="openBlockCard">
        <font-awesome-icon icon="ellipsis"/> 
    </div>
        
    <!-- Div for block the user -->
    <div v-show="showBlock" class="block-user">
     <BlockUserCard :user="user"/>
    </div>
     
    
      <div class="profile-banner">
        <img :src="user.banner || '/images/default_banner.webp'" alt="Profile Banner">
      </div>
    
      <div class="user">
        <div class="user-img">
         <img :src="user.profilePicture || '/images/default.jpeg'" alt="Foto de Perfil">
        </div>

        <div class="user-details">
          <div class="username">
            <h1>{{ user.username ? user.username : 'Someone' }}</h1>
          </div>
          
            <div class="followers" style="margin-bottom: 20px">
               <p style="font-weight: 700;">{{user.followers?.length || 0}} Followers</p>
               <p style="color: gray">{{user.following?.length || 0}} Following</p>
            </div>

<div v-if="!isSelfUser" class="active-inactive">
    
    <div v-if="user.active" class="user-active">
        <div style="
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: green;
        "></div>
        <p style="color: green">Active</p>
    </div>
    
    <div v-if="!user.active" class="user-inactive">
        <div style="
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: gray;
        "></div>
        <p style="color: gray">Inactive</p>
    </div>
    
</div>

          <div v-if="isSelfUser" class="isSelfUserDiv">

           <div class="buttons">
             <div>
             <button @click="goToPage('/userDetails')">Edit Your Account</button>
             </div>
           </div>

          </div>
          
          
          <div v-else class="interact-buttons">
  <!-- Chat -->
  <button @click="sendChat(user.id)" style="background: purple;">
    <font-awesome-icon :icon="['fas', 'comment']" /> Chat
  </button>
 
 <!-- friend buttons -->
<button 
  v-if="isFriend"
  style="background: lightblue; color: blue;"
>
  <font-awesome-icon :icon="['fas', 'user-friends']" /> Friends
</button>

<button style="background: gray; color: black;" v-if="receivedFriendRequest || sentFriendRequest">
  <p>Request pending...</p>
</button>

<button @click="sendFriendRequest(user.id)"  v-if="!receivedFriendRequest && !sentFriendRequest" style="background: transparent;">
 <font-awesome-icon :icon="['fas', 'user-plus']"/> Send Friend Request
</button>


<!-- Follow -->
<button 
  @click="followUser(user.id)" 
  :style="isFollowing ? { backgroundColor: '#4CAF50', color: 'white' } : { backgroundColor: 'transparent', color: 'black' }"
>
  <font-awesome-icon :icon="isFollowing ? 'user-check' : 'user-plus'"/>
</button>
</div>
       
         
        
        </div>
      </div>
    </header>
    
    <div style="display: none" class="responsive-user-details">
        
        <div class="r-bio">
            <p>{{user.bio ? user.bio : 'BIO Not Provided'}}</p>
        </div>
        
        <div class="r-info">
            <div class="ubication">
              <font-awesome-icon icon="fas fa-map-marker-alt" style="color: red" />
              <span>{{ user.ubication ? user.ubication : 'Ubication Not Provided' }}</span>
            </div>
            
            <div class="native">
              <font-awesome-icon icon="fas fa-globe" style="color: black" />
              <span>{{ user.native_city ? user.native_city : 'Native City Not Provided' }}</span>
            </div>
            
            <div class="gender">
              <font-awesome-icon icon="fas fa-venus-mars" style="color: hotpink" />
              <span>{{ user.gender ? user.gender : 'Gender Not Provided' }}</span>
            </div>
            
            <div class="work">
              <font-awesome-icon icon="fas fa-briefcase" style="color: gray" />
              <span>{{ user.job ? user.job : 'Job Not Provided' }}</span>
            </div>
            
            <div class="love">
              <font-awesome-icon icon="fa fa-heart" style="color: red" />
              <span>{{ user.civil_status ? user.civil_status : 'Civil Status Not Provided' }}</span>
            </div>
            
        </div>
        
    </div>

    <div class="container">
      <aside>
        <div class="user-info">
          <div class="info">
            <div class="info-header">
              <h4>Info</h4>
            </div>
           
           <div class="user-i">
               
               
             <div  class="description">
               <p>{{ user.bio ? user.bio  : 'Bio Not Provided' }}</p>
             </div>
             
            <div class="ubication">
              <font-awesome-icon icon="fas fa-map-marker-alt" style="color: red" />
              <span>{{ user.ubication ? user.ubication : 'Ubication Not Provided' }}</span>
            </div>
            
            <div class="native">
              <font-awesome-icon icon="fas fa-globe" style="color: black" />
              <span>{{ user.native_city ? user.native_city : 'Native City Not Provided' }}</span>
            </div>
            
            <div class="gender">
              <font-awesome-icon icon="fas fa-venus-mars" style="color: hotpink" />
              <span>{{ user.gender ? user.gender : 'Gender Not Provided' }}</span>
            </div>
            
            <div class="work">
              <font-awesome-icon icon="fas fa-briefcase" style="color: gray" />
              <span>{{ user.job ? user.job : 'Job Not Provided' }}</span>
            </div>
            
            <div class="love">
              <font-awesome-icon icon="fa fa-heart" style="color: red" />
              <span>{{ user.civil_status ? user.civil_status: 'Civil Status Not Provided' }}</span>
            </div>
            
            
           </div>
          </div>
        </div>
      </aside>

      <main>
          <h4 style="width: 100%;
           display: flex;
           align-items: center;
           justify-content: center;
           font-size: 20px;
           padding: 10px;
           color: gray" v-if="userPosts.length == 0">This User Does Not Have Posts...</h4>
             <div v-if="user.posts.length > 0" class="posts">
                
          <div  v-for="post in user.posts" :key="post.id" class="post" >
              <PostCard :post="post"/>
          </div>
        </div> 
      </main>
    </div>
  </div>
</template>

<script>
import BlockUserCard from './BlockUserCard' 
import { mapState, mapActions } from 'vuex';
import {
  getUser,
  sendFriendRequest,
  acceptFriendRequest,
  followUser
} from '../services/usersService'
import {
  startChat
} from '../services/chatService'
import  PostCard  from './PostCard'




export default {
    components: {
        PostCard,
        BlockUserCard
    },
    computed: {
      ...mapState({
        currentUser: state => state.user
      })
    },
  data() {
    return {
      user: {
      },
      userPosts: [],
      isSelfUser: null,
      error: "",
      isFollowing: false,
      sentFriendRequest: false,
      receivedFriendRequest: false,
      isFriend: false,
      showBlock: false,
     
      // sentFriendRequest means that a user sent a friend request to the user that is showing on
      //receivedFriendRequest means that a user received a friend request from the user that s showing up and he can Accept or Deny the request
      //isFriend means that a user is friend with the user that is showing on
      
      // so easy, right? :p
    };
  },
  methods: {
    ...mapActions(['fetchUser']),
    toggleBlock() {
        this.showBlock = !this.showBlock
    },
    async getUser() {
      try {
       await this.fetchUser()
       const data = await getUser(this.$route.params.id, this.currentUser)
       console.log('user data', data)
       this.user = data.user
       this.userPosts = data.user.posts

      this.isFollowing = this.user.isFollowing || false;
      this.sentFriendRequest = this.user.isPendingFriendRequestSent 
      this.receivedFriendRequest = this.user.isPendingRequestReceived

      this.isFriend = this.user.isFriend || false;

      if(data.user.id == this.currentUser.user_id) {
        this.isSelfUser = true  
      } 


      console.log('user from service: ', this.user)
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    
    async sendFriendRequest(friend_target) {
      try {
        const data = await sendFriendRequest(friend_target)
        this.sentFriendRequest = true
      } catch(e) { 
        console.log(e)
        this.error = "Internal Server Error..."
      }
    },

  
    async sendChat(user_id) {
     try {
          const data = await startChat(user_id)
          console.log('Worked !', data)
          this.$router.push('/chat/' + user_id)
     } catch(e) {
      this.error = "Oops, Something Went Down!"
     }
    },
    async followUser(user_id) {
        try {
            const data = await followUser(user_id)
            console.log('data from following', data)
            if(data.followed && !data.unfollowed) {
                this.isFollowing = true
            } else if(data.unfollowed && !data.followed) {
                this.isFollowing = false
            }
        } catch(e) {
            this.error = "Something Went Wrong..."
        }
    },
    goToPage(route) {
      this.$router.push(route);
    },
    async removeFriend() {
        return true
    }
  },
  async mounted() {
    await this.getUser();
  },
  async created() {
      this.$socket.on('newFollower', newFollower => {
          if(newFollower.following_id == this.user.id) {
              this.user.followers.push(newFollower)
          }
      })
      
      this.$socket.on('unfollowedUser', newFollower => {
          if(newFollower.following_id == this.user.id) {
              this.user.followers = this.user.followers.filter(follower => follower.id !== newFollower.id)
          }
      })
  }
};

</script>


<style scoped>
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0 0 0 0;
    
}

header {
    position: relative;
   border-bottom: 1px solid black;
}

header .profile-banner {
    width: 100%;
    height: 230px;
    overflow: hidden;
}

header .profile-banner img {
    width: 100%;
    height: 100%;
}

.user-img {
    position: absolute;
    top: -50px;
    left: 20px;
}

.user-img img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 5px solid #fff;
}


.container {
    display: flex;
}

.posts {
    height: 100%;
    width: 100%;
}

aside, main {
  
    height: 100vh;
}

aside {
    flex: 2; /* Ajusta según lo necesites */
    padding: 20px;
}

aside .user-info {
    border: 1px solid black;
    height: 100%;
}

main {
    flex: 4; /* Ajusta según lo necesites */
    padding: 20px;
    border-radius: 20px;
}

main .posts {
    height: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 20px;
}

.user {
    position: relative;
    margin-top: -50px; /* Ajustar según necesidad para superponer la imagen */
    padding: 10px 20px;
    background: #fff;

}


.user-details {
    margin-top: 40px; /* Ajustar según necesidad para el margen de la imagen */
    padding: 15px;

}

.followers {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}



.interact-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr .1fr;
  grid-gap: 10px;
  height: 30px;
  margin-top: 5px;
  
}

.interact-buttons button {
  border: .3px solid gray;
  color: white;
  border-radius: 10px;
  height: 40px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}

.post-header img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}

aside .user-info {
  padding: 15px;
  border-radius: 10px;
}

aside .info {
  border: 1px solid black;
  padding: 15px;
  border-radius: 5px;
}

aside .description {
  margin-bottom: 20px;
}

.isSelfUserDiv {
}

.isSelfUserDiv .buttons {
  display: grid;
  grid-template-columns:  1fr;

}

.isSelfUserDiv .buttons div {
  height: 40px;
}

.isSelfUserDiv .buttons div button {
 width: 100%;
 height: 100%;
 border: none;
 background: blue;
 color: white;
 font-weight: 700;
 border-radius: 20px;
}

.responsive-user-details {
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
}


.r-info div {
    display: flex;
    gap: 5px;
}


.active-inactive {
   
    width: 100%;
    padding-bottom: 5px;
}

.active-inactive div {
    display: flex;
    align-items: center;
    gap: 5px;
}

.openBlockCard {
    position: absolute;
    top: 25px;
    right: 25px;
    font-size: 25px;
    color: white;
}

.block-user {
  position: absolute;
  top: 25px;
  right: 70px;
}


@media (max-width: 687px) {
    aside {
        display: none;
    }
    
    .responsive-user-details {
        display: flex;
    }
  
    .container {
        flex-direction: column;
    }
}

</style>