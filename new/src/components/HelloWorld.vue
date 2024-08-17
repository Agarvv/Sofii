
<template>
  <div id="app">
    <header>
      <div class="logo">
        <h1>Sofii</h1>
      </div>
      <div class="icons">
        <font-awesome-icon @click="openSearch()" id="open-search" icon="search" />
        <font-awesome-icon @click="openSidebar()"id="open-sidebar" icon="bars" />
        <div class="user-img">
          <img >
        </div>
      </div>
              
    </header>

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

    <div class="container">
      <aside id="aside">
        <div class="aside-logo">
          <font-awesome-icon id="close-sidebar" icon="fas fa-bars" />
          <h1>Sofii</h1>
        </div>
        <div class="aside-links">
          <ul class="f-row">
            <li><font-awesome-icon icon="home" /><span>Home</span></li>
            <li><font-awesome-icon icon="comment-alt" /><span>Messages</span></li>
            <li><font-awesome-icon icon="user-friends" /><span>Friends</span></li>
            <li><font-awesome-icon icon="hashtag" /><span>Explore</span></li>
            <li><font-awesome-icon icon="bookmark" /><span>Saved</span></li>
            <li><font-awesome-icon icon="user" /><span>Profile</span></li>
          </ul>
          <div class="second-row">
            <ul class="s-row">
              <li><font-awesome-icon icon="fas fa-gear" /><span>Settings</span></li>
              <li><font-awesome-icon icon="fas fa-info" /><span>Info</span></li>
            </ul>
          </div>
        </div>
      </aside>

      <main>
        <div class="main-header">
          <div @click="goToFriends()" class="friends"><font-awesome-icon icon="user-friends" /><p>Friends</p></div>
          <div @click="goToWatch()" class="watch"><font-awesome-icon icon="tv" /><p>Watch</p></div>
          <div @click="goToCreate()" class="create"><font-awesome-icon icon="plus" /><p>Create</p></div>
          <div @click="goToNotifications()"  class="notifications"><font-awesome-icon icon="bell" /><p>Notifications</p></div>
        </div>
        
        
        <div class="posts">
          <div v-for="post in posts" :key="post.id" class="post" >
              
              
            <div class="post-header">
              <div @click="goToUserPage(post.user.id)" class="post-user-img">
                <img style="width: 50px; height: 50px; border-radius: 50%" :src="'http://localhost:3000/' + post.user.profilePicture" alt="Post User Image">
              </div>
              <div class="post-user-detail">
                <h4>{{ post.user.username }}</h4>
                <p style="color: gray">{{ post.userHandle }}</p>
              </div>
              <div class="post-button-ellipsis">
                <font-awesome-icon icon="fas fa-ellipsis-h" />
              </div>
            </div>
            <div class="post-content">
              <div class="post-description">
                <p>{{ post.description }}</p>
              </div>
              <div @click="goToPostPage(post.id)" class="post-image">
                <img loading="lazy":src="'http://localhost:3000/' + post.postPicture" alt="Post Image">
              </div>
            </div>
            <div class="post-interactions">
              <div @click="likePost(post.id)" class="like"><font-awesome-icon icon="fas fa-thumbs-up" /> <span>{{post.postLikes.length}}</span>   </div>
              <div @click="goToPostPage(post.id)"class="comment"><font-awesome-icon icon="fas fa-comment" /> <span>{{post.postComments.length}}</span></div>
              <div @click="savePost(post.id)" class="save"><font-awesome-icon icon="fas fa-bookmark" /> <span>{{post.saved_post.length}}</span> </div>
              <div class="share"><font-awesome-icon icon="fas fa-share" /></div>
            </div>
            
            
            
          </div>
        </div>
        
        
      </main>

      <div class="right-aside">
        <div class="users-might-like">
          <div class="users-header">
            <h3>You Might Like</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      posts: [],
      searchQ: "",
      showSearchBox: false,
      showSidebar: false
    };
  },
  methods: {
    async getPosts() {
      try {
        const response = await fetch('http://localhost:3000/api/sofi/posts', {
          method: 'GET'
        });
        if (!response.ok) {
          console.error('Oops, Something Went Down Here!');
          return;
        }
        const data = await response.json();
        this.posts = data.posts;
        console.log(data.posts);
      } catch (e) {
        console.error(e);
      }
    },
    goToPostPage(post_id) {
      console.log(post_id);
      this.$router.push('/post/' + post_id);
    },
    handleSearch() {
      console.log('Handle Search Method Called.', this.searchQ);
      this.$router.push('/search/' + this.searchQ);
    },
    async likePost(post_id) {
      try {
        const response = await fetch('http://localhost:3000/api/sofi/like_content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ type: 'POST', post_id: post_id }),
          credentials: 'include'
        });
        const data = await response.json();
        console.log('Server like post data:', data);
      } catch (e) {
        console.error(e);
      }
    },
    async savePost(post_id) {
     const response = await fetch('http://localhost:3000/api/sofi/save_content', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
          },
         body: JSON.stringify({ type: 'POST', post_id: post_id }),
         credentials: 'include'
     })
     const data = await response.json()
     console.log('server data save: ', data)
    },
    goToFriends() {
        this.$router.push('/friends')
    },
    goToWatch() {
        this.$router.push('/watch')
    },
    goToCreate() {
        this.$router.push('/create')
    },
    goToNotifications() {
        this.$router.push('/notifications')
    },
    openSearch() {
        this.showSearchBox = true
    },
    closeSearch() {
        this.showSearchBox = false
    },
    openSidebar() {
        
    },
    goToUserPage(user_id) {
        this.$router.push('/user/' + user_id)
    }
  },
  created() {
    this.getPosts();
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

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #333;
    padding: 15px;
    color: white;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra sutil */
}

header .icons i {
    font-size: 30px;
}

header .icons {
    display: flex;
    align-items: center;
    gap: 10px;
}

header .icons .user-img img {
    width: 40px;
    border-radius: 50%;
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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
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


</style>

me gustaria tambien que no se toquen los src y esas cosas del template.