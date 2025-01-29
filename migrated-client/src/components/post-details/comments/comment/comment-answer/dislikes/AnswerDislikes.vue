<template>
    <div @click="dislike" class="dislike">
        <i class="fa fa-thumbs-down" :style="{ color: isDisliked ? 'red' : '' }"></i>
        <span>{{ dislikesCount }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { AnswerDislikes } from '@/types/posts/AnswerDislikes';
import { useDislike } from '@/composables/useDislike';
import { useSocket } from '@/composables/useWebSocket';

export default defineComponent({
    name: 'AnswerDislikes',
    props: {
        dislikes: {
            type: Array as () => AnswerDislikes[],
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
        
        const dislikes = ref<AnswerDislikes[]>([...(props.dislikes || [])]);
        
        const isDisliked = ref<boolean>(dislikes.value.some(dislike => dislike.user_id === userId));
        
        const dislikesCount = computed(() => dislikes.value.length);

        const { socket } = useSocket();

        const dislike = async () => {
            const data = await useDislike({
                type: 'ANSWER',
                postId: props.postId,
                commentId: props.commentId,
                answerId: props.answerId
            });
            console.log("data from dislike", data);
        };

        onMounted(() => {
            socket.instance.on("dislikeCommentAwnser", (disliked: AnswerDislikes) => {
                if (
                    disliked.awnser_id === props.answerId 
                ) {
                    dislikes.value.push(disliked);
                    
                    if (disliked.user_id === userId) isDisliked.value = true;
                    
                    console.log("Answer disliked via WebSocket:", disliked);
                }
            });

            socket.instance.on("undislikeCommentAwnser", (undisliked: AnswerDislikes) => {
                if (undisliked.awnser_id === props.answerId) {
                    
                    dislikes.value = dislikes.value.filter(d => d.user_id !== undisliked.user_id);
                    
                    if (undisliked.user_id === userId) isDisliked.value = false;
                    
                    console.log("Answer undisliked via WebSocket:", undisliked);
                }
            });
        });

        onBeforeUnmount(() => {
            socket.instance.off("dislikeCommentAwnser");
            socket.instance.off("undislikeCommentAwnser");
        });

        return { dislike, dislikesCount, isDisliked };
    }
});
</script>