<template>
    <div @click="openFileInput" class="sce-one">
        <i class="fa fa-image"></i>
        <input style="display: none" @change="handleImageChange" type="file" id="imageInp">
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    
    export default defineComponent({
        name: 'PostImage'
    })
</script>

<style scoped src="./PostImage.css" >
    
</style>