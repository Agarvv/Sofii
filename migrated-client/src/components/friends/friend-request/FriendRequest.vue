<template>
<div class="friend-details">
          <div class="friend-img">
            <img style="width: 80px; border-radius: 50%" 
            :src="request.sender.profilePicture">
          </div>
          
          <div class="friend-username-and-buttons">
            <h2>{{request.sender.username}}</h2>
            
            <div  class="friend-buttons">
              <AcceptRequest 
               :requestId="request.id"
              />
              <DenyRequest
                :requestId="request.id"
              />
            </div>
            
          </div>
          
        </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'; 
  import { FriendRequest } from '@/types/users/FriendRequest';
  import AcceptRequest from './accept/AcceptRequest.vue';
  import DenyRequest from './deny/DenyRequest.vue';

  export default defineComponent({
    name: 'FriendRequest',
    components: {
      AcceptRequest,
      DenyRequest
    }, 
    props: {
      request: {
        type: Object as () => FriendRequest,
        required: true 
      }
    }
  })
</script>

