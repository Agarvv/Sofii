<template>
    <div class="right-aside">
      <div class="users-might-like">
        <div class="users-header">
          <h3>You Might Like</h3>
        </div>
        <div class="us-users">
          <div v-for="user in recomendedUsers" :key="user.id" class="us-user">
            <UserMayLike :user="user" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { UserMayLike as UserMayLikeType } from '@/types/users/UserMayLike';
  import UserMayLike from './user-may-like/UserMayLike.vue';

  export default defineComponent({
    name: 'UsersMayLike',
    components: {
      UserMayLike
    },
    props: {
      recomendedUsers: {
        type: Array as () => UserMayLikeType[],
        required: true,
      },
    },
  });
  </script>
  
  <style scoped src="./UsersMayLike.css"></style>
  