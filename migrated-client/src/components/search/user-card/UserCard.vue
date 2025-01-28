<template>
    
<div v-if="user" class="user-card">
  <div class="user-card-user-img">
    <img style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"
     :src="user.profilePicture">
  </div>
  <div class="user-card-details">
    <h3>{{  user.profilePicture  }}</h3>
    
    <p style="color: gray">{{  user.bio }}</p>
    
    <div class="user-buttons">
      <button class="view-profile-btn">View Profile</button>
    </div>
    
  </div>
</div>

</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { UserResult } from '@/types/search/UserResult';
    
    export default defineComponent({
        name: 'UserCard',
        props: {
            user: {
              type: Object as () => UserResult,
              required: true 
            }
        }
    })
</script>

<style src="./UserCard.css"></style>