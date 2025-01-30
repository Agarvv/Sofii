<template>
  <div v-if="filteredResults">
    <SearchPageHeader @toggleFilters="toggleFilters"/> 
    
    <SearchFilters @toggleFilters="toggleFilters" v-if="showFilters" /> 
        
    <div class="container">
     
  <div class="wrapper">
      <div class="content">
        
        <div v-if="filteredResults.users.length > 0" class="users">
          <h4>Users</h4>
          <div v-for="user in filteredResults.users" :key="user.id" class="user">
             <UserCard 
               :user="user"
             />
          </div>
        </div>

        <div class="posts" v-if="filteredResults.posts.length > 0">
          <h4>Posts</h4>
          <div v-for="post in filteredResults.posts" :key="post.id" class="post">
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
import { defineComponent, onMounted, ref, watch } from 'vue';
import SearchFilters from '@/components/search/filters/SearchFilters.vue';
import { useGet } from '@/composables/useGet';
import { SearchResults } from '@/types/search/SearchResults';
import { searchStore } from '@/store/searchStore'
import PostCard from '@/shared/post/PostCard.vue'
import { storeToRefs } from 'pinia';
import UserCard from '@/components/search/user-card/UserCard.vue';
import SearchPageHeader from '@/components/search/search-header/SearchPageHeader.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    name: 'SearchView',
    components: {
        SearchFilters,
        PostCard,
        UserCard,
        SearchPageHeader
    },
    setup() {
        const store = searchStore();
        const { filteredResults } = storeToRefs(store) 
        const showFilters = ref<boolean>(false); 

        const route = useRoute();  
        let searchQuery = route.params.query || '';  

        const search = async () => {
            const response = await useGet<SearchResults>({
                endpoint: `/search/${searchQuery}`,  
                withError: true,
            });

            store.setOriginalResults((response as any).results); 
            store.setFilteredResults((response as any).results); 
            console.log('data from search', response);
        };

        const toggleFilters = () => {
            console.log("received", showFilters.value)
            showFilters.value = !showFilters.value; 
        }

        onMounted(() => {
            search();
        });


        watch(() => route.params.query, (newQuery) => {
            if (newQuery !== searchQuery) {
                searchQuery = newQuery;  
                search(); 
            }
        });

        return {
            filteredResults,
            showFilters,
            toggleFilters
        };
    },
});
</script>

<style scoped src="./SearchView.css"></style>

