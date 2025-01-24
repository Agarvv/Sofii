<template>
  <button @click="startChat" style="background: purple;">
    <i class="fa fa-comment"></i> Chat
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'; 
import { usePost } from '@/composables/usePost';
import { apiService } from '@/api/ApiService';
import { useRouter } from 'vue-router'; 

export default defineComponent({
  name: 'ChatButton',
  props: {
    receiverId: {
      type: Number,
      required: true 
    }
  }, 
  setup(props) {
    const router = useRouter(); 

    interface ChatCreationValues {
      receiverId: number
    }

    const { mutate } = usePost<ChatCreationValues>({
      serviceFunc: (data: ChatCreationValues) => apiService.post('/chats', data),
      successFunc: (response) => {
        if (response.chatId) {
          router.push(`/chat/${response.chatId}`);
        }
      },
      withError: true,
      withLoading: true
    })

    const startChat = async () => {
      await mutate({ receiverId: props.receiverId });
    }

    return { startChat }
  }
})
</script>
