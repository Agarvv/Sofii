<template>
    <div>
  
      <header>    
    <!--   <div v-if="showBlock && !isSelfUser" class="block-user">
       <BlockUserCard :user="user"/>
      </div> -->
       
      
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
            
            
   <div v-else class="interact-buttons" v-if="!isBlocked">
    <!-- Chat -->
    <button @click="sendChat(user.id)" style="background: purple;">
      <font-awesome-icon :icon="['fas', 'comment']" /> Chat
    </button>
   
   <!-- friend buttons -->
  <button v-if="isFriend && !isFriendRequest && !sentFriendRequest" style="background: lightblue; color: black;"> 
    <font-awesome-icon :icon="['fas', 'user-friends']" /> Friends
  </button>
  
  <button style="background: gray; color: black;" v-if="receivedFriendRequest || sentFriendRequest">
    <p>Request pending...</p>
  </button>
  
  <button @click="sendFriendRequest(user.id)"  v-if="!receivedFriendRequest && !sentFriendRequest && !isFriend"
     style="
      color: black;
     "
      >
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
      
      <div class="responsive-user-details">
          
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
                <PostCard :post="post"
                  @delete="handlePostRemoval"
                />
            </div>

          </div> 
        </main>
      </div>
    </div>
  </template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ProfileView'
  })
</script>