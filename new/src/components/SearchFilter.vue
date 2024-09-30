<template>
  <div class="filter-div">
    <div @click="toggleFiltersButton" class="close-filters">
      <font-awesome-icon icon="close"/>
    </div>

    <div @click="showFilters('users')" class="aside-users">
      <div @click="toggleUsers">
        <font-awesome-icon icon="user" />
        <span>Users</span>
      </div>
      <div>
        <font-awesome-icon icon="caret-down" />
      </div>
    </div>

    <div v-show="showUsersFilters" class="hidden-users">
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
          <input type="checkbox" v-model="filters.users.followers" />
        </div>
      </div>
    </div>

    <div @click="showFilters('posts')" class="aside-posts">
      <div>
        <font-awesome-icon icon="newspaper" />
        <span>Posts</span>
      </div>
      <div>
        <font-awesome-icon icon="caret-down" />
      </div>
    </div>

    <div class="hidden-posts" v-show="showPostsFilters">
      <div class="sort-options">
        <div class="most-liked">
          <label>Most Liked</label>
          <input type="checkbox" v-model="filters.posts.most_liked">
        </div>
        <div class="most-saved">
          <label>Most Saved</label>
          <input type="checkbox" v-model="filters.posts.most_saved">
        </div>
        <div class="most-commented">
          <label>Most Commented</label>
          <input type="checkbox" v-model="filters.posts.most_commented">
        </div>
        <div class="liked">
          <label>Liked</label>
          <input type="checkbox" v-model="filters.posts.liked">
        </div>
        <div class="latest">
          <label>Latest</label>
          <input type="checkbox" name="sort-posts" v-model="filters.latest" />
        </div>
        <div class="popular">
          <label>Popular</label>
          <input type="checkbox" name="sort-posts" v-model="filters.posts.popular" />
        </div>
        <div class="trending">
          <label>Trending</label>
          <input type="checkbox" name="sort-posts" v-model="filters.posts.trending" />
        </div>
      </div>
    </div>

    <div class="hidden-videos" @click="showFilters('videos')">
      <div>
        <span>Videos</span>
      </div>
      <div>
        <font-awesome-icon icon="caret-down"/>
      </div>
    </div>

    <div class="hidden-videos" v-show="showVideosFilters">
      <div class="sort-options">
        <div class="most-liked">
          <label>Most Liked</label>
          <input type="checkbox" v-model="filters.videos.most_liked">
        </div>
        <div class="most_saved">
          <label>Most Saved</label>
          <input type="checkbox" v-model="filters.videos.most_saved">
        </div>
        <div class="most_commented">
          <label>Most Commented</label>
          <input type="checkbox" v-model="filters.videos.most_commented">
        </div>
        <div class="trending">
          <label>Trending</label>
          <input type="checkbox" v-model="filters.videos.trending">
        </div>
        <div class="liked">
          <label>Liked</label>
          <input type="checkbox" v-model="filters.videos.liked">
        </div>
      </div>
    </div>

    <div class="show_filters_button_div">
      <button @click="applyFilters">Apply Filters</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filters: Object,
    showUsersFilters: Boolean,
    showPostsFilters: Boolean,
    showVideosFilters: Boolean
  },
  methods: {
     setFilter() {
          this.$emit('setFilter')
     }
    toggleFiltersButton() {
      this.$emit('toggle-filters');
    },
    showFilters(type) {
      this.$emit('show-filters', type);
    },
    toggleUsers() {
      this.$emit('toggle-users');
    },
    applyFilters() {
      this.$emit('apply-filters');
    }
  }
}
</script>

<style scoped>

</style>