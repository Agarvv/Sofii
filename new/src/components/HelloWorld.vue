<template>
  <div>
    <div v-if="showNotification" class="notification">
      <NotificationCard 
        :notification="notification" 
        :nonReadedNotifications="nonReadedNotifications" 
        @notificationClosed="hideNotification"
      />
    </div> 

    <HeaderComponent :activePage="'home'" @showAside="showAside" />
  
    <div v-show="showSearchBox" id="search" class="search-box">
      <div class="search-icons">
        <font-awesome-icon @click="closeSearch()" id="close-search" icon="close" />
      </div>
      
      <div class="input">
        <input v-model="searchQ" type="search" placeholder="Search">
        <div class="input-icons">
          <div @click="handleSearch()">
            <font-awesome-icon icon="fas fa-search" />
          </div>
          <font-awesome-icon icon="fas fa-microphone" />
        </div>
      </div>
    </div>
    
    <LoadingComponent v-if="loading" message="Getting Posts, Please Wait..." />
      
      
    <ErrorComponent v-if="error" :error="error"/>
        
        
   

    <div class="container">
    
        <SidebarComponent v-if="showSidebar" activePage="home"/>
    
      <main>
        <div v-if="posts.length > 0" class="posts">
          <div v-for="post in posts" :key="post.id" class="post">
            <PostCard :post="post"/> 
          </div>
        </div>
        <div class="no-content" v-if="posts.length == 0 && !loading">
          <p style="color: gray">There Is No Content Available... <a href="/create">Create!</a></p>
        </div>
      </main>

      <div class="right-aside">
        <div class="users-might-like">
          <div class="users-header">
            <h3>You Might Like</h3>
          </div>
          <div class="us-users">
            <div v-for="user in recommendedUsers" :key="user.id" class="us-user">
              <HomePageUserMustLike :user="user"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './HeaderComponent'
import SidebarComponent from './SidebarComponent'
import PostCard from './PostCard'
import NotificationCard from './NotificationCard'
import HomePageUserMustLike from './HomePageUserMustLike'
import ErrorComponent from './ErrorComponent'
import LoadingComponent from './LoadingComponent'


import goToRoute from '../helpers/goToRoute'
import { getPosts, checkIfUserLikedPost, checkIfUserSavedPost } from '../services/postService'
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HelloWorld',
  components: {
    HeaderComponent,
    SidebarComponent,
    PostCard,
    NotificationCard,
    HomePageUserMustLike,
    ErrorComponent,
    LoadingComponent
  }, 
  computed: {
    ...mapGetters(['user'])  
  },
  data() {
    return {
      posts: [],
      recommendedUsers: [],
      searchQ: "",
      showSearchBox: false,
      showSidebar: window.innerWidth > 768,
      error: "",
      postsById: {},
      showNotification: false,
      notification: {},
      nonReadedNotifications: {},
      loading: true
    };
  },
  methods: {
    ...mapActions(['fetchUser']), 

    async servePage() {
      try {
        const data = await getPosts(this.user);
        this.posts = data.posts;
        this.recommendedUsers = data.users;
        this.nonReadedNotifications = data.nonReadedNotifications;
        
        this.postsById = {};
        this.posts.forEach(post => {
          this.postsById[post.id] = post;
        });
      } catch (e) {
         this.error = "Oops, Something Went Wrong..."
      } finally {
          this.loading = false
      }
    },

    goToPage(route) {
      goToRoute(this.$router, route);
    }, 

    handleSearch() {
      this.$router.push('/search/' + this.searchQ);
    },

    hideNotification() {
      this.showNotification = false;
    },

    showAside() {
        alert('called')
      this.showSidebar = !this.showSidebar;
    },

    handleResize() {
      this.showSidebar = window.innerWidth > 768; // Ajusta según el ancho
    }
  },
  async created() {
    await this.fetchUser(); 
    if (this.user) {
      await this.servePage();
    } else {
      return
    }

    this.$socket.on('createdPost', async newPost => {
      newPost.isLiked = await checkIfUserLikedPost(newPost);
      newPost.isSaved = await checkIfUserSavedPost(newPost);
      this.posts.push({ ...newPost });
      this.postsById[newPost.id] = newPost;
    });

    this.$socket.on('likePost', newLike => {
      const postTarget = this.postsById[newLike.post_id];
      if (postTarget) {
        postTarget.postLikes.push({ ...newLike });
      } else {
        console.warn(`Post con ID ${newLike.post_id} no encontrado.`);
      }
    });

    this.$socket.on('unlikePost', like => {
      const postTarget = this.postsById[like.post_id];
      if (postTarget) {
        postTarget.postLikes = postTarget.postLikes.filter(l => l.id !== like.id);
      } else {
        console.warn(`Post con ID ${like.post_id} no encontrado.`);
      }
    });

    this.$socket.on('savedPost', saved => {
      const postTarget = this.postsById[saved.post_id];
      if (postTarget && saved.user_id === this.user.id) {
        postTarget.isSaved = true; // Actualizar solo si es para el usuario actual
        postTarget.saved_post.push(saved);
      }
    });

    this.$socket.on('unsavedPost', saved => {
      const postTarget = this.postsById[saved.post_id];
      if (postTarget) {
        postTarget.saved_post = postTarget.saved_post.filter(s => 
          !(s.user_id === saved.user_id && s.post_id === saved.post_id)
        );
        if (saved.user_id === this.user.id) {
          postTarget.isSaved = false;
        }
      }
    });

    this.$socket.on('newNotification', notification => {
      this.notification = notification;
      this.showNotification = true;

      if (this.hideNotificationInterval) {
        clearInterval(this.hideNotificationInterval);
      }

      this.hideNotificationInterval = setTimeout(() => {
        this.showNotification = false;
      }, 5000);
    });

    window.addEventListener('resize', this.handleResize); // Escuchar cambios de tamaño
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize); // Limpiar listener
  }
};
</script>

