<template>
    <div @click="dislike" class="dislike">
        <i class="fa fa-thumbs-down" :style="{ color: isDisliked ? 'blue' : '' }"></i>
        <p>{{ dislikesCount }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { CommentDislikes } from '@/types/posts/CommentDislikes';
import { useDislike } from '@/composables/useDislike';
import { useSocket } from '@/composables/useWebSocket';

export default defineComponent({
    name: 'CommentDislikes',
    props: {
        dislikes: {
            type: Array as () => CommentDislikes[],
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

        const dislikes = ref<CommentDislikes[]>([...(props.dislikes || [])]);
        
        const isDisliked = ref<boolean>(dislikes.value.some(dislike => dislike.user_id === userId));
        
        const dislikesCount = computed(() => dislikes.value.length);

        const { socket } = useSocket();

        const dislike = async () => {
            const data = await useDislike({
                type: 'COMMENT',
                postId: props.postId,
                commentId: props.commentId
            });
            console.log("Data from useDislike", data);
        };

        onMounted(() => {
            socket.instance.on("dislikeComment", (disliked: CommentDislikes) => {
                if (disliked.comment_id === props.commentId) {
                    dislikes.value.push(disliked);
                    
                    if (disliked.user_id === userId) isDisliked.value = true;
                    
                    console.log("Comment disliked via WebSocket:", disliked);
                }
            });

            socket.instance.on("undislikeComment", (disliked: CommentDislikes) => {
                if (disliked.comment_id === props.commentId) {
                    dislikes.value = dislikes.value.filter(d => d.user_id !== disliked.user_id);
                    
                    if (disliked.user_id === userId) isDisliked.value = false;
                    
                    console.log("Comment undisliked via WebSocket:", disliked);
                }
            });
        });

        onBeforeUnmount(() => {
            socket.instance.off("dislikeComment");
            socket.instance.off("undislikeComment");
        });

        return { dislike, dislikesCount, isDisliked };
    }
});
</script>