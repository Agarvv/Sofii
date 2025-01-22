<template>
    <div class="save" @click="save">
        <i class="fa fa-bookmark"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { apiService } from '@/api/ApiService';


export default defineComponent({
    name: 'SaveButton',
    props: {
        postId: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const save = async () => {
            
            const data = await apiService.post<{ postId: number }>('/posts/save', { postId: props.postId })
                
                console.log('Data from save:', data);
        }; 

        return { save };
    },
});
</script>

<style scoped src="./SaveButton.css"></style>