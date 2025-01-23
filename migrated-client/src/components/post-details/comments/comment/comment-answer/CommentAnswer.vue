<template>
    <div class="awnser">
        <div class="response-user">
                    <div class="response-user-img">
                      <img
                      style="width: 40px; height: 40px; border-radius: 50%"
                       src="">
                    </div>
                    <div class="response-username">
                      <h3>Answer Username</h3>
                    </div>
                  </div>
                  
                  <div class="response-content">
                    <p>Answer Content</p>
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
    import { defineComponent } from 'vue'; 
    
    export default defineComponent({
        name: 'CommentAnswer'
    })
</script>

<style scoped src="./CommentAnswer.css"></style>