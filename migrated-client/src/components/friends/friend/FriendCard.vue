<template>
     <div class="friend-details">
           
           <div class="friend-img"> 
             <img 
             style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%"
             :src="friend.profilePicture">
           </div>
           
           <div class="friend-username">
               <h3>{{friend.username}}</h3>
           </div>
         </div> 
</template>

<script lang="ts">
  import { defineComponent } from 'vue'; 
  import { Friend } from '@/types/users/Friend';

  export default defineComponent({
    name: 'FriendCard',
    props: {
      friend: {
        type: Object as () => Friend ,
        required: true 
      }
    }
  })
</script>

<style scoped src="./FriendCard.css"></style>
