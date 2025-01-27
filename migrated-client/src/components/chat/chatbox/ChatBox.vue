<template>
    <div v-if="chat" class="main-chatbox">
        <div class="messages">
             <ChatMessage 
               v-for="message in chat.messages"
               :key="message.id"
               :message="message"
             /> 
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { ChatDetails } from "@/types/chats/ChatDetails"
    import ChatMessage from './message/ChatMessage.vue'
    
    export default defineComponent({
        name: 'ChatBox',
        components: {
            ChatMessage
        },
        props: {
            chat: {
                type: Object as () => ChatDetails,
                required: true 
            }
        }
    })
</script>