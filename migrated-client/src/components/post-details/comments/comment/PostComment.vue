<template>
       <div v-if="comment" class="comment">
              <div class="comment-user-details">
                <div class="user-comment-img"> 
                  <img 
                  :src="comment.commentUser.profilePicture" 
                  alt="User Picture"
                  >
                </div>
                <div class="user-comment-username">
                  <h4>{{ comment.commentUser.username }}</h4>
                </div>
              </div>
              
              <div class="user-comment">
                <p>{{ comment.comment_content }}</p>
              </div>
              
              <div class="comment-interacts">
                <div class="like">
                  <i class="fa fa-thumbs-up"></i>
                  <p>0</p>
                </div>
                
                
                <div class="awnser">
                  <i class="fa fa-share"></i>
                  <p>70</p>
                </div>
                
                
                <div>
                  <i class="fa fa-thumbs-down"></i>
                  <p>140</p>
                </div>
              </div>
              
              <AnswerToComment 
              :postId="comment.post_id" 
              :commentId="comment.id" 
              /> 
              
              <div class="view-responses-button">
                  <i class="fa fa-chevron-down"></i>
              </div>
              
              <div class="comment-responses">
                <div
                v-for="answer in comment.awnsers" 
                :key="answer.id" 
                class="response">
                    <CommentAnswer :answer="answer" />
                </div> 
                
             </div>
     </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue'; 
    import AnswerToComment from './answer-to-comment/AnswerToComment.vue'
    import CommentAnswer from './comment-answer/CommentAnswer.vue'
    import { PostCommentDetails } from '@/types/posts/PostCommentDetails'
    
    export default defineComponent({
        name: 'PostComment',
        components: {
            AnswerToComment,
            CommentAnswer
        },
        props: {
            comment: {
                type: Object as PropType<PostCommentDetails>, 
                required: true
            }
        }
    })
</script>

<style scoped src="./PostComment.css"></style>