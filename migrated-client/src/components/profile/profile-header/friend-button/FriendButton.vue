<template>
    <button @click="sendFriendRequest" style="background: lightblue; color: black;"> 
        <i class="fa fa-user-friends"></i> 
        Friend Request
    </button>
</template>

<script lang="ts">
    import { defineComponent, ref, watchEffect } from 'vue'; 
    import { usePost } from '@/composables/usePost';
    import { apiService } from '@/api/ApiService';
    
    export default defineComponent({
        name: 'FriendButton',
        props: {
            userId: {
                type: Number,
                required: true 
            }
        },
        setup(props) {
            
            interface SendFriendRequestValues {
                userId: number
            }

            const { mutate } = usePost<SendFriendRequestValues>({
              serviceFunc: (data: SendFriendRequestValues) => apiService.post('/users/friendRequest', data),
              successFunc: () => window.location.reload(), 
              withError: true,
              withLoading: true 
            })

            const sendFriendRequest = async () => {
            
                    await mutate({ userId: props.userId });
                
            }

            return { sendFriendRequest }
        }
    })
</script>