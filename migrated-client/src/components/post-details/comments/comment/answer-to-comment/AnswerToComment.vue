<template>
              <div class="comment-awnser">
                <div class="comment-awnser-user">
                  <div class="comment-awnswer-user-img">
                      
                    <img 
                    style="border-radius: 50%; width: 50px; height: 50px; object-fit: cover"
                    src="" 
                    alt="Answer Owner Profile Pic Picture"
                    >
        
                  </div>
                </div>
                
                <div class="comment-awnser-input">
                  <input placeholder="Answer To This Comment">
                </div>
                
                <div class="comment-awnser-send-button">
                    <i class="fa fa-paper-plane"></i>
                </div>
              </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'; 
    
    export default defineComponent({
        name: 'AnswerToComment'
    })
</script>

<style scoped src="./AnswerToComment.css"></style>