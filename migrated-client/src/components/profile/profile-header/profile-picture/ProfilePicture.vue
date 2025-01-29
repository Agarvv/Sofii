<template>
  <div class="user-img" @click="isSelf ? openFileInput : null">
    <input type="file" ref="fileInput" style="display: none" @change="handleFileChange"/>
    <img :src="profilePicture" alt="Profile Pic">
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'; 
  import useProfileDataChange from '@/composables/useProfileDataChange'
  import { useImageUpload } from '@/composables/useImageUpload'
  
  export default defineComponent({
    name: 'ProfilePicture',
    props: {
      profilePicture: {
        type: String,
        required: true 
      },
      isSelf: {
        type: Boolean,
        required: true 
      }
    },
    setup() {
      const { changeProfileData } = useProfileDataChange(); 
      
      const fileInput = ref<HTMLInputElement | null>(null);
      
      const openFileInput = () => {
        if (fileInput.value) {
          fileInput.value.click();
        }
      };

      const handleFileChange = async (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          console.log('Selected file:', file);
          
          const imageUrl = await useImageUpload({
              file: file
          }); 

          await changeProfileData({
              field: 'profilePicture',
              value: imageUrl 
          })
          
        }
      };

      return {
        fileInput,
        openFileInput,
        handleFileChange
      };
    }
  })
</script>