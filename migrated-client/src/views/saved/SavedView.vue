<template>
    <div class="saved">
       
    </div>
</template> 

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import PostCard from '@/shared/post/PostCard.vue';
  import { useGet } from '@/composables/useGet';

  export default defineComponent({
    name: 'SavedView',
    components: {
       PostCard
    },
    setup() {
        const getSaveds = async () => {
             const data = await useGet(); 
        }
    }
  })
</script> 