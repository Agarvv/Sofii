<template>
     <button @click="follow">
            <i :class="isFollowed ? 'fa fa-user-plus' : 'fa fa-user-minus'"></i>
     </button>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'; 
    import { usePost } from '@/composables/usePost';
    import { apiService } from '@/api/ApiService';
    
    export default defineComponent({
        name: 'FollowButton',
        props: {
            isFollowed: {
                type: Boolean,
                required: true 
            },
            userId: {
                type: Number,
                required: true 
            }
        },
        setup(props) {
            interface FollowValues {
               userId: number
            }

            const { mutate } = usePost<FollowValues>({
                    serviceFunc: (data: FollowValues) => apiService.post('/follow', data),
                    successFunc: (response) => {
                      console.log("response from follow", response)

                    }, 
                    withError: true,
                    withLoading: false 
            })

            const follow =  async() => {
                 await mutate({ userId: props.userId })
            }

            return { follow }
        }
    })
</script>