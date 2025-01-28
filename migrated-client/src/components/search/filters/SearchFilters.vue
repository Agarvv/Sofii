<template>
  <div class="filter-div">
    <div class="close-filters">
      <i class="fas fa-times"></i>
    </div>

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
          <input type="checkbox" />
        </div>
        <div class="friend">
          <label>Friend</label>
          <input type="checkbox" />
        </div>
        <div class="followers">
          <label>Popular</label>
          <input type="checkbox" />
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
          <input type="checkbox" />
        </div>

        <div class="most-saved">
          <label>Most Saved</label>
          <input type="checkbox" />
        </div>

        <div class="most-commented">
          <label>Most Commented</label>
          <input type="checkbox" />
        </div>

        <div class="liked">
          <label>Liked</label>
          <input type="checkbox" />
        </div>

        <div class="latest">
          <label>Latest</label>
          <input type="checkbox" />
        </div>
        <div class="popular">
          <label>Popular</label>
          <input type="checkbox" />
        </div>
        <div class="trending">
          <label>Trending</label>
          <input type="checkbox" />
        </div>
      </div>
    </div>

    <div class="hidden-videos">
      <div>
        <span>Videos</span>
      </div>
      <div>
        <i class="fas fa-caret-down"></i>
      </div>
    </div>

    <div class="hidden-videos">
      <div class="sort-options">
        <div class="most-liked">
          <label>Most Liked</label>
          <input type="checkbox" />
        </div>

        <div class="most_saved">
          <label>Most Saved</label>
          <input type="checkbox" />
        </div>

        <div class="most_commented">
          <label>Most Commented</label>
          <input type="checkbox" />
        </div>

        <div class="trending">
          <label>Trending</label>
          <input type="checkbox" />
        </div>

        <div class="liked">
          <label>Liked</label>
          <input type="checkbox" />
        </div>
      </div>
    </div>

    <div class="show_filters_button_div">
      <button>Apply Filters</button>
    </div>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue' 
    
    export default defineComponent({
        name: 'SearchFilters'
    })
</script>

<style scoped src="./SearchFilters.css"></style>