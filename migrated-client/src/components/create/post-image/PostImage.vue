<template>
    <div @click="openFileInput" class="sce-one">
      <i class="fa fa-image"></i>
      <input style="display: none" ref="fileInput" @change="handleImageChange" type="file" id="imageInp" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useImageUpload } from '@/composables/useImageUpload';
  
  export default defineComponent({
    name: 'PostImage',
    emits: ['imageUploaded'], 
    setup(_, { emit }) {
      const fileInput = ref<HTMLInputElement | null>(null);
  
      const openFileInput = () => {
        fileInput.value?.click();
      };
  
      const handleImageChange = async (event: Event) => {
        const input = event.target as HTMLInputElement;
        const file = input.files ? input.files[0] : null;
  
        if (!file) {
          console.error('No file selected');
          return;
        }

        const imageUrl = await useImageUpload({ file });
        console.log('Image URL from composable:', imageUrl);
  
        emit('imageUploaded', imageUrl);

      };
  
      return {
        openFileInput,
        handleImageChange,
        fileInput,
      };
    },
  });
  </script>
  
  <style scoped src="./PostImage.css"></style>
  