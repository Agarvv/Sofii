<template>
    <h1>Post details page</h1>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from 'vue'; 
    import { PostDetails } from '@/types/posts/PostDetails'
    import { useGet } from '@/composables/useGet'
    
    export default defineComponent({
        name: 'PostDetails',
        setup() {
            const getPost = async () => {
                const data  = await useGet<PostDetails>({
                    endpoint: '/posts/1',
                    withError: true 
                })
                
                return data 
            }

            onMounted(async () => {
                const post = await getPost(); 
                console.log("Post", post)
            });
        }
    })
</script>