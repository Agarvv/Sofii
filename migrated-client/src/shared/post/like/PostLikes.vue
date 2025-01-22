<template>
    <div class="like" @click="like">
        <span v-if="likes.length !== undefined">{{ likes.length }}</span>  
        <i class="fa fa-thumbs-up"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import { apiService } from '@/api/ApiService'; 
import { useSocket } from '@/composables/useWebSocket';  
import { Like } from '@/types/posts/Like';

export default defineComponent({
    name: 'PostLikes',
    props: {
        postId: {
            type: Number,
            required: true,
        },
        postLikes: {
            type: Array as () => Like[],
            required: true,
        },
    },
    setup(props) {
        const likes = ref<Like[]>([]); 
        
        onMounted(() => {
            likes.value = [...props.postLikes];  

            const { socket } = useSocket();

            socket.instance.on('likePost', (liked: Like) => {
                if (liked.post_id === props.postId && !likes.value.some(like => like.user_id === liked.user_id)) {
                    likes.value.push(liked); 
                    console.log('Post liked via WebSocket:', liked);
                }
            });

            socket.instance.on('unlikePost', (liked: Like) => {
                if (liked.post_id === props.postId) {
                    const index = likes.value.findIndex(like => like.user_id === liked.user_id);
                    if (index !== -1) {
                        likes.value.splice(index, 1);  
                        console.log('Post unliked via WebSocket:', liked);
                    }
                }
            });
        });

        onBeforeUnmount(() => {
            const { socket } = useSocket();
            socket.instance.off('likePost');
            socket.instance.off('unlikePost');
        });

        return { likes, like: async () => {} }; 
    },
});
</script>

<style scoped src="./PostLikes.css"></style>