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
                      
                    <AnswerLikes 
                        :likes="answer.awnser_likes"
                        :postId="answer.post_id"
                        :commentId="answer.comment_id"
                        :answerId="answer.id"
                    /> 
                    
                    <AnswerDislikes
                        :dislikes="answer.awnser_dislikes"
                        :postId="answer.post_id"
                        :commentId="answer.comment_id"
                        :answerId="answer.id"
                    /> 
         </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue'; 
    import { CommentAnswer } from '@/types/posts/CommentAnswer'
    import AnswerLikes from './likes/AnswerLikes.vue'
    import AnswerDislikes from './dislikes/AnswerDislikes.vue'
    
    export default defineComponent({
        name: 'CommentAnswer',
        props: {
            answer: {
                type: Object as PropType<CommentAnswer>, 
                required: true
            }
        },
        components: {
            AnswerLikes,
            AnswerDislikes
        }
    })
</script>

<style scoped src="./CommentAnswer.css"></style>