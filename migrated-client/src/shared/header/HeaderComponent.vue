<template>
  <div>
    <header class="header">
      <div class="first-flex">
        <div class="f-flex-logo">
          <p>Sofii</p>
        </div>
        <div class="f-flex-search">
          <i class="fas fa-search" @click="search"></i>
          <input 
            type="search" 
            placeholder="Search Users, Posts, Videos....." 
            v-model="searchQuery"
            @keyup.enter="search"
          />
        </div>
      </div>

      <div class="m-flex-nav-items">
        <div class="icon-div home">
          <router-link to="/" exact><i class="fas fa-home"></i></router-link>
        </div>
        <div class="icon-div create">
          <router-link to="/create"><i class="fas fa-plus"></i></router-link>
        </div>
      </div>

      <div class="second-flex">
        <div class="s-flex-user">
          <div class="icon-div notifications">
            <router-link to="/notifications">
              <i class="fas fa-bell"></i>
              <div class="not-readed"></div>
            </router-link>
          </div>
          <div class="icon-div chat">
            <router-link to="/chats"><i class="fas fa-comment"></i></router-link>
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
      <div class="rsb-i">
        <router-link to="/"><i class="fas fa-home"></i></router-link>
      </div>
      <div class="rsb-i">
        <router-link to="/saved"><i class="fa fa-bookmark"></i></router-link>
      </div>
      <div class="rsb-i">
        <router-link to="/create"><i class="fas fa-plus"></i></router-link>
      </div>
      <div class="rsb-i">
        <router-link to="/notifications"><i class="fas fa-bell"></i></router-link>
      </div>
      <div class="rsb-i">
        <router-link to="/chats"><i class="fas fa-comment-dots"></i></router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HeaderComponent',
  setup() {
    const searchQuery = ref('');
    const router = useRouter();

    const search = () => {
      if (searchQuery.value.trim()) {
        router.push(`/search/${searchQuery.value.trim()}`);
      }
    };

    return { searchQuery, search };
  }
});
</script>

<style src="./Header.css"></style>