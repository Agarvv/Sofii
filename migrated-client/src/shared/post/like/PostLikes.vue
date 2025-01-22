<template>
    <div class="like" @click="like">
        <span>{{ likes?.length || 0 }}</span>  
        <i class="fa fa-thumbs-up"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue';
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
        const likes = props.postLikes && Array.isArray(props.postLikes) ? [...props.postLikes] : [];

        const like = async () => {
            try {
                const data = await apiService.post('/posts/like', { postId: props.postId });
                console.log('Data from like:', data);
            } catch (error) {
                console.error('Error al enviar el like:', error);
            }
        };

        onMounted(() => {
            const { socket } = useSocket();

            socket.instance.on('likePost', (liked: Like) => {
                if (liked.post_id === props.postId && !likes.some(like => like.user_id === liked.user_id)) {
                    likes.push(liked);  
                    console.log('Post liked via WebSocket:', liked);
                }
            });

            socket.instance.on('unlikePost', (liked: Like) => {
                if (liked.post_id === props.postId) {
                    const index = likes.findIndex(like => like.user_id === liked.user_id);
                    if (index !== -1) {
                        likes.splice(index, 1); 
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
        
        return { like, likes };
    },
});
</script>

<style scoped src="./PostLikes.css"></style>