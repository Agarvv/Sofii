<template>
<div v-if="post">
   <CreateComment :postId="post.id" /> 
   
   <div class="comments">
        <div v-if="postComments" class="comment-section">
            <div v-for="comment in postComments" :key="comment.id" class="comment">
                 <PostComment :comment="comment"/>
            </div> 
        </div>
    </div>
</div>
</template>

<script lang="ts">
    import { defineComponent, PropType, ref, onMounted } from 'vue'; 
    import CreateComment from './create-comment/CreateComment.vue'
    import PostComment from './comment/PostComment.vue'
    import { PostDetails } from '@/types/posts/PostDetails';
    import { PostCommentDetails } from '@/types/posts/PostCommentDetails'
    import { CommentAnswer } from '@/types/posts/CommentAnswer'
    import { useSocket } from '@/composables/useWebSocket';
    
    export default defineComponent({
        name: 'PostComments',
        props: {
            post: {
                type: Object as PropType<PostDetails>, 
                required: true
            },
            postId: {
                type: Number,
                required: true 
            }
        },
        components: {
            CreateComment,
            PostComment
        }, 
        setup(props) {
            const { socket } = useSocket(); 
            const postComments = ref<PostCommentDetails[]>(props.post.postComments); 
            
            onMounted(() => {

    socket.instance.on('newComment', (comment: PostCommentDetails) => {
       console.log("New comment!", comment)
        if(comment.post_id == props.postId) postComments.value.push(comment);
    });

    socket.instance.on('newCommentAwnser', (answer: CommentAnswer) => {
       console.log("New answer!", answer)
       
        const comment = postComments.value.find(c => c.id == answer.comment_id);
        if (comment) {
            comment.awnsers.push(answer); 
        }
    });
});
            
            return { postComments } 
        }
    })
</script>

<style scoped src="./PostComments.css"></style>