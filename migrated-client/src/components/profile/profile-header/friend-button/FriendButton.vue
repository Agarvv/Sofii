<template>
    <button style="background: lightblue; color: black;"> 
        <i class="fa fa-user-friends"></i> <p>{{  isFriend ? 'Friends' : 'Send Friend Request' }}</p>
    </button>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'; 
    import { usePost } from '@/composables/usePost';
    import { apiService } from '@/api/ApiService';
    
    export default defineComponent({
        name: 'FriendButton',
        props: {
            isFriend: {
                type: Boolean,
                required: true 
            },
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
              withError: true,
              withLoading: true 
            })

            const sendFriendRequest = async () => {
               await mutate({ userId: props.userId })
            }
        }
    })
</script>