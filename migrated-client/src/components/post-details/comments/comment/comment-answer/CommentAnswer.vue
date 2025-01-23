<template>
    <div v-if="answer" class="awnser">
        <div class="response-user">
                    <div class="response-user-img">
                      <img
                      style="width: 40px; height: 40px; border-radius: 50%"
                       :src="answer.awnser_user.profilePicture">
                    </div>
                    <div class="response-username">
                      <h3>{{ answer.awnser_user.username }}</h3>
                    </div>
                  </div>
                  
                  <div class="response-content">
                    <p>{{ answer.answer_content }}</p>
                  </div>
                  
                  <div class="comment-response-interact">
                      
                    <div class="like">
                      <i class="fa fa-thumbs-up"></i>
                      <span>789</span>
                    </div> 
                    
                    
                    <div class="dislike">
                      <i class="fa fa-thumbs-down"></i>
                      <span>780</span>
                    </div>
         </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue'; 
    import { CommentAnswer } from '@/types/posts/CommentAnswer'
    
    export default defineComponent({
        name: 'CommentAnswer',
        props: {
            answer: {
                type: Object as PropType<CommentAnswer>, 
                required: true
            }
        }
    })
</script>

<style scoped src="./CommentAnswer.css"></style>