<template>
  <div id="app">
    <header>
      <div class="logo">
        <h1>Sofii</h1>
      </div>
      <div class="icons">
        <font-awesome-icon id="open-search" icon="search" />
        <font-awesome-icon id="open-sidebar" icon="bars" />
        <div class="user-img">
          <img src="logo.png" alt="User Image">
        </div>
      </div>
    </header>

    <div id="search" class="search-box">
      <div class="search-icons">
        <font-awesome-icon id="close-search" icon="fas fa-arrow-left" />
      </div>
      <div class="input">
        <input type="search" placeholder="Search">
        <div class="input-icons">
          <font-awesome-icon icon="fas fa-search" />
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
          <div class="friends"><font-awesome-icon icon="user-friends" /><p>Friends</p></div>
          <div class="watch"><font-awesome-icon icon="tv" /><p>Watch</p></div>
          <div class="create"><font-awesome-icon icon="plus" /><p>Create</p></div>
          <div class="notifications"><font-awesome-icon icon="bell" /><p>Notifications</p></div>
        </div>
        <div class="posts">
          <div v-for="post in posts" :key="post.id" class="post">
            <div class="post-header">
              <div class="post-user-img">
                <img :src="post.userImage" style="width: 50px; border-radius: 50%">
              </div>
              <div class="post-user-detail">
                <h4>{{ post.userName }}</h4>
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
              <div class="post-image">
                <img :src="post.image" alt="Post Image">
              </div>
            </div>
            <div class="post-interactions">
              <div class="like"><font-awesome-icon icon="fas fa-thumbs-up" /></div>
              <div class="comment"><font-awesome-icon icon="fas fa-comment" /></div>
              <div class="save"><font-awesome-icon icon="fas fa-bookmark" /></div>
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
      posts: []
    };
  },
  methods: {
    async getPosts() {
      try {
        const response = await fetch('http://localhost:3000/api/sofi/posts');
        if (!response.ok) {
          console.error('Oops, Something Went Down Here!');
          return;
        }
        const data = await response.json();
        this.posts = data.posts;
      } catch (e) {
        console.error(e);
      }
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
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #42445A;
    padding: 15px;
    color: white;
    position: relative;
    top: 0;
    left: 0;
    width: 100;
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

.container {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    min-height: 100vh;
    width: 100%;
}

.container aside {
  border: 1px solid black;
}


.container main {
    min-height: 100%;
    padding: 15px;
  
}


.right-aside {
     border: 1px solid black;
  
}





.main-header {
    width: 100%;
    border-bottom: .3px solid gray;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    border-bottom: 3px solid gray;
    display: flex;
    flex-direction: column;
}

.post .post-header {
    display: flex;
    gap: 5px;
}

.post .post-button-ellipsis {
    display: flex;
    align-items: top;
    justify-content: right;
    width: 100%;
    padding: 10px;
}

.post-description {
    margin-bottom: 15px;
}

.post-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.post-image {
    margin-bottom: 20px;
}

.post-interactions {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 15px;
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
  border: 1px solid black;
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 10px;
}

aside .aside-logo i {
  font-size: 30px;
}


.aside-links {
  border: 2px solid blue;
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
}

.aside-links li:hover {
  background: #051AFF;
  color: white;
}


.aside-links .f-row li {
  padding: 20px;
  
}

.s-row li {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
}



.right-aside .users-might-like {
  border: 1px solid red;
  width: 100%;
  height: 350px;


}

.users-might-like {
  display: flex;
  flex-direction: column;
}

.users-might-like .user img {
  width: 30px;
  height: 100%;
  border-radius: 100%;
}

.users-might-like .user {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  gap: 5px;
  padding: 20px;
}


.users-might-like {
  border: 1px solid black;

}

.follow-btn {
  width: 10%;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
}

.follow-btn button {
 width: 60px;
  
}

.search-box {
  background: red;
  width: 100%;
  height: 80px;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  visibility: hidden; /* Inicialmente oculto */
}

.search-box.show {
  visibility: visible;
  opacity: 1;
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
  border: none;
  outline: none;
  background-color: white;
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