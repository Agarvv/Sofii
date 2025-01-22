<template>
    <div class="save" @click="save">
        <i class="fa fa-bookmark"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue';
import { apiService } from '@/api/ApiService';
import { useSocket } from '@/composables/useWebSocket';  

export default defineComponent({
    name: 'SaveButton',
    props: {
        postId: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const { socket } = useSocket(); 

        const save = async () => {
            const data = await apiService.post('/posts/save', { postId: props.postId });
            console.log('Data from save:', data);
        };


        onMounted(() => {
            socket.instance.on('likePost', (newLike: any) => {
                console.log('new like', newLike);
            });
        });

        onBeforeUnmount(() => {
            socket.instance.off('likePost');
        });

        return { save };
    },
});
</script>

<style scoped src="./SaveButton.css"></style>