<template>
    <div @click="like" class="like">
        <i class="fa fa-thumbs-up" :style="{ color: isLiked ? 'blue' : '' }"></i>
        <span>{{ likesCount }}</span>
    </div> 
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { AnswerLikes } from '@/types/posts/AnswerLikes';
import { useLike } from '@/composables/useLike';
import { useSocket } from '@/composables/useWebSocket';

export default defineComponent({
    name: 'AnswerLikes',
    props: {
        likes: {
            type: Array as () => AnswerLikes[],
            required: true
        },
        postId: {
            type: Number,
            required: true
        },
        commentId: {
            type: Number,
            required: true
        },
        answerId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const userId = Number(localStorage.getItem('userId'));
        
        const likes = ref<AnswerLikes[]>([...(props.likes || [])]);
        
        const isLiked = ref<boolean>(likes.value.some(like => like.user_id === userId));
        
        const likesCount = computed(() => likes.value.length);

        const { socket } = useSocket();

        const like = async () => {
            const data = await useLike({
                type: 'ANSWER',
                postId: props.postId,
                commentId: props.commentId,
                answerId: props.answerId
            });
            console.log("Data from useLike", data);
        };

        onMounted(() => {
            socket.instance.on("likeCommentAwnser", (liked: AnswerLikes) => {
                if (
                    liked.awnser_id === props.answerId 
                ) {
                    likes.value.push(liked);
                    
                    if (liked.user_id === userId) isLiked.value = true;
                    
                    console.log("Answer liked via WebSocket:", liked);
                }
            });

            socket.instance.on("unlikeCommentAwnser", (unliked: AnswerLikes) => {
                if (unliked.awnser_id === props.answerId) {
                    
                    likes.value = likes.value.filter(l => l.user_id !== unliked.user_id);
                    
                    if (unliked.user_id === userId) isLiked.value = false;
                    
                    console.log("Answer unliked via WebSocket:", unliked);
                }
            });
        });

        onBeforeUnmount(() => {
            socket.instance.off("likeCommentAwnser");
            socket.instance.off("unlikeCommentAwnser");
        });

        return { like, likesCount, isLiked };
    }
});
</script>