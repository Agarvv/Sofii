<template>
      <div v-if="likes" @click="like" class="like">
          <i class="fa fa-thumbs-up"></i>
          <p>{{ likes.lenght }}</p>
      </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue'
    import { useLike } from '@/composables/useLike'
    import { CommentLikes } from '@/types/posts/CommentLikes';
    
    
    export default defineComponent({
        name: 'CommentLikes',
        props: {
            likes: {
                type: Object as () => CommentLikes[],
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
            const like = async () => {
                const data = await useLike({
                    type: 'COMMENT',
                    postId: props.postId,
                    commentId: props.commentId 
                })
                console.log("Data from useLike", data)
            }
            
            return { like } 
        }
    })
</script>