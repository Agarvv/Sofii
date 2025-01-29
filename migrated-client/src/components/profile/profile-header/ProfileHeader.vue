<template>
  <header v-if="profile">    
    
    <ProfileBanner :profileBanner="profile.banner" :isSelf="isSelf" /> 
    
    <div class="user">
      <ProfilePicture :profilePicture="profile.profilePicture" :isSelf="isSelf"/> 
  
      <div class="user-details">
        <div class="username">
          <h1>{{ profile.username }}</h1>
        </div>
        
        <div class="followers" style="margin-bottom: 20px">
          <p>{{ profile.followers.length }}Followers</p>
          <p style="color: gray">{{ profile.following.length }} Following</p>
        </div>

        <div v-if="!isSelf" class="active-inactive">
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
  
        <div v-if="!isSelf" class="interact-buttons">
          <!-- Chat -->
          <ChatButton :receiverId="profile.id"/>
  
          <FriendButton 
            :userId="profile.id"
            
          />
         
  
          <!-- Follow -->
          <FollowButton 
            :followers="profile.followers"
            :userId="profile.id"
          />
          
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';
  import { Profile } from '@/types/profile/Profile';
  import ProfilePicture from './profile-picture/ProfilePicture.vue'
  import ProfileBanner from './profile-banner/ProfileBanner.vue'
  import ChatButton from './chat-button/ChatButton.vue';
  import FollowButton from './follow-button/FollowButton.vue';
  import FriendButton from './friend-button/FriendButton.vue';

  export default defineComponent({
    name: 'ProfileHeader',
    components: {
        ProfilePicture,
        ProfileBanner,
        ChatButton,
        FollowButton,
        FriendButton
    },
    props: {
      profile: {
        type: Object as () => Profile,
        required: true 
      },
      isSelf: {
        type: Boolean,
        required: true 
      }
    }
  })
</script>

<style scoped src="./ProfileHeader.css"></style>