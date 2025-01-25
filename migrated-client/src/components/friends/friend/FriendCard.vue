<template>
     <div class="friend-details">
           
           <div class="friend-img"> 
             
             <img 
             :src="friend.friendToDisplayInfo.profilePicture || '/images/default.jpeg' ">
             
             
           </div>
           
           <div class="friend-username">
               <h3>{{friend.friendToDisplayInfo.username}}</h3>
           </div>
           
           
         </div> 
</template>

<script lang="ts">
  import { defineComponent } from 'vue'; 

  export default defineComponent({
    name: 'FriendCard'
  })
</script>
