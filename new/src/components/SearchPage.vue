<template>
  <div>
    <header>
      <div class="logo">
        <h2>Sofii</h2>
      </div>
      <div class="search-input">
        <input type="search" v-model="searchQ" />
      </div>
      <div class="icons">
        <font-awesome-icon icon="search" />
        <font-awesome-icon icon="microphone" />
        <font-awesome-icon icon="filter" />
      </div>
    </header>

    <div class="container">
      <aside>
        <div class="aside-header">
          <div class="logo">
            <h1>Sofii</h1>
          </div>
        </div>
        <nav>
          <div class="aside-users">
            <div>
              <font-awesome-icon icon="user" />
              <span>Users</span>
            </div>
            <div>
              <font-awesome-icon icon="caret-down" />
            </div>
          </div>

          <div class="hidden-users" :style="{ display: showUsers ? 'block' : 'none' }">
            <div class="order-by-son">
              <div class="following">
                <label>Following</label>
                <input type="checkbox" />
              </div>
              <div class="friend">
                <label>Friend</label>
                <input type="checkbox" />
              </div>
              <div class="blocked">
                <label>Blocked</label>
                <input type="checkbox" />
              </div>
              <div class="followers">
                <label>Followers</label>
                <input type="number" />
              </div>
            </div>
          </div>

          <div class="aside-posts">
            <div>
              <font-awesome-icon icon="newspaper" />
              <span>Posts</span>
            </div>
            <div>
              <font-awesome-icon icon="caret-down" />
            </div>
          </div>

          <div class="hidden-posts" :style="{ display: showPosts ? 'block' : 'none' }">
            <div class="sort-options">
              <div class="latest">
                <label>Latest</label>
                <input type="radio" name="sort-posts" />
              </div>
              <div class="popular">
                <label>Popular</label>
                <input type="radio" name="sort-posts" />
              </div>
              <div class="trending">
                <label>Trending</label>
                <input type="radio" name="sort-posts" />
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <div class="content">
        <div v-for="user in content.users" :key="user.id" class="users">
          <h4>Users</h4>
          <div @click="goToUserPage(user.id)" class="user">
            <div class="user-details">
              <div class="user-img">
                <img :src="'http://localhost:3000/' + user.profilePicture" />
              </div>
              <div class="user-info">
                <h3>{{ user.username }}</h3>
                <p>{{ user.bio }}</p>
              </div>
            </div>
            <div class="follow-btn">
              <button>Follow</button>
            </div>
          </div>
        </div>

        <div v-for="post in content.posts" :key="post.id" class="posts">
          <h4>Posts</h4>
          <div @click="goToPostPage(post.id)" class="post">
            <div class="post-user">
              <div class="post-user-img">
                <img :src="'http://localhost:3000/' + post.user_img" />
              </div>
              <div class="post-user-details">
                <h3>{{ post.user_name }}</h3>
              </div>
            </div>
            <div class="post-info">
              <div class="post-details">
                <p>{{ post.description }}</p>
              </div>
              <div class="post-img">
                <img :src="'http://localhost:3000/' + post.postPicture" />
              </div>
            </div>
            <div class="post-interactions">
              <div class="like">
                <font-awesome-icon icon="heart"/>
                <p>167</p>
              </div>
              <div class="comment">
                <font-awesome-icon icon="comments"/>
                <p>12</p>
              </div>
              <div class="share">
                 <font-awesome-icon icon="share"/>
                <p>0</p>
              </div>
              <div class="save">
                <font-awesome-icon icon="bookmark"/>
                <p>4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQ: "",
      content: {},
      showUsers: false,
      showPosts: false,
    };
  },
  methods: {
    toggleUsers() {
      this.showUsers = !this.showUsers;
    },
    togglePosts() {
      this.showPosts = !this.showPosts;
    },
    goToUserPage(user_id) {
      this.$router.push('/user/' + user_id)
  }, 
  goToPostPage(post_id) {
      this.$router.push('/post/' + post_id)
  }
  
  },
  async mounted() {
    this.searchQ = this.$route.params.query;
    try {
      const response = await fetch('http://localhost:3000/api/sofi/search/' + this.$route.params.query, {
        method: 'POST',
      });

      if (!response.ok) {
        console.error('Something went wrong!');
        return;
      }

      const data = await response.json();
      this.content = data.results.results;
      console.log('Server data', this.content.posts);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  },
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
    box-sizing: border-box;
}

