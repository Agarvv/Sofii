<template>
  <header>
    <div class="logo">
      <h1>Sofii</h1>
      <p style="color: gray">By Agarvv</p>
    </div>

    <div class="middle-header">
      <div @click="goToPage('/')" class="home">
        <font-awesome-icon icon="home" />
      </div>
      <div @click="goToPage('/create')">
        <font-awesome-icon icon="plus" />
      </div>
      <div @click="goToPage('/watch')">
        <font-awesome-icon icon="tv" />
      </div>
    </div>

    <div class="final-header">
      <div @click="goToPage('/notifications')">
        <font-awesome-icon icon="bell" />
      </div>
      <div @click="goToPage('/chats')">
        <font-awesome-icon icon="comments" />
      </div>
      <div @click="goToPage('/user/' + user.user_id)">
        <img
          style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover"
          :src="'http://localhost:3000/' + user.user_picture"
          alt="Profile Picture"
        />
      </div>
    </div>

    <div class="responsive-sidebar-open">
      <font-awesome-icon icon="bars" />
    </div>
  </header>

  <div class="responsive-sub-header">
    <div @click="goToPage('/')" class="rsb-i" :class="{ on: activePage === 'home'}">
      <font-awesome-icon icon="home" />
    </div>
    <div @click="goToPage('/watch')" class="rsb-i" :class="{ on: activePage === 'watch' }">
      <font-awesome-icon icon="tv" />
    </div>
    <div @click="goToPage('/create')" class="rsb-i" :class="{ on: activePage === 'create'}">
      <font-awesome-icon icon="plus" />
    </div>
    <div @click="goToPage('/notifications')" class="rsb-i" :class="{ on: activePage === 'notifications' }">
      <font-awesome-icon icon="bell" />
    </div>
    <div @click="goToPage('/chats')" class="rsb-i" :class="{ on : activePage === 'chat' }">
      <font-awesome-icon icon="comment-dots" />
    </div>
  </div>
</template>

<script>
import goToRoute from '../helpers/goToRoute'


export default {
  name: "HeaderComponent",
  props: {
    activePage: {
      type: String,
      required: false,
      default: "home"
    },
    user: {
        type: Object,
        required: true
    }
  },
  methods: {
      goToPage(route) {
          this.$router.push(route)
      }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

header {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

header .middle-header,
.final-header {
  display: flex;
}

.middle-header {
  gap: 50px;
}

.middle-header div {
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.final-header {
  gap: 5px;
  align-items: center;
  justify-content: center;
}

.final-header div {
  font-size: 25px;
}

/* Icono para abrir el sidebar, inicialmente oculto */
.responsive-sidebar-open {
  display: none;
}

.responsive-sub-header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  display: none; /* Ocultar por defecto */
}

.responsive-sub-header div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  font-size: 25px;
}

.rsb-i.on {
  border-bottom: 5px solid blue;
  color: blue;
}

/* Media query para pantallas pequeñas */
@media (max-width: 600px) {
  header {
    flex-direction: row; /* Mantenemos el flex en fila */
    justify-content: space-between; /* Mantenemos el espacio entre logo y icono */
    align-items: center; /* Centrado vertical de los elementos */
  }

  /* Ocultar middle-header y final-header en pantallas pequeñas */
  .middle-header,
  .final-header {
    display: none !important;
  }

  /* Mostrar icono del sidebar */
  .responsive-sidebar-open {
    display: flex;
    align-items: center;
    font-size: 30px; /* Tamaño del icono */
    cursor: pointer; /* Indicador de que es clicable */
  }

  /* Mostrar el sub-header en pantallas pequeñas */
  .responsive-sub-header {
    display: grid;
  }

  /* Ajustes en el logo */
  .logo {
    flex-grow: 1; /* Para que el logo ocupe todo el espacio disponible */
  }

  .logo h1 {
    font-size: 20px;
  }

  .logo p {
    font-size: 12px;
  }
}
</style>