<template>
       <div v-if="dislikes" @click="dislike">
           <i class="fa fa-thumbs-down"></i>
           <p>{{ dislikes.length }}</p>
       </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue'
    import { CommentDislikes } from '@/types/posts/CommentDislikes';
    import { useDislike } from '@/composables/useDislike'
    
    export default defineComponent({
        name: 'CommentDislikes',
        props: {
            dislikes: { 
                type: Object as () => CommentDislikes[],
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
            const dislike = async () => {
                const data = await useDislike({
                    type: 'COMMENT',
                    postId: props.postId,
                    commentId: props.commentId 
                })
                console.log("Data from useDislike", data); 
                
            }
        }
    })
</script>