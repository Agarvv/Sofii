<template>
    
</template>

<script lang="ts">
    import { defineComponent, onMounted } from 'vue'; 
    import { PostDetails } from '@/types/posts/PostDetails'
    import { useGet } from '@/composables/useGet'
    
    export default defineComponent({
        name: 'PostDetails',
        setup() {
            const getPost = async (): Promise<PostDetails> => {
                const { data } = await useGet<PostDetails>('/posts/1', {
                    withError: true 
                })
                
                return data.post; 
            }

            onMounted(async () => {
                const post = await getPost(); 
                console.log("Post", post)
            });
        }
    })
</script>