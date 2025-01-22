<template>
    <div class="like" @click="like">
        <span>{{ likes.length }}</span>  
        <i class="fa fa-thumbs-up"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, reactive } from 'vue';
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
        let likes = reactive<Like[]>([...props.postLikes]);

        const { socket } = useSocket();

        const like = async () => {
            try {
                const data = await apiService.post('/posts/like', { postId: props.postId });
                console.log('Data from like:', data);
            } catch (error) {
                console.error('Error al enviar el like:', error);
            }
        };

        onMounted(() => {
            socket.instance.on('likePost', (liked: Like) => {
                if (liked.post_id === props.postId) {
                    likes.push(liked);
                    console.log('Post liked via WebSocket:', liked);
                }
            });

            socket.instance.on('unlikePost', (liked: Like) => {
                if (liked.post_id === props.postId) {
                    likes = likes.filter(like => like.user_id !== liked.user_id); 
                    console.log('Post unliked via WebSocket:', liked);
                }
            });
        });

        onBeforeUnmount(() => {
            socket.instance.off('likePost');
            socket.instance.off('unlikePost');
        });

        return { like, likes }; 
    },
});
</script>

<style scoped src="./PostLikes.css"></style>
