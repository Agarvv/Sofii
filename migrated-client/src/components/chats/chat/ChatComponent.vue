<template>
<div v-if="chat" class="chat">
          <div class="main-chat-user">
            <div class="user-img">
              <img :src="chat.userToDisplayInfo.profilePicture">
            </div>
            <div class="user-details">
              <h4>{{chat.userToDisplayInfo.username || 'Someone'}}</h4>
              <p>{{chat.last_message}}</p>
            </div>
          </div>
</div> 
</template>

<script lang="ts">
    import { defineComponent } from 'vue'; 
    import { Chat } from '@/types/chats/Chat'
    
    export default defineComponent({
        name: 'ChatComponent',
        props: {
            chat: {
                type: Object as () =>  Chat
            }
        }
    })
</script>  

<style scoped src="./ChatComponent"></style>