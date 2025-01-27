<template>
       <div 
                class="message user"
            >
                <div class="msg_content">
                    <div 
                        v-if="message.message_content.length > 0" 
                        class="message-user-img"
                    >
                        <img 
                            src="getMessageUserProfilePicture(message)" 
                            class="message-img"
                        />
                    </div>
                    <p v-if="message.message_content.length > 0">
                        {{ message.message_content }}
                    </p>
                    <i class="fa fa-check"></i>
                </div>
            </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue"
    import { Message } from '@/types/chats/Message'
    
    export default defineComponent({
        name: 'ChatMessage',
        props: {
            message: {
                type: Object as () => Message,
                required: true 
            }
        }
    })
</script>

<style src="./ChatMessage.css"></style>