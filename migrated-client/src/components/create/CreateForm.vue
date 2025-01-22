<template>
    <div class="container">
        <div class="create-container">
            <div class="f-column">
                <div class="fc-inp"> 
                    <input v-model="content" placeholder="What's Up?">
                </div>
            </div>
            <div class="demostration-content">
                <img 
                style="width: 100%; height: 250px; object-fit: cover; border-radius: 15px;" 
                src="imageSource">
            </div>
            <div class="s-column">
                <button type="submit"> 
                  <div class="sce-three">
                     <i class="fa fa-paper-plane"></i>
                  </div>
                </button> 
            </div>
        </div>
    </div>
</template>


<script lang="ts">
    import { defineComponent } from 'vue'
    
    export default defineComponent({
        name: 'CreateForm'
    })
</script>

<style scoped src="./CreateForm.css"></style>