/* Header */
header {
    background-color: #ff6347;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    padding: 0 20px;
}

header .search-input {
    flex: 1;
    margin: 0 20px;
}

header .search-input input {
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 16px;
    border: 2px solid #ccc;
    border-radius: 20px;
    outline: none;
    transition: border-color 0.3s ease;
}

header .search-input input:focus {
    border-color: #ff6347;
}

header .icons {
    display: flex;
    gap: 10px;
    align-items: center;
}

header .icons i {
    font-size: 24px;
    color: white;
}

/* Contenedor principal */
.container {
    display: grid;
    grid-template-columns: 1.5fr 3fr;
    height: 100vh; /* Asegura que el contenedor ocupe el 100% del viewport height */
    gap: 20px;
    padding: 20px;
}

@media(max-width: 600px) {
    .container {
        grid-template-columns: 1fr;
    }
}

/* Sidebar */
aside {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

aside .aside-header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

aside .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

aside .menu-item:hover {
    background-color: #e0e0e0;
}

aside .sub-menu {
    padding: 10px;
    display: none;
}

aside .menu-item.active .sub-menu {
    display: block;
}

aside i {
    font-size: 20px;
}

/* Contenido principal */
.content {
    padding: 20px;
    overflow-y: auto; /* Habilita scroll si el contenido es más largo que el área visible */
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.users {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 10px;
}

.user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: #42445A;
    color: white;
    border-radius: 20px;
}

.user img {
    width: 60px;
    border-radius: 50%;
}

.user .user-details {
    display: flex;
    align-items: center;
    gap: 10px;
}

.user .follow-btn {
    width: 20%;
    height: 30px;
}

.user .follow-btn button {
    width: 100%;
    height: 100%;
    border: none;
    background: #ff6347;
    border-radius: 10px;
    color: white;
}

.posts {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.post {
    border: 1px solid black;
    padding: 10px;
    border-radius: 15px;
}

.post-user-img img {
    width: 60px;
    border-radius: 50%;
}

.post-user {
    display: flex;
    gap: 10px;
    align-items: center;
}

.post-img img {
    width: 100%;
}

.post-interactions {
    display: flex;
    justify-content: space-between;
    padding: 15px;
}

.post-interactions div {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

/* Estilos para el nav */
nav {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

nav .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

nav .menu-item:hover {
    background-color: #e0e0e0;
}

nav .sub-menu {
    padding: 10px;
    display: none;
}

nav .menu-item.active .sub-menu {
    display: block;
}

nav i {
    font-size: 20px;
}

/* Estilos adicionales para las secciones del nav */
.aside-posts,
.aside-stories,
.aside-groups,
.aside-trends {
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.aside-posts:hover,
.aside-stories:hover,
.aside-groups:hover,
.aside-trends:hover,
.aside-users:hover {
    background: black;
    color: white;
}

.hidden-posts,
.hidden-stories,
.hidden-groups,
.hidden-trends {
    border: 1px solid black;
    position: relative;
}

.hidden-posts .sort-by,
.hidden-stories .view-options,
.hidden-groups .membership,
.hidden-trends .trending-now {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
}

.hidden-posts .sort-options,
.hidden-stories .view-options-choices,
.hidden-groups .membership-options,
.hidden-trends .trending-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.hidden-posts .sort-options div,
.hidden-stories .view-options-choices div,
.hidden-groups .membership-options div,
.hidden-trends .trending-items div {
    display: flex;
    gap: 5px;
}

.hidden-posts .sort-options input[type="radio"],
.hidden-stories .view-options-choices input[type="radio"],
.hidden-groups .membership-options input[type="radio"] {
    margin-top: 5px;
}

.hidden-trends .trending-items .item {
    display: flex;
    gap: 10px;
    align-items: center;
}

.hidden-trends .trending-items .item span {
    background-color: #ff6347;
    color: white;
    padding: 5px;
    border-radius: 5px;
}

.aside-users {
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px;
}

.hidden-users .order-by-son {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
}

.hidden-users .order-by-son div {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Media queries */
@media (max-width: 600px) {
    aside,
    nav {
        display: none;
    }
}

@media (max-width: 400px) {
    .container {
        padding: 10px;
    }

    .content {
        padding: 10px;
    }
}

</style>