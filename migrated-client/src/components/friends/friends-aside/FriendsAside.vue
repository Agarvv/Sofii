<template>
 <aside>

<div class="aside-content">
  
  <div @click="toggleSelectedOption('friends')" class="only-friends">
 
   <font-awesome-icon icon="userFriends"/> 
    <h4>Only My Friends</h4>

  </div>
   
  <div @click="toggleSelectedOption('friend_requests')" class="pending-requests">
    <font-awesome-icon icon="userPlus"/>
    <h4>Pending requests</h4>
  </div>
  
  
</div>


</aside>
</template>

<script>
 import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FriendsAside'
})
</script>