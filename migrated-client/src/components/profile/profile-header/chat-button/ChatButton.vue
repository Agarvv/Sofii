<template>
     <button style="background: purple;">
           <i class="fa fa-comment"></i> Chat
     </button>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'; 
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

            const startChat = async () => {
                const { mutate, data } = usePost<ChatCreationValues>({
                  serviceFunc: (data: ChatCreationValues) => apiService.post('/chats', data),
                  successFunc: () => console.log("Chat created!"),
                  withError: true,
                  withLoading: true 
                })
                
                await mutate({ receiverId: props.receiverId })
                console.log('data from chat', data)
            }
        }
    })
</script>