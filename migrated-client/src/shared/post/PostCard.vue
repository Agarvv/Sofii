<template>
    <div class="post">
      <div class="post-header">
        <div>
          <img
            style="
              width: 40px;
              height: 40px;
              border-radius: 50%;
              object-fit: cover;
            "
            src="post owner pic"
            alt="Post Owner"
          />
        </div>
        <div class="post-user-detail">
          <h4>{{ post.user.username }}</h4>
        </div>
  
        <div class="post-button-delete">
         <i class="fa fa-close"></i>
        </div>
      </div>
      <div class="post-content">
        <div class="post-description">
          <p>{{ post.description }}</p>
        </div>
        <div class="post-image">
          <img :src="post.postPicture" alt="Post Image" />
        </div>
      </div>
  
      <div class="post-interactions">
        <div class="like">
          <LikeButton :postId="post.id" /> 
          <span>{{ post.postLikes.length }}</span>
        </div>
        <div class="comment">
          <i class="fa fa-comments"></i>
          <span>{{ post.postComments.length }}</span>
        </div>
  
        <div class="save">
          <SaveButton :postId="post.id" /> 
          <span>{{ post.saved_post.length }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { Post } from '@/types/posts/Post';
  import LikeButton from './like/LikeButton.vue'
  import SaveButton from './save/SaveButton.vue'
  
  export default defineComponent({
    name: 'PostCard',
    components: {
        LikeButton,
        SaveButton
    },
    props: {
      post: {
        type: Object as () => Post, 
        required: true,
      },
    },
  });
  </script>
  
  <style scoped src="./PostCard.css"></style>
  