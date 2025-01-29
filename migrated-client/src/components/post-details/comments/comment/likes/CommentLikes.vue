<template>
    <div @click="like" class="like">
        <i class="fa fa-thumbs-up" :style="{ color: isLiked ? 'blue' : '' }"></i>
        <p>{{ likesCount }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLike } from '@/composables/useLike';
import { CommentLikes } from '@/types/posts/CommentLikes';
import { useSocket } from '@/composables/useWebSocket';

export default defineComponent({
    name: 'CommentLikes',
    props: {
        likes: {
            type: Array as () => CommentLikes[],
            required: true
        },
        postId: {
            type: Number,
            required: true
        },
        commentId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const userId = Number(localStorage.getItem('userId'));

        const likes = ref<CommentLikes[]>([...(props.likes || [])]);
        
        const isLiked = ref<boolean>(likes.value.some(like => like.user_id === userId));
        
        const likesCount = computed(() => likes.value.length);

        const { socket } = useSocket();

        const like = async () => {
            const data = await useLike({
                type: 'COMMENT',
                postId: props.postId,
                commentId: props.commentId
            });
            console.log("Data from useLike", data);
        };

        onMounted(() => {
            socket.instance.on("likeComment", (liked: CommentLikes) => {
                if (liked.comment_id === props.commentId)  {
                    
                    likes.value.push(liked);
                    
                    if (liked.user_id === userId) isLiked.value = true;
                    
                    console.log("Comment liked via WebSocket:", liked);
                }
            });

            socket.instance.on("unlikeComment", (liked: CommentLikes) => {
                if (liked.comment_id === props.commentId) {
                    
                    likes.value = likes.value.filter(l => l.user_id !== liked.user_id);
                    
                    if (liked.user_id === userId) isLiked.value = false;
                    
                    console.log("Comment unliked via WebSocket:", liked);
                }
            });
        });

        onBeforeUnmount(() => {
            socket.instance.off("likeComment");
            socket.instance.off("unlikeComment");
        });

        return { like, likesCount, isLiked };
    }
});
</script>