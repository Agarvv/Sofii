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
                 <CommentLikes 
                   :likes="comment.comment_likes"
                   :postId="comment.post_id"
                   :commentId="comment.id"
                 />
                
                
                <div class="awnser">
                  <i class="fa fa-share"></i>
                  <p>70</p>
                </div>
                
                <CommentDislikes 
                  :dislikes="comment.comment_dislikes"
                  :postId="comment.post_id"
                  :commentId="comment.id"
                /> 
                
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
    import CommentLikes from './likes/CommentLikes.vue'; 
    import CommentDislikes from './dislikes/CommentDislikes.vue'; 
    
    
    export default defineComponent({
        name: 'PostComment',
        components: {
            AnswerToComment,
            CommentAnswer,
            CommentLikes,
            CommentDislikes
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