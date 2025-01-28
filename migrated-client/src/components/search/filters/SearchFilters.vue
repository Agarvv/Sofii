<template>
  <div class="filter-div">

    <div class="aside-users">
      <div>
        <i class="fas fa-user"></i>
        <span>Users</span>
      </div>
      <div>
        <i class="fas fa-caret-down"></i>
      </div>
    </div>

    <div class="hidden-users">
      <div class="order-by-son">
        <div class="following">
          <label>Following</label>
          <input type="checkbox" v-model="filters.users.following" />
        </div>
        <div class="friend">
          <label>Friend</label>
          <input type="checkbox" v-model="filters.users.friend" />
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
      <div>
        <i class="fas fa-caret-down"></i>
      </div>
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

        <div class="latest">
          <label>Latest</label>
          <input type="checkbox" v-model="filters.posts.latest" />
        </div>
        <div class="popular">
          <label>Popular</label>
          <input type="checkbox" v-model="filters.posts.popular" />
        </div>
        <div class="trending">
          <label>Trending</label>
          <input type="checkbox" v-model="filters.posts.trending" />
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
  setup() {
    const store = searchStore(); 
    
    const filters = reactive({
      users: {
        following: false,
        friend: false,
        popular: false
      },
      posts: {
        mostLiked: false,
        mostSaved: false,
        mostCommented: false,
        liked: false,
        latest: false,
        popular: false,
        trending: false
      }
    })

    const applyFilters = () => {
      const appliedFilters = {
        users: filters.users,
        posts: filters.posts
      }
      
      store.filter(appliedFilters)
    }

    return {
      filters,
      applyFilters
    }
  }
})
</script>

<style scoped src="./SearchFilters.css"></style>