<template>
  <div class="main-footer">

    <div class="footer-message-input">
      <input
        @input="broadcastTyping"
        v-model="message"
        id="inp"
        type="text"
        placeholder="Send a message..."
      />
    </div>

    <div @click="sendMessage" class="footer-send-message-button">
        <i class="fa fa-paper-plane"></i>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { ChatDetails } from '@/types/chats/ChatDetails';
import { useSocket } from '@/composables/useWebSocket';

export default defineComponent({
  name: 'ChatFooter',
  props: {
    chat: {
      type: Object as () => ChatDetails,
      required: true,
    },
  },
  setup(props) {
    const message = ref<string>('');
    const { socket } = useSocket();

    const broadcastTyping = () => {
      if (message.value.trim() !== '') {
        socket.instance.emit('typing', props.chat.chat_id);
      } else {
        console.log('emitting stopTyping');
        socket.instance.emit('stopTyping', props.chat.chat_id);
      }
    };

    const sendMessage = () => {
      if (message.value.trim() !== '') {
        const newMessage = {
            chat_id: props.chat.chat_id,
            message: message.value 
        }
        console.log('Sending message:', newMessage);
        socket.instance.emit('chatMessage', newMessage);
        message.value = ''; 
      }
    };

    return {
      message,
      broadcastTyping,
      sendMessage,
    };
  },
});
</script>

<style src="./ChatFooter.css>