<template>
     <button @click="follow">
            <i :class="isFollowed ? 'fa fa-user-plus' : 'fa fa-user-minus'"></i>
     </button>
</template>

<script lang="ts">
    import { defineComponent, ref, watchEffect } from 'vue'; 
    import { usePost } from '@/composables/usePost';
    import { apiService } from '@/api/ApiService';
    
    export default defineComponent({
        name: 'FollowButton',
        props: {
            followers: {
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
            const isFollowed = ref(false);

            watchEffect(() => {
                isFollowed.value = props.followers.some(follower => follower.id === userId);
            });

            interface FollowValues {
               userId: number
            }

            const { mutate } = usePost<FollowValues>({
                    serviceFunc: (data: FollowValues) => apiService.post('/users/follow', data),
                    successFunc: (response) => {
                      console.log("response from follow", response)
                      window.location.reload(); 
                    }, 
                    withError: true,
                    withLoading: false 
            })

            const follow = async () => {
                
                    await mutate({ userId: props.userId });
                
            }

            return { follow, isFollowed }
        }
    })
</script>

<style scoped src="./FollowButton.css"></style>