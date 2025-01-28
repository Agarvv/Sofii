<template>
    <div class="like" @click="like">
        <span>{{ postLikes.length }}</span>  
        <i :class="['fa', 'fa-thumbs-up', { 'liked': isLiked }]"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, reactive, watch } from 'vue';
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
        const userId = localStorage.getItem('userId');
        
        const likes = reactive({
            list: [...props.postLikes]
        });

        const like = async () => {
            const data = await apiService.post('/posts/like', { postId: props.postId });
            console.log('Data from like:', data);
        };

        onMounted(() => {
            const { socket } = useSocket();

            socket.instance.on('likePost', (liked: Like) => {
                if (liked.post_id === props.postId && !likes.list.some(like => like.user_id === liked.user_id)) {
                    likes.list.push(liked);
                    console.log('Post liked via WebSocket:', liked);
                }
            });

            socket.instance.on('unlikePost', (liked: Like) => {
                if (liked.post_id === props.postId) {
                    const index = likes.list.findIndex(like => like.user_id === liked.user_id);
                    if (index !== -1) {
                        likes.list.splice(index, 1);
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

        watch(() => props.postLikes, (newLikes) => {
            likes.list = [...newLikes];
        });

        return { like, likes };
    },
});
</script>

<style scoped src="./PostLikes.css"></style>