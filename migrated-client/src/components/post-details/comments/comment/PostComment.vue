<template>
       <div  class="comment">
              <div class="comment-user-details">
                <div class="user-comment-img"> 
                  <img 
                  src="" 
                  alt="User Picture"
                  >
                </div>
                <div class="user-comment-username">
                  <h4>Comment Owner Username</h4>
                </div>
              </div>
              
              <div class="user-comment">
                <p>Comment Owner Content</p>
              </div>
              
              <div class="comment-interacts">
                <div class="like">
                  <i class="fa fa-thumbs-up"></i>
                  <p>5</p>
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
              
              <AnswerToComment /> 
              
              <div class="view-responses-button">
                  <i class="fa fa-chevron-down"></i>
              </div>
              
              <div class="comment-responses">
                <div class="response">
                    <CommentAnswer/>
                </div> 
             </div>
     </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'; 
    
    import AnswerToComment from './answer-to-comment/AnswerToComment.vue'
    
    import CommentAnswer from './comment-answer/CommentAnswer.vue'
    
    export default defineComponent({
        name: 'PostComment',
        components: {
            AnswerToComment,
            CommentAnswer
        }
    })
</script>