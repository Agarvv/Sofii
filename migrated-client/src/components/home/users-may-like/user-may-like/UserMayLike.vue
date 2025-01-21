<template>
    <div class="user-card">
      <div class="user-details">
        <div class="user-picture">
          <img 
            style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" 
            :src="user.profilePicture || '/images/default.jpeg'"
            alt="User Picture"
          />
        </div>
        <div class="username-job">
          <h4>{{user.username.length > 7 ? user.username.slice(0,7) + '..' : user.username}}</h4>
          <p class="job-title">{{ user.job ||'No Job' }}</p>
        </div>
      </div>
      <div class="user-buttons">
        <div 
          class="view-profile">
          <i class="fa fa-user"></i>
        </div>
        <div 
          class="follow">
          <i class="fa fa-user-plus"></i>
        </div>
      </div>
    </div>
  </template>

<script lang="ts">
  import { UserMayLike } from '@/types/users/UserMayLike';
import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'UserMayLike',
    props: {
        user: {
            type: Object as () => UserMayLike,
            required: true 
        }
    }
  })
</script>

<style scoped src="./UserMayLike.css"></style>