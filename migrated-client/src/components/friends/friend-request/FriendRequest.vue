<template>
<div class="friend-details">
          
          <div @click="goToPage('/user/' + request.sender.id)" class="friend-img">
            <img style="width: 80px; border-radius: 50%" 
            :src="request.sender.profilePicture || '/images/default.jpeg' ">
          </div>
          
          <div class="friend-username-and-buttons">
            <h2>{{request.sender.username}}</h2>
            
            <div  class="friend-buttons">
              <button @click="acceptRequest(request.id)" class="f-button-accept">
                Accept
              </button>
              <button @click="declineRequest(request.id)" class="f-button-deny">
                Deny
              </button>
            </div>
            
          </div>
          
        </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'; 

  export default defineComponent({
    name: 'FriendRequest'
  })
</script>

