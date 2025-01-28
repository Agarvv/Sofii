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
        
        <div v-if="data.results.users.length > 0" class="users">
          <h4>Users</h4>
          <div v-for="user in data.results.users" :key="user.id" class="user">
           <!--  <UserCard :user="user"/> --> 
           <h1> user </h1>
          </div>
        </div>

        <div class="posts" v-if="data.results.posts.length > 0">
          <h4>Posts</h4>
          <div v-for="post in data.results.posts" :key="post.id" class="post">
            <PostCard :post="post"
            
            />
          </div>
        </div>
    
        
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
import { searchStore } from '@/store/searchStore'
import PostCard from '@/shared/post/PostCard.vue'

export default defineComponent({
    name: 'SearchView',
    components: {
        SearchFilters,
        PostCard
    },
    setup() {
        const store = searchStore(); 
        
        const data = ref<SearchResults | null>(null); 

        const search = async () => {
                const response = await useGet<SearchResults>({
                    endpoint: '/search/a',
                    withError: true,
                });
    
                store.setOriginalResults((response as any).results); 
                
                store.setFilteredResults((response as any).results); 
                
                data.value = response; 
                
                console.log('data from search', response);
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