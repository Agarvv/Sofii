<template>
    <div @click="save" class="save">
        <span>{{ localSaveds.length }}</span>
        <i :class="['fa', 'fa-bookmark', { 'saved': isSaved }]" :style="{ color: isSaved ? 'blue' : '' }"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import { apiService } from '@/api/ApiService';
import { useSocket } from '@/composables/useWebSocket';
import { Saved } from '@/types/posts/Saved';

export default defineComponent({
  name: 'PostSaveds',
  props: {
    postId: {
      type: Number,
      required: true,
    },
    saveds: {
      type: Array as () => Saved[],
      required: true,
    },
  },
  setup(props) {
    const userId = Number(localStorage.getItem("userId"))
    
    const localSaveds = ref<Saved[]>([...props.saveds]);
    
    const isSaved = ref<boolean>(localSaveds.value.some(saved => saved.user_id == userId));

    const { socket } = useSocket();

    const save = async () => {
      const data = await apiService.post('/posts/save', { postId: props.postId });
      console.log('Data from save:', data);
    };

    onMounted(() => {
      socket.instance.on('savedPost', (saved: Saved) => {
        if (saved.post_id === props.postId) {
          console.log('new saved', saved);


          localSaveds.value.push(saved);
          
          if(saved.user_id == userId) {
              isSaved.value = true; 
          }
          
        }
      });

      socket.instance.on('unsavedPost', (saved: Saved) => {
        if (saved.post_id === props.postId) {
          console.log("unsaved post", saved);
         
         
          localSaveds.value = localSaveds.value.filter(item => item.user_id !== saved.user_id);
          
          if(saved.user_id == userId) {
              isSaved.value = false; 
          }
        }
      });
    });

    onBeforeUnmount(() => {
      socket.instance.off('savedPost');
      socket.instance.off('unsavedPost');
    });

    return { save, localSaveds, isSaved };
  },
});
</script>


<style scoped src="./PostSaveds.css"></style>