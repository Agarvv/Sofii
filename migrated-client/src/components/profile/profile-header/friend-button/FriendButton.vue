<template>
    <button @click="sendFriendRequest" style="background: lightblue; color: black;"> 
        <i class="fa fa-user-friends"></i> 
        <p>{{ isFriend ? 'Friends' : 'Send Friend Request' }}</p>
    </button>
</template>

<script lang="ts">
    import { defineComponent, ref, watchEffect } from 'vue'; 
    import { usePost } from '@/composables/usePost';
    import { apiService } from '@/api/ApiService';
    
    export default defineComponent({
        name: 'FriendButton',
        props: {
            friends: {
                type: Array as () => any[], 
                required: true 
            },
            userId: {
                type: Number,
                required: true 
            }
        },
        setup(props) {
            const userId = Number(localStorage.getItem("userId"))
            
            const isFriend = ref(false);

         
            watchEffect(() => {
                isFriend.value = props.friends.some(friend => friend.id === userId);
            });

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

            return { sendFriendRequest, isFriend }
        }
    })
</script>