<template>
  <div v-if="data">
    <!-- <SearchPageHeader @toggleFilters="toggleFiltersButton" /> -->
    
    <SearchFilters /> 
        
    <div class="container">
        
     <!--  <aside>
        <div class="aside-header">
          <div class="logo">
            <h1>Sofii</h1>
          </div>
        </div>
        
        <nav>
          <SearchFilters /> 
        </nav>
      </aside> --> 
     
  <div class="wrapper">
      <div class="content">
          <!-- -->
          <h1>Content</h1>
        <!-- 
        <div v-if="filteredContent.users.length > 0 && content_to_show == 'all' || content_to_show == 'users'" class="users">
          <h4>Users</h4>
          <div v-for="user in filteredContent.users" :key="user.id" class="user">
            <UserCard :user="user"/>
          </div>
        </div>

        <div class="posts" v-if="filteredContent.posts.length > 0 && content_to_show == 'posts' || content_to_show == 'all'">
          <h4 v-if="content.posts.length > 0">Posts</h4>
          <div v-for="post in filteredContent.posts" :key="post.id" class="post">
            <PostCard :post="post"
             @delete="handlePostRemoval"
            />
          </div>
        </div>
        --> 
        
      </div>
    </div> 
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import SearchFilters from '@/components/search/filters/SearchFilters.vue';
import { useGet } from '@/composables/useGet';
import { SearchResults } from '@/types/search/SearchResults';

export default defineComponent({
    name: 'SearchView',
    components: {
        SearchFilters,
    },
    setup() {
        const data = ref<SearchResults | null>(null); 

        const search = async () => {
                const response = await useGet<SearchResults>({
                    endpoint: '/search/a',
                    withError: true,
                });
                console.log('data from search', response);
                data.value = response; 
        };

        onMounted(() => {
            search();
        });

        return {
            data,
        };
    },
});
</script>

<style scoped src="./SearchView.css"></style>


<style scoped src="./SearchView.css"></style>