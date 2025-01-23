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
    import { defineComponent } from 'vue'; 
    import PostCard from '@/shared/post/PostCard.vue'
    import PostComments from './comments/PostComments.vue'
    
    export default defineComponent({
        name: 'PostDetailsComponent',
        components: {
            PostCard 
        }
    })
</script>

<style scoped src="./PostDetailsComponent.css"></style>