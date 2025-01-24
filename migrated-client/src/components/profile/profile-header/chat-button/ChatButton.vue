<template>
    <button @click="startChat" style="background: purple;">
      <i class="fa fa-comment"></i> Chat
    </button>
  </template>
  
  <script lang="ts">
import { defineComponent, ref } from 'vue'; 
import { usePost } from '@/composables/usePost';
import { apiService } from '@/api/ApiService';

export default defineComponent({
  name: 'ChatButton',
  props: {
    receiverId: {
      type: Number,
      required: true 
    }
  }, 
  setup(props) {
    interface ChatCreationValues {
      receiverId: number
    }

    const { mutate, data } = usePost<ChatCreationValues>({
      serviceFunc: (data: ChatCreationValues) => apiService.post('/chats', data),
      successFunc: () => console.log("Chat created!"),
      withError: true,
      withLoading: true
    })

    const startChat = async () => {
      await mutate({ receiverId: props.receiverId }) 
      console.log('data from chat', data.value)  
    }

    return { startChat, data }  
  }
})
</script>