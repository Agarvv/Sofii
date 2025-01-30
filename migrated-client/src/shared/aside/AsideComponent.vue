<template>
  <aside id="aside">
    <div class="aside-logo">
      <i id="close-sidebar" class="fas fa-bars"></i>
      <h1>Sofii</h1>
    </div>
    <div class="aside-links">
      <ul class="f-row">
        <li class="home" :class="{ on: activePage === 'home' }">
          <router-link to="/">
            <i class="fas fa-home"></i><span>Home</span>
          </router-link>
        </li>
        <li class="chats" :class="{ on: activePage === 'chats' }">
          <router-link to="/chats">
            <i class="fas fa-comment-alt"></i><span>Messages</span>
          </router-link>
        </li>
        <li class="friends" :class="{ on: activePage === 'friends' }">
          <router-link to="/friends">
            <i class="fas fa-user-friends"></i><span>Friends</span>
          </router-link>
        </li>
        <li class="watch" :class="{ on: activePage === 'watch' }">
          <router-link to="/search/a">
            <i class="fas fa-hashtag"></i><span>Explore</span>
          </router-link>
        </li>
        <li class="saved" :class="{ on: activePage === 'saved' }">
          <router-link to="/saved">
            <i class="fas fa-bookmark"></i><span>Saved</span>
          </router-link>
        </li>
        <li class="user" :class="{ on: activePage === 'user' }">
          <router-link to="/profile/s">
            <i class="fas fa-user"></i><span>Profile</span>
          </router-link>
        </li>
      </ul>
      <div class="second-row">
        <ul class="s-row">
          <li>
              <i class="fas fa-gear"></i><span>Settings</span>
          </li>
          <li>
              <i class="fas fa-info"></i><span>Info</span>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AsideComponent',
  props: {
    activePage: {
      type: String,
      default: 'home',
    },
  },
});
</script>

<style scoped src="./AsideComponent.css"></style>
