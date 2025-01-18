<template>
    <div>
      <header class="header">
        <div class="first-flex">
          <div class="f-flex-logo">
            <p>Sofii</p>
          </div>
          <div class="f-flex-search">
            <font-awesome-icon icon="search" />
            <input type="search" placeholder="Search Users, Posts, Videos....." />
          </div>
        </div>
  
        <div class="responsive-aside-open">
          <font-awesome-icon icon="bars" />
        </div>
  
        <div class="m-flex-nav-items">
          <div class="icon-div home">
            <font-awesome-icon icon="home" />
          </div>
          <div class="icon-div create">
            <font-awesome-icon icon="plus" />
          </div>
        </div>
  
        <div class="second-flex">
          <div class="s-flex-user">
            <div class="icon-div notifications">
              <font-awesome-icon icon="bell" />
              <div class="not-readed"></div>
            </div>
            <div class="icon-div chat">
              <font-awesome-icon icon="comment" />
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
          <font-awesome-icon icon="home" />
        </div>
        <div
          class="rsb-i"
          :class="{ on: activePage === 'watch' }"
        >
          <font-awesome-icon icon="tv" />
        </div>
        <div
          class="rsb-i"
          :class="{ on: activePage === 'create' }"
        >
          <font-awesome-icon icon="plus" />
        </div>
        <div
          class="rsb-i"
          :class="{ on: activePage === 'notifications' }"
        >
          <font-awesome-icon icon="bell" />
        </div>
        <div
          class="rsb-i"
          :class="{ on: activePage === 'chat' }"
        >
          <font-awesome-icon icon="comment-dots" />
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
  