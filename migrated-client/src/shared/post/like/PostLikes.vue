<template>
    <div class="like" @click="like">
        <span>5</span>  
        <i :class="['fa', 'fa-thumbs-up', { 'liked': isLiked }]"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref, computed } from 'vue';
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
        const userId = Number(localStorage.getItem('userId'));


        const likes = ref<Like[]>(props.postLikes);

        const isLiked = computed(() => likes.value.some(like => like.user_id === userId));

        const like = async () => {
            const data = await apiService.post('/posts/like', { postId: props.postId });
            console.log('Data from like:', data);
        };

        onMounted(() => {
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

        return { like, likes, isLiked };  
    },
});
</script>

<style scoped src="./PostLikes.css"></style>