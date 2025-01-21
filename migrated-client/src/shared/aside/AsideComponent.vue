<template>
  <aside id="aside">
    <div class="aside-logo">
      <i id="close-sidebar" class="fas fa-bars"></i>
      <h1>Sofii</h1>
    </div>
    <div class="aside-links">
      <ul class="f-row">
        <li 
          class="home" 
          :class="{ on: activePage === 'home' }" 
          @click="goToPage('home')"
        >
          <i class="fas fa-home"></i><span>Home</span>
        </li>
        <li 
          class="chats" 
          :class="{ on: activePage === 'chats' }" 
          @click="goToPage('chats')"
        >
          <i class="fas fa-comment-alt"></i><span>Messages</span>
        </li>
        <li 
          class="friends" 
          :class="{ on: activePage === 'friends' }" 
          @click="goToPage('friends')"
        >
          <i class="fas fa-user-friends"></i><span>Friends</span>
        </li>
        <li 
          class="watch" 
          :class="{ on: activePage === 'watch' }" 
          @click="goToPage('watch')"
        >
          <i class="fas fa-hashtag"></i><span>Explore</span>
        </li>
        <li 
          class="saved" 
          :class="{ on: activePage === 'saved' }" 
          @click="goToPage('saved')"
        >
          <i class="fas fa-bookmark"></i><span>Saved</span>
        </li>
        <li 
          class="user" 
          :class="{ on: activePage === 'user' }" 
          @click="goToPage('userDetails')"
        >
          <i class="fas fa-user"></i><span>Profile</span>
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
           default: "home"
           }
        }
    })
</script>

<style scoped src="./AsideComponent.css"></style>