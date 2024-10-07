<template>
 <aside id="aside">
    <div class="aside-logo">
      <font-awesome-icon id="close-sidebar" icon="fas fa-bars" />
      <h1>Sofii</h1>
    </div>
    <div class="aside-links">
      <ul class="f-row">
        <li 
          class="home" 
          :class="{ on: activePage === 'home' }" 
          @click="goToPage('home')"
        >
          <font-awesome-icon icon="home" /><span>Home</span>
        </li>
        <li 
          class="chats" 
          :class="{ on: activePage === 'chats' }" 
          @click="goToPage('chats')"
        >
          <font-awesome-icon icon="comment-alt" /><span>Messages</span>
        </li>
        <li 
          class="friends" 
          :class="{ on: activePage === 'friends' }" 
          @click="goToPage('friends')"
        >
          <font-awesome-icon icon="user-friends" /><span>Friends</span>
        </li>
        <li 
          class="watch" 
          :class="{ on: activePage === 'watch' }" 
          @click="goToPage('watch')"
        >
          <font-awesome-icon icon="hashtag" /><span>Explore</span>
        </li>
        <li 
          class="saved" 
          :class="{ on: activePage === 'saved' }" 
          @click="goToPage('saved')"
        >
          <font-awesome-icon icon="bookmark" /><span>Saved</span>
        </li>
        <li 
          class="user" 
          :class="{ on: activePage === 'user' }" 
          @click="goToPage('userDetails')"
        >
          <font-awesome-icon icon="user" /><span>Profile</span>
        </li>
      </ul>
      <div class="second-row">
        <ul class="s-row">
          <li>
            <font-awesome-icon icon="fas fa-gear" /><span>Settings</span>
          </li>
          <li>
            <font-awesome-icon icon="fas fa-info" /><span>Info</span>
          </li>
        </ul>
      </div>
    </div>
  </aside>

</template>

<script>
export default {
  name: "SidebarComponent",
  props: {
    activePage: {
      type: String,
      default: "home"
    }
  },
  methods: {
    goToPage(page) {
        alert('Method called', page)
      this.$router.push(`/${page}`);
    }
  }
  }
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

aside {
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  width: 250px;
  height: 100vh;
  
}

.aside-logo {
  display: flex;
  align-items: center;
  padding: 15px;
  gap: 10px;
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
  border-radius: 4px;
  transition: background 0.3s, color 0.3s;
}

.on {
  background: #051AFF;
  color: white;
}

.aside-links li:hover {
  background: #051AFF;
  color: white;
}
</style>
