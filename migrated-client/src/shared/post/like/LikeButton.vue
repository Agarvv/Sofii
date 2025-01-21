<template>
    <div class="like" @click="like">
        <i class="fa fa-thumbs-up"></i>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useLike } from '@/composables/useLike';

export default defineComponent({
    name: 'LikeButton',
    props: {
        postId: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const like = async () => {
            
                const data = await useLike({
                    type: 'POST',
                    postId: props.postId,
                });
                console.log('Data from like:', data);
        };

        return { like };
    },
});
</script>

<style scoped src="./LikeButton.css"></style>