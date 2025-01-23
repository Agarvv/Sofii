<template>
  <div>
    <div> 
      <div class="post-ctn">
          <PostCard :post="post" />
          <PostComments /> 
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import { PostDetails } from '@/types/posts/PostDetails';
    import PostCard from '@/shared/post/PostCard.vue'
    import PostComments from './comments/PostComments.vue'
    

    export default defineComponent({
        name: 'PostDetailsComponent',
        components: {
            PostCard,
            PostComments
        },
        props: {
            post: {
                type: Object as PropType<PostDetails>, 
                required: true
            }
        }
    });
</script>

<style scoped src="./PostDetailsComponent.css"></style>