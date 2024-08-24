<template>
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
      

</template>

<script>
    export default {
        name: "SidebarComponent"
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
  border: none; /* Sin borde */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    background: #fff; /* Fondo blanco */
    padding: 10px;
    border-radius: 8px; /* Bordes redondeados */
    width: 250px;
    height: 100vh;
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
</style>