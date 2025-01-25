<template>
  <div class="responsive-main-header">
      
      <div @click="toggleSelectedOption('friends')" class="rmh-only-friends">
        <font-awesome-icon icon="userFriends"/> 
      
        <h4>Only My Friends</h4>
        
        
      </div>
      <div @click="toggleSelectedOption('friend_requests')"class="rmh-pending-requests">

       <font-awesome-icon icon="userPlus"/> 

        <h4>Pending requests</h4>
        
       
        
        
      </div>
    
    </div>
</template>

<script lang="ts">
 import { defineComponent } from 'vue'

 export default defineComponent({
  name: 'FriendsSelector'
 })
</script>