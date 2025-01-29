<template>
  <div class="saved-wraper">
    <div class="saved" v-if="saveds">
    <PostCard 
      v-for="saved in saveds.saveds" 
      :key="saved.id" 
      :post="saved.saved_post" 
    />
  </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import PostCard from '@/shared/post/PostCard.vue'; 
  import { useGet } from '@/composables/useGet';
  import { Saved } from '@/types/saved/Saved'
  import { apiService } from '@/api/ApiService'

  export default defineComponent({
    name: 'SavedView',
    components: {
      PostCard
    },
    setup() {
        const saveds = ref<Saved[]>([]); 
        
        const getSaveds = async () => {
            const data = await useGet<Saved[]>({
                endpoint: '/saved',
                withError: true
            });

            if(data) {
                saveds.value = data; 
            } else {
                console.log("no data")
            }
            console.log("data from saveds", data); 
        };

        onMounted(() => {
            getSaveds(); 
        });

        return {
            saveds
        };
    }
  });
</script>