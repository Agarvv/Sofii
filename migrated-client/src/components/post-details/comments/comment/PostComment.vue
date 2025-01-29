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
                
                
                <div @click="toggleAnswerField" class="awnser">
                  <i class="fa fa-share"></i>
                  <p>{{ comment.awnsers.length }}</p>
                </div>
                
                <CommentDislikes 
                  :dislikes="comment.comment_dislikes"
                  :postId="comment.post_id"
                  :commentId="comment.id"
                /> 
                
              </div>
              
              <div v-if="showAnswersField">
              <AnswerToComment 
              :postId="comment.post_id" 
              :commentId="comment.id" 
              /> 
              </div>
              
              <div @click="toggleAnswers" class="view-responses-button">
                  <i class="fa fa-chevron-down"></i>
              </div>
              
              <div v-if="showAnswers" class="comment-responses">
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
    import { defineComponent, PropType, ref } from 'vue'; 
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
        },
        setup() {
            const showAnswersField = ref<boolean>(false); 
            
            const showAnswers = ref<boolean>(false); 
            
            const toggleAnswerField = () => {
                showAnswersField.value = !showAnswersField.value; 
            }
            
            const toggleAnswers = () => {
                showAnswers.value = !showAnswers.value; 
            }
            
            return { showAnswersField, showAnswers, toggleAnswerField, toggleAnswers }
        }
    })
</script>

<style scoped src="./PostComment.css"></style>