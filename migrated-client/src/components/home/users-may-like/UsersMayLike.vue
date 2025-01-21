<template>
    <div class="right-aside">
      <div class="users-might-like">
        <div class="users-header">
          <h3>You Might Like</h3>
        </div>
        <div class="us-users">
          <div v-for="user in recomendedUsers" :key="user.id" class="us-user">
            <HomePageUserMustLike :user="user" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { UserMayLike } from '@/types/users/UserMayLike';
  
  export default defineComponent({
    name: 'UsersMayLike',
    props: {
      recomendedUsers: {
        type: Array as () => UserMayLike[],
        required: true,
      },
    },
  });
  </script>
  
  <style scoped src="./UsersMayLike.css"></style>
  