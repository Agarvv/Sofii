<template>
  <div>
    <main>
      <div class="main-header">
        <div class="mh-search">
          <i class="fa fa-search"></i>
          <input 
            type="search" 
            placeholder="Search Chats..." 
          />
        </div>
      </div>

      <div class="main-chats">
        <ChatComponent 
          v-for="chat in chats.chats" 
          :key="chat.chat_id" 
          :chat="chat" 
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'; 
import { Chat } from '@/types/chats/Chat'; 
import { useGet } from '@/composables/useGet'; 
import ChatComponent from '@/components/chats/chat/ChatComponent.vue';

export default defineComponent({
  name: 'ChatsView',
  components: {
    ChatComponent,
  },
  setup() {
    const chats = ref<Chat[]>([]); 

    const getChats = async () => {
      try {
        const response = await useGet<Chat[]>({
          endpoint: '/chats',
          withError: true,
        });
        chats.value = response || []; 
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    onMounted(() => {
      getChats();
    });

    return { chats };
  },
});
</script>

<style scoped src="./ChatsView.css"></style>