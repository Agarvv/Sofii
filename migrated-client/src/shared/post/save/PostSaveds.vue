<template>
    <div class="save">
        <span>{{ saveds.length }}</span>
        <i @click="save" class="fa fa-bookmark"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue';
import { apiService } from '@/api/ApiService';
import { useSocket } from '@/composables/useWebSocket';  
import { Saved } from '@/types/posts/Saved'

export default defineComponent({
    name: 'PostSaveds',
    props: {
        postId: {
            type: Number,
            required: true,
        },
        saveds: {
            type: Array as () => Saved[],
            required: true 
        }
    },
    setup(props) {
        const { socket } = useSocket(); 

        const save = async () => {
            const data = await apiService.post('/posts/save', { postId: props.postId });
            console.log('Data from save:', data);
        };

        onMounted(() => {
            socket.instance.on('savedPost', (saved: Saved) => {
                
                
                if(saved.post_id === props.postId) {
                    console.log('new saved', saved);
                  //  props.saveds.push(saved); 
                }
            });
            
            socket.instance.on('unsavedPost', (saved: Saved) => {
                if(props.postId === saved.post_id) {
                    console.log("unsaved post", saved)
                  //  props.saveds = props.saveds.filter(item => item.post_id !== saved.post_id); 
                }
            });
        });

        onBeforeUnmount(() => {
            socket.instance.off('savedPost');
            socket.instance.off('unsavedPost');
        });

        return { save };
    },
});
</script>

<style scoped src="./PostSaveds.css"></style>