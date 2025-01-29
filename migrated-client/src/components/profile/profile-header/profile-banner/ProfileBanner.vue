<template>
  <div class="profile-banner" @click="openFileInput">
    <input type="file" ref="fileInput" style="display: none" @change="handleFileChange"/>
    <img :src="profileBanner" alt="Profile Banner">
  </div>
</template>

<script lang="ts">
  import { defineComponent, mergeProps, ref } from 'vue'; 
  import { useImageUpload } from '@/composables/useImageUpload'
  import useProfileDataChange from '@/composables/useProfileDataChange'

  export default defineComponent({
    name: 'ProfileBanner',
    props: {
      profileBanner: {
        type: String,
        required: true
      },
      isSelf: {
        type: Boolean,
        required: true 
      }
    },
    setup(props) {
      const { changeProfileData } = useProfileDataChange(); 
      
      const fileInput = ref<HTMLInputElement | null>(null);

      const openFileInput = () => {
        if(!props.isSelf) return; 
        if (fileInput.value) {
          fileInput.value.click();
        }
      };

      const handleFileChange = async (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          console.log('Selected banner file:', file);
          
          const bannerUrl = await useImageUpload({
              file: file
          });

          await changeProfileData({
            field: 'banner',
            value: bannerUrl
          });
        }
      };

      return {
        fileInput,
        openFileInput,
        handleFileChange
      };
    }
  });
</script>