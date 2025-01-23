<template>
        <div v-if="dislikes" @click="dislike" class="dislike">
            <i class="fa fa-thumbs-down"></i>
            <span>{{ dislikes.length }}</span>
        </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { AnswerDislikes } from '@/types/posts/AnswerDislikes'
    import { useDislike } from '@/composables/useDislike'
    
    export default defineComponent({
        name: 'AnswerDislikes',
        props: {
            dislikes: {
                type: Object as () => AnswerDislikes[],
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
            const dislike = async () => {
                const data = await useDislike({
                    type: 'ANSWER',
                    postId: props.postId,
                    commentId: props.commentId,
                    answerId: props.answerId
                })
                console.log("data from dislike", data); 
            }
            
            return { dislike } 
        }
    })
</script>