<template>
  <div class="filter-div">
      <div @click="toggleFilters" class="close-filters">
          <i class="fa fa-close"></i>
      </div>
    <div class="aside-users">
      <div>
        <i class="fas fa-user"></i>
        <span>Users</span>
      </div>
      <!--<div>
        <i class="fas fa-caret-down"></i>
      </div>  -->
    </div>

    <div class="hidden-users">
      <div class="order-by-son">
        <div class="following">
          <label>Following</label>
          <input type="checkbox" v-model="filters.users.following" />
        </div>
        <div class="followers">
          <label>Popular</label>
          <input type="checkbox" v-model="filters.users.popular" />
        </div>
      </div>
    </div>

    <div class="aside-posts">
      <div>
        <i class="fas fa-newspaper"></i>
        <span>Posts</span>
      </div>
     <!--  <div>
        <i class="fas fa-caret-down"></i>
      </div>-->
    </div>

    <div class="hidden-posts">
      <div class="sort-options">
        <div class="most-liked">
          <label>Most Liked</label>
          <input type="checkbox" v-model="filters.posts.mostLiked" />
        </div>

        <div class="most-saved">
          <label>Most Saved</label>
          <input type="checkbox" v-model="filters.posts.mostSaved" />
        </div>

        <div class="most-commented">
          <label>Most Commented</label>
          <input type="checkbox" v-model="filters.posts.mostCommented" />
        </div>

        <div class="liked">
          <label>Liked</label>
          <input type="checkbox" v-model="filters.posts.liked" />
        </div>

        <div class="popular">
          <label>Popular</label>
          <input type="checkbox" v-model="filters.posts.popular" />
        </div>
      </div>
    </div>

    <div class="show_filters_button_div">
      <button @click="applyFilters">Apply Filters</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { searchStore } from '@/store/searchStore'

export default defineComponent({
  name: 'SearchFilters',
  setup(_, { emit }) {
    const store = searchStore(); 
    
    const filters = reactive({
      users: {
        following: false,
        popular: false
      },
      posts: {
        mostLiked: false,
        mostSaved: false,
        mostCommented: false,
        liked: false,
        popular: false,
      }
    })

    const applyFilters = () => {
      const appliedFilters = {
        users: filters.users,
        posts: filters.posts
      }
      
      store.filter(appliedFilters)
    }
    
    const toggleFilters = () => {
      emit('toggleFilters') 
    }


    return {
      filters,
      applyFilters,
      toggleFilters 
    }
  }
})
</script>

<style scoped src="./SearchFilters.css"></style>