<style scoped>
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #f5f5f5; /* Fondo suave para la página */
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

}

img {
    object-fit: cover;
}

.search-box {
    background: white;
}



.container {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    min-height: 100vh;
    width: 100%;
}

.container aside,
.right-aside {
    border: none; /* Sin borde */
    background: #fff; /* Fondo blanco */
    padding: 10px;
    border-radius: 8px; /* Bordes redondeados */
}

.container main {
    min-height: 100%;
    padding: 15px;
}

.main-header {
    width: 100%;
    border-bottom: 1px solid #ccc; /* Línea más sutil */
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
}

.main-header .friends, 
.watch,
.create,
.notifications {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.main-header i {
  font-size: 20px;
}

.posts {
    height: 100%;
    width: 100%;
}

.posts .post {
    padding: 15px;
    border-bottom: 1px solid #eee; /* Línea más ligera */
    display: flex;
    flex-direction: column;
    background: #fff; /* Fondo blanco para los posts */
    border-radius: 8px; /* Bordes redondeados */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    margin-bottom: 20px; /* Espacio entre posts */
}

.post .post-header {
    display: flex;
    gap: 10px;
    align-items: center;
}

.post .post-header .username {
    flex: 1; /* Permite que el nombre de usuario ocupe todo el espacio disponible */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.post .post-button-ellipsis {
    display: flex;
    align-items: top;
    justify-content: flex-end;
    width: auto;
}

.post-description {
    margin-bottom: 15px;
    color: #333; /* Color de texto más oscuro */
}

.post-image img {
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
    border-radius: 8px; /* Bordes redondeados para imágenes */
}

.post-image {
    margin-bottom: 20px;
}

.post-interactions {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 15px 0;
    border-top: 1px solid #eee; /* Separador superior */
    color: #555; /* Color de los íconos de interacción */
}

.post-interactions i {
  font-size: 25px;
}

/* Ejemplo de media query básico */
@media (max-width: 600px) {
  .container {
    grid-template-columns: 1fr;
  }
  
  aside {
    display: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background: white;
  }
  
  .right-aside {
    display: none;
  }
}

aside .aside-logo {
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 10px;
}

aside .aside-logo i {
  font-size: 30px;
}

.aside-links {
  height: 92.5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
}

.aside-links li {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 700;
  padding: 10px;
  border-radius: 4px; /* Bordes redondeados */
  transition: background 0.3s, color 0.3s;
}

.aside-links li:hover {
  background: #051AFF;
  color: white;
}

.right-aside .users-might-like {
  width: 100%;
  height: 350px;
  padding: 10px;
  background: #fff; /* Fondo blanco */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  border-radius: 8px; /* Bordes redondeados */
}

.users-might-like {
  display: flex;
  flex-direction: column;
}

.users-might-like .user img {
  width: 30px;
  height: 30px;
  border-radius: 100%;
}

.users-might-like .user {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.follow-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.follow-btn button {
  width: auto;
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  background-color: #051AFF;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.follow-btn button:hover {
  background-color: #0000ff;
}

.search-box {
  background: white;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #ccc;
}



.search-box .search-icons {
  font-size: 30px;
  padding: 15px;
}

.search-box .input {
  flex-grow: 1;
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
}

.search-box .input input {
  width: calc(100% - 70px); /* Ajusta el ancho para dejar espacio a los íconos */
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding-left: 10px;
}

.search-box .input-icons {
  position: absolute;
  right: 10px;
  font-size: 25px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.notification {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
}

.no-content {
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>

