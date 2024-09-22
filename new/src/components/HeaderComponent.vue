<template>
  <header class="header">
    
   <div class="first-flex">
     <div @click="goToPage('/')" class="f-flex-logo">
       <p>Sofii</p>
     </div>
     <div class="f-flex-search">
       <font-awesome-icon @click="handeSearch" icon="search"/>
       <input v-model="searchQ" type="search" placeholder="Search Users, Posts, Videos.....">
     </div>
   </div>
   
   <div @click="showAside" class="responsive-aside-open">
     <div>
       <font-awesome-icon icon="bars"/>
     </div>
   </div>
   
    <div class="m-flex-nav-items">
       <div @click="goToPage('/')" id="iconDiv" class="home">
         <font-awesome-icon icon="home"/>
       </div>
        <div @click="goToPage('/create')" id="iconDiv" class="create">
         <font-awesome-icon icon="plus"/>
       </div>

     </div>
   
   <div class="second-flex">
     <div class="s-flex-user">
       <div @click="goToPage('/notifications')" id="iconDiv" class="notifications">
         <i class="fa fa-bell"></i>
         <font-awesome-icon icon="bell"/>
         <div class="not-readed">
           <p>0</p>
         </div>
       </div>
       <div @click="goToPage('/chats')" id="iconDiv" class="chat">
        <i class="fa fa-comment"></i>
        <font-awesome-icon icon="comment"/> 
       </div>
       <div @click="goToPage('/user/' + user.user_id)" class="user-img">
         <img style="
         width: 45px;
         height: 45px;
         border-radius: 50%;
         object-fit: cover;
         " :src="user.user_picture ? 'http://localhost:3000/' + user.user_picture
         : '/images/default.jpeg'
         ">
       </div>
     </div>
   </div>
  </header>
  
    <div class="responsive-sub-header">
    <div @click="goToPage('/')" class="rsb-i" :class="{ on: activePage === 'home'}">
      <i class="fa fa-home"></i>
      <font-awesome-icon icon="home" />
    </div>
    <div @click="goToPage('/watch')" class="rsb-i" :class="{ on: activePage === 'watch' }">
      <i class="fa fa-tv"></i>
      <font-awesome-icon icon="tv" />
    </div>
    <div @click="goToPage('/create')" class="rsb-i" :class="{ on: activePage === 'create'}">
      <i class="fa fa-plus"></i>
      <font-awesome-icon icon="plus" />
    </div>
    <div @click="goToPage('/notifications')" class="rsb-i" :class="{ on: activePage === 'notifications' }">
      <i class="fa fa-bell"></i>
      <font-awesome-icon icon="bell" />
    </div>
    <div @click="goToPage('/chats')" class="rsb-i" :class="{ on : activePage === 'chat' }">
      <i class="fa fa-comment-dots"></i>
      <font-awesome-icon icon="comment-dots" />
    </div>
  </div>

</template>

<script>
import goToRoute from '../helpers/goToRoute'
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
          this.$router.push(route)
      },
      handeSearch() {
        this.$router.push('/search/' + this.searchQ)
      },
      showAside() {
        this.$emit('showAside')
      }
  },
  mounted() {
    console.log('use rstate', this.user)
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
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center; 
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 5px 5px  6px rgba(0, 0, 0, 0.5);
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
  padding: 10px;
  border-radius: 15px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra interna */
}

.f-flex-search input {
  background: #e5e5e5;
  border: none;
  outline: none;
  padding-left: 10px;
  color: #333;
}

.header .second-flex {
  display: flex;
  align-items: center; 
  gap: 20px;
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
  font-size: 15px;
}

#iconDiv {
  background: #007bff; /* Azul vibrante para los íconos */
  color: white;
  padding: 10px;
  border-radius: 50%; /* Perfecto círculo */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave */
  transition: background 0.3s ease, transform 0.3s ease; /* Transición para animación */
}

#iconDiv:hover {
  background: #0056b3; /* Cambio de color al pasar el mouse */
  transform: scale(1.1); /* Aumenta ligeramente el tamaño al pasar el mouse */
}

.s-flex-user .user-img img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra para la imagen */
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

/* Media query para dispositivos pequeños */
@media (max-width: 639px) {
  .second-flex {
    display: none!important;
  }
  
  
  .m-flex-nav-items {
    display: none;
  }
  
  .responsive-aside-open {
    display: block;
  }
  
  .responsive-sub-header {
    display: grid;
  }
  
}
</style>