<template>
  <div v-if="data">
    <div class="container">
      <main>

          <ChatHeader :userToDisplayInfo="data.chat.userToDisplayInfo" /> 
          
          <ChatBox :chat="data.chat.chat" />

          <ChatFooter :chat="data.chat.chat" />

      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ChatHeader from '@/components/chat/chat-header/ChatHeader.vue';
import ChatBox from '@/components/chat/chatbox/ChatBox.vue';
import ChatFooter from '@/components/chat/chat-footer/ChatFooter.vue';
import { useGet } from '@/composables/useGet';
import { ChatDetails } from '@/types/chats/ChatDetails';
import { useSocket } from '@/composables/useWebSocket';
import { useRoute } from 'vue-router'; 

export default defineComponent({
  name: 'ChatView',
  components: {
    ChatHeader,
    ChatBox,
    ChatFooter,
  },
  setup() {
    const { socket } = useSocket();
    const data = ref<ChatDetails | null>(null);
    const route = useRoute(); 

    const getChat = async () => {
      const chatId = route.params.id; 
      const response = await useGet<ChatDetails>({
        endpoint: `/chats/${chatId}`,
        withError: true,
      });

      data.value = response;
    };

    onMounted(() => {
      getChat();

      socket.instance.on('chatMessage', (message: any) => {
        console.log('New message!', message);
        if (data.value) {
          console.log(data.value);
          (data as any).value.chat.chat.messages.push(message); 
        }
      });
      
    });

    return {
      data,
    };
  },
});
</script>

<style scoped src="./ChatView.css"></style>
