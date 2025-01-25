<template>
  <div class="saved">
      <h1>C#</h1>
  </div>
</template> 

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  //import PostCard from '@/shared/post/PostCard.vue';
  import { useGet } from '@/composables/useGet';
  import { Saved } from '@/types/saved/Saved'
  import { apiService } from '@/api/ApiService'
  
  export default defineComponent({
    name: 'SavedView',
   /* components: {
      PostCard
    },*/ 
    setup() {
        const getSaveds = async () => {
             const data = await useGet<Saved[]>({
                 endpoint: '/saved',
                 withError: true
             }); 
             
             console.log("data from saveds", data)
        }

        onMounted(() => {
            getSaveds(); 
        })
    }
  })
</script>