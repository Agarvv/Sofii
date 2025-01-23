<template>
   <CreateComment /> 
   
   <div class="comments">
        <div class="comment-section">
            <div class="comment">
                 <PostComment/>
            </div> 
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'; 
    import CreateComment from './create-comment/CreateComment.vue'
    import PostComment from './comment/PostComment.vue'
    
    export default defineComponent({
        name: 'PostComments',
        components: {
            CreateComment,
            PostComment
        }
    })
</script>

<style scoped src="./PostComments.css"></style>