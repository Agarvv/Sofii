<template>
    <div class="like" @click="like">
        <span>{{ likes.length }}</span>
        <i class="fa fa-thumbs-up"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue';
import { apiService } from '@/api/ApiService'; 
import { useSocket } from '@/composables/useWebSocket';  
import { Like } from '@/types/posts/Like'

export default defineComponent({
    name: 'PostLikes',
    props: {
        postId: {
            type: Number,
            required: true,
        },
        likes: {
            type: Array as () => Like[],
            required: true
        }
    },
    setup(props) {
        const { socket } = useSocket();  
        const like = async () => {
                const data = await apiService.post('/posts/like', { postId: props.postId });
                console.log('Data from like:', data);
            
        };

        onMounted(() => {
            socket.instance.on('likePost', (liked: Like) => {
                if (liked.post_id === props.postId) {
                  //  props.likes.push(liked); 
                    console.log('Post liked via WebSocket:', liked);
                }
            });

            socket.instance.on('unlikePost', (liked: Like) => {
                if (liked.post_id === props.postId) {
                 //   props.likes = props.likes.filter(like => like.post_id !== liked.post_id);
                    console.log('Post unliked via WebSocket:', liked);
                }
            });
        });

        onBeforeUnmount(() => {
            socket.instance.off('likedPost');
            socket.instance.off('unlikedPost');
        });

        return { like };
    },
});
</script>

<style scoped src="./PostLikes.css"></style>