<template>
  <div>
    <header class="header">
      <div class="first-flex">
        <div class="f-flex-logo">
          <p>Sofii</p>
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
          <div class="icon-div profile">
             <i class="fa fa-user"></i>
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
        :class="{ on: activePage === 'saved' }"
      >
        <i class="fa fa-bookmark"></i>
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
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HeaderComponent',
  props: {
    activePage: {
      type: String as PropType<'home' | 'watch' | 'create' | 'notifications' | 'chat'>,
      required: false,
      value: 'home'
    },
  },
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    search() {
      const router = useRouter();
      if (this.searchQuery) {
        router.push(`/search/${this.searchQuery}`);
      }
    }
  }
});
</script>

<style src="./Header.css"></style>