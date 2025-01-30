<template>
  <div>
    <header class="header">
      <div class="first-flex">
        <div class="f-flex-logo">
          <router-link to="/"> 
            <p>Sofii</p>
          </router-link>
        </div>
        <div class="f-flex-search">
          <i @click="search" class="fas fa-search"></i>
          <input
            type="search"
            v-model="searchQuery"
            @keydown.enter="search"
            placeholder="Search Users, Posts, Videos....."
          />
        </div>
      </div>

      <div class="m-flex-nav-items">
        <router-link to="/" class="icon-div home">
          <i class="fas fa-home"></i>
        </router-link>
        <router-link to="/create" class="icon-div create">
          <i class="fas fa-plus"></i>
        </router-link>
      </div>

      <div class="second-flex">
        <div class="s-flex-user">
          <router-link to="/notifications" class="icon-div notifications">
            <i class="fas fa-bell"></i>
            <div class="not-readed"></div>
          </router-link>
          <router-link to="/chats" class="icon-div chat">
            <i class="fas fa-comment"></i>
          </router-link>
          <router-link to="/profile/s" class="icon-div profile">
            <i class="fa fa-user"></i>
          </router-link>
        </div>
      </div>
    </header>

    <div class="responsive-sub-header">
      <router-link to="/" class="rsb-i" :class="{ on: activePage === 'home' }">
        <i class="fas fa-home"></i>
      </router-link>
      <router-link to="/saved" class="rsb-i" :class="{ on: activePage === 'saved' }">
        <i class="fa fa-bookmark"></i>
      </router-link>
      <router-link to="/create" class="rsb-i" :class="{ on: activePage === 'create' }">
        <i class="fas fa-plus"></i>
      </router-link>
      <router-link to="/notifications" class="rsb-i" :class="{ on: activePage === 'notifications' }">
        <i class="fas fa-bell"></i>
      </router-link>
      <router-link to="/chats" class="rsb-i" :class="{ on: activePage === 'chat' }">
        <i class="fas fa-comment-dots"></i>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HeaderComponent',
  props: {
    activePage: {
      type: String,
      required: false,
      default: 'home'
    },
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    search() {
      if (this.searchQuery) {
        this.$router.push(`/search/${this.searchQuery}`);
      }
    }
  }
});
</script>

<style src="./Header.css"></style>
