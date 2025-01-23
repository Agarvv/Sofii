<template>
    <PostDetailsComponent v-if="data" :post="data.post" />
</template>

<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue'; 
    import { useRoute } from 'vue-router';  
    import { PostDetails } from '@/types/posts/PostDetails'
    import { useGet } from '@/composables/useGet'
    import PostDetailsComponent from '@/components/post-details/PostDetailsComponent.vue'

    export default defineComponent({
        name: 'PostDetails',
        components: { PostDetailsComponent },
        setup() {
            const data = ref<PostDetails | null>(null);
            const route = useRoute();  

            const getPost = async () => {
                const postData = await useGet<PostDetails>({
                    endpoint: `/posts/${route.params.id}`,  
                    withError: true
                });
                data.value = postData;
            };

            onMounted(() => {
                getPost();
            });

            return { data };
        }
    })
</script>