<template>
  <HeaderComponent />  
  <div class="layout">
    <div class="aside">
      <AsideComponent /> 
    </div>
    
    <main class="main">
      <div class="posts">
        <PostCard 
          v-for="post in data.posts" 
          :key="post.id" 
          :post="post"
        />
      </div>
    </main>
    
    <div class="right-aside">
      <UsersMayLike :recomendedUsers="data.users" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'; 
import HeaderComponent from '@/shared/header/HeaderComponent.vue';
import AsideComponent from '@/shared/aside/AsideComponent.vue';
import UsersMayLike from '@/components/home/users-may-like/UsersMayLike.vue';
import { useGet } from '@/composables/useGet';
import PostCard from '@/shared/post/PostCard.vue';
import { apiStatusStore } from '@/store/apiStatusStore';
import { Post } from '@/types/posts/Post';
import { UserMayLike } from '@/types/users/UserMayLike';

export default defineComponent({
  name: 'HomeView',
  components: {
    HeaderComponent,
    AsideComponent,
    UsersMayLike,
    PostCard
  },
  setup() {
    const apiStore = apiStatusStore();
    
    const data = ref<{ posts: Post[], users: UserMayLike[] }>({ posts: [], users: [] });

    const fetchData = async () => {
      try {
        const response = await useGet<{ posts: Post[], users: UserMayLike[] }>({
          endpoint: '/posts',
          withError: true
        });

        console.log("response homepage", response)

        if (response) {
          data.value = response;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      data
    };
  }
});
</script>

<style scoped src="./HomeView.css"></style>