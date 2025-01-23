<template>
  <header>    
    <!--   <div v-if="showBlock && !isSelfUser" class="block-user">
       <BlockUserCard :user="user"/>
      </div> -->
       
      
        <div class="profile-banner">
          <img src="user.banner || '/images/default_banner.webp'" alt="Profile Banner">
        </div>
      
        <div class="user">
          <div class="user-img">
           <img src="user.profilePicture || '/images/default.jpeg'" alt="Foto de Perfil">
          </div>
  
          <div class="user-details">
            <div class="username">
              <h1>User username</h1>
            </div>
            
              <div class="followers" style="margin-bottom: 20px">
                 <p>50 Followers</p>
                 <p style="color: gray">90 Following</p>
              </div>
  
  <div class="active-inactive">
      
      <div class="user-active">
          <div style="
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: green;
          "></div>
          <p style="color: green">Active</p>
      </div>
    
  </div>
  
            
   <div class="interact-buttons">
    <!-- Chat -->
    <button style="background: purple;">
      <font-awesome-icon :icon="['fas', 'comment']" /> Chat
    </button>
   
   <!-- friend buttons -->
  <button style="background: lightblue; color: black;"> 
    <i class="fa fa-user-friends"></i> Friends
  </button>

 <!-- <button 
     style="
      color: black;
     "
      >
   <font-awesome-icon :icon="['fas', 'user-plus']"/> Send Friend Request
  </button> -->
  
  
  <!-- Follow -->
  <button>
    <i class="fa fa-user-plus"></i>
  </button>
  </div>
         
           
          
          </div>
        </div>
      </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ProfileHeader'
  })
</script>

<style scoped src="./ProfileHeader.css"></style>