<template>
     <div class="friend-details">
           
           <div class="friend-img"> 
             
             <img 
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
