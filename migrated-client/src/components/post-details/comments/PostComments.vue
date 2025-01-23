<template>
<div v-if="post">
   <CreateComment :postId="post.id" /> 
   
   <div class="comments">
        <div class="comment-section">
            <div v-for="comment in post.postComments" :key="comment.id" class="comment">
                 <PostComment :comment="comment"/>
            </div> 
        </div>
    </div>
</div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue'; 
    import CreateComment from './create-comment/CreateComment.vue'
    import PostComment from './comment/PostComment.vue'
    import { PostDetails } from '@/types/posts/PostDetails';
    
    export default defineComponent({
        name: 'PostComments',
        props: {
            post: {
                type: Object as PropType<PostDetails>, 
                required: true
            }
        },
        components: {
            CreateComment,
            PostComment
        }
    })
</script>

<style scoped src="./PostComments.css"></style>