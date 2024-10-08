<template>
<div> 
  <header class="header">
    <div class="first-flex">
      <div @click="goToPage('/')" class="f-flex-logo">
        <p>Sofii</p>
      </div>
      <div class="f-flex-search">
        <font-awesome-icon @click="handeSearch" icon="search" />
        <input v-model="searchQ" type="search" placeholder="Search Users, Posts, Videos....." />
      </div>
    </div>
    
    
    <div class="responsive-aside-open" @click="showAside">
      <font-awesome-icon icon="bars" />
    </div>

    <div class="m-flex-nav-items">
      <div @click="goToPage('/')" id="iconDiv" class="home">
        <font-awesome-icon icon="home" />
      </div>
      <div @click="goToPage('/create')" id="iconDiv" class="create">
        <font-awesome-icon icon="plus" />
      </div>
    </div>

    <div class="second-flex">
      <div class="s-flex-user">
        <div @click="goToPage('/notifications')" id="iconDiv" class="notifications">
            
          <font-awesome-icon icon="bell" />
          <div class="not-readed">
        
          </div>
        </div>
        <div @click="goToPage('/chats')" id="iconDiv" class="chat">
          <i class="fa fa-comment"></i>
          <font-awesome-icon icon="comment" />
        </div>
        <div @click="goToPage('/user/' + user.user_id)" class="user-img">
          <img
            style="
              width: 45px;
              height: 45px;
              border-radius: 50%;
              object-fit: cover;
            "
            :src="user.user_picture || '/images/default.jpeg'"
          />
        </div>
      </div>
    </div>
  </header>

  <div class="responsive-sub-header">
    <div @click="goToPage('/')" class="rsb-i" :class="{ on: activePage === 'home' }">
      <font-awesome-icon icon="home" />
    </div>
    <div @click="goToPage('/watch')" class="rsb-i" :class="{ on: activePage === 'watch' }">
     
      <font-awesome-icon icon="tv" />
    </div>
    <div @click="goToPage('/create')" class="rsb-i" :class="{ on: activePage === 'create' }">
     
      <font-awesome-icon icon="plus" />
    </div>
    <div @click="goToPage('/notifications')" class="rsb-i" :class="{ on: activePage === 'notifications' }"> 
          <font-awesome-icon icon="bell" />
    </div>
     
     
      
      
     <div @click="goToPage('/chats')" class="rsb-i" :class="{ on: activePage === 'chat' }">
      
      <font-awesome-icon icon="comment-dots" />
    </div>
      
    </div>
    
  </div>
</template>

<script>
import goToRoute from '../helpers/goToRoute';
import { mapGetters } from 'vuex';

export default {
  name: "HeaderComponent",
  computed: {
    ...mapGetters(['user'])
  },
  props: {
    activePage: {
      type: String,
      required: false,
      default: "home"
    },
    nonReadedNotifications: {},
    data() {
      return {
        searchQ: ""
      }
    }
  },
  methods: {
    goToPage(route) {
      this.$router.push(route);
    },
    handeSearch() {
      this.$router.push('/search/' + this.searchQ);
    },
    showAside() {
      this.$emit('showAside');
    }
  },
  mounted() {
    console.log('use rstate', this.user);
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.header {
  background-color: #ffffff; /* Fondo blanco para el header */
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 5px 5px 6px rgba(0, 0, 0, 0.5);
}

.header .first-flex {
  display: flex;
  align-items: center;
  gap: 20px;
}

.first-flex .f-flex-logo p {
  font-weight: 800;
  font-size: 24px;
  color: #333; /* Color del logo */
}

.first-flex .f-flex-search {
  background: #e5e5e5;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 15px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra interna */
}

.f-flex-search input {
  background: #e5e5e5;
  border: none;
  outline: none;
  padding-left: 5px;
  color: #333;
}

.header .second-flex {
  display: flex;
  align-items: center;
  gap: 10px;
}

.s-flex-user {
  display: flex;
  align-items: center;
  gap: 15px;
}

.m-flex-nav-items {
  display: flex;
  gap: 20px;
}

.responsive-aside-open {
  display: none;
  font-size: 20px; 
  cursor: pointer;
  color: #007bff; 
  padding: 5px;
  border-radius: 50%; 
  transition: background 0.3s, color 0.3s; 
}

.responsive-aside-open:hover {
  background: rgba(0, 123, 255, 0.1); 
  color: #0056b3;
}

.s-flex-user .user-img img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
}

.responsive-sub-header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  display: none;
}

.responsive-sub-header div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  font-size: 20px;
}

.rsb-i.on {
  border-bottom: 5px solid blue;
  color: blue;
}


@media (max-width: 700px) {
  .second-flex {
    display: none!important;
  }

  .m-flex-nav-items {
    display: none;
  }

  .responsive-aside-open {
    display: block!important;
  }

  .responsive-sub-header {
    display: grid;
  }
}
</style>