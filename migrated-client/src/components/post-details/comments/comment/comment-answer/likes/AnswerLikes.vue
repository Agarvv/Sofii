<template>
     <div v-if="like" @click="like" class="like">
          <i class="fa fa-thumbs-up"></i>
          <span>{{ likes.length }}</span>
     </div> 
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue'
    import { AnswerLikes } from '@/types/posts/AnswerLikes'
    import { useLike } from '@/composables/useLike'

    export default defineComponent({
        name: 'AnswerLikes',
        props: {
            likes: {
                type: Object as () => AnswerLikes[],
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
            const like = async () => {
                const data = await useLike({
                    type: 'ANSWER',
                    postId: props.postId,
                    commentId: props.commentId,
                    answerId: props.answerId 
                })
                
                console.log("Data from useLike", data); 
            }
            
            return { like } 
        }
    })
</script>