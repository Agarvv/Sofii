<template>
   <div class="upload-comment">
    
            <div class="input">
              <input v-model="comment" type="text" placeholder="Upload A Comment">
            </div>
            
            <div class="send-button">
                <i class="fa fa-paper-plane"></i>
            </div>
   </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'; 
    
    export default defineComponent({
        name: 'CreateComment'
    })
</script>

<style scoped src="./CreateComment.css"></style>