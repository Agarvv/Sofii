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
          <ChatButton :receiverId="profile.id"/>
  
          <FriendButton 
            :isFriend="isFriend"
            :userId="profile.id"
            
          />
  
          <!-- Follow -->
          <FollowButton 
            :isFollowed="isFollowed"
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
      }
    },
    setup(props) {
        const userId = localStorage.getItem("userId"); 
        
        const isFriend = ref<boolean>(props.profile.profile.friends.some((p) => p.id == userId));
        
        const isFollowed = ref<boolean>(props.profile.profile.followers.some(f => f.id == userId)); 
        
        return { isFriend, isFollowed }
    }
  })
</script>

<style scoped src="./ProfileHeader.css"></style>