<template>
              <div class="comment-awnser">

                
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