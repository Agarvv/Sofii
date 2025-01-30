<template>
  <div>
    <header class="header">
      <div class="first-flex">
        <div class="f-flex-logo">
          <p>Sofii</p>
        </div>
        <div class="f-flex-search">
          <i class="fas fa-search"></i>
          <input type="search" placeholder="Search Users, Posts, Videos....." />
        </div>
      </div>

      <div class="m-flex-nav-items">
        <div class="icon-div home">
          <i class="fas fa-home"></i>
        </div>
        <div class="icon-div create">
          <i class="fas fa-plus"></i>
        </div>
      </div>

      <div class="second-flex">
        <div class="s-flex-user">
          <div class="icon-div notifications">
            <i class="fas fa-bell"></i>
            <div class="not-readed"></div>
          </div>
          <div class="icon-div chat">
            <i class="fas fa-comment"></i>
          </div>
          <div class="user-img">
            <img
              style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover;"
              src="soon"
              alt="User Profile Picture"
            />
          </div>
        </div>
      </div>
    </header>

    <div class="responsive-sub-header">
      <div
        class="rsb-i"
        :class="{ on: activePage === 'home' }"
      >
        <i class="fas fa-home"></i>
      </div>
      <div
        class="rsb-i"
        :class="{ on: activePage === 'watch' }"
      >
        <i class="fas fa-tv"></i>
      </div>
      <div
        class="rsb-i"
        :class="{ on: activePage === 'create' }"
      >
        <i class="fas fa-plus"></i>
      </div>
      <div
        class="rsb-i"
        :class="{ on: activePage === 'notifications' }"
      >
        <i class="fas fa-bell"></i>
      </div>
      <div
        class="rsb-i"
        :class="{ on: activePage === 'chat' }"
      >
        <i class="fas fa-comment-dots"></i>
      </div>
    </div>
    
    
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'HeaderComponent',
  props: {
    activePage: {
      type: String as PropType<'home' | 'watch' | 'create' | 'notifications' | 'chat'>,
      required: false,
      value: 'home'
    },
  },
});
</script>

<style src="./Header.css"></style>
