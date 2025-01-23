<template>
  <header v-if="profile">    
    <!--   <div v-if="showBlock && !isSelfUser" class="block-user">
          <BlockUserCard :user="user"/>
        </div> -->
    
    <ProfileBanner :profileBanner="profile.banner" /> 
    
    <div class="user">
      <ProfilePicture :profilePicture="profile.profilePicture"/> 
  
      <div class="user-details">
        <div class="username">
          <h1>{{ profile.username }}</h1>
        </div>
        
        <div class="followers" style="margin-bottom: 20px">
          <p>{{ profile.followers.length }}Followers</p>
          <p style="color: gray">{{ profile.following.length }} Following</p>
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
            <i class="fa fa-comment"></i> Chat
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
  import { defineComponent, PropType } from 'vue';
  import { Profile } from '@/types/profile/Profile';
  import ProfilePicture from './profile-picture/ProfilePicture.vue'
  import ProfileBanner from './profile-banner/ProfileBanner.vue'

  export default defineComponent({
    name: 'ProfileHeader',
    props: {
      profile: {
        type: Object as () => Profile,
        required: true 
      }
    }
  })
</script>

<style scoped src="./ProfileHeader.css"></style>