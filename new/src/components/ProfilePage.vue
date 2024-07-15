<template>
  <div id="app">
    <header>
      <div class="profile-banner">
        <img src="cinco-jotas-jamon.jpg" alt="Profile Banner">
      </div>
      
      <div class="user">
        <div class="user-img">
          <img src="invict-victory-edp.jpg" alt="Foto de Perfil">
        </div>

        <div class="user-details">
          <div class="username">
            <h1>{{ username }}</h1>
            <p>@{{ handle }}</p>
          </div>
          
          <div class="followers">
            <p style="font-weight: 700;">{{ followers }} Followers</p>
            <p style="color: gray">{{ following }} Following</p>
          </div>
          
          <div class="interact-buttons">
            <button style="background: gray;"> <font-awesome-icon :icon="['fas', 'comment']" />Chat</button>
            <button style="background: #007bff;"> <font-awesome-icon :icon="['fas', 'user-plus']" />Follow</button>
          </div>
        </div>
      </div>
    </header>

    <div class="container">
      <aside>
        <div class="user-info">
          <div class="info">
            <div class="info-header">
              <h4>Info</h4>
            </div>
           
           <div class="user-i">
             <div class="description">
               <p>{{ bio }}</p>
             </div>
             
            <div class="ubication">
              <font-awesome-icon icon="fas fa-map-marker-alt" style="color: red" />
              <span>{{ location }}</span>
            </div>
            
            <div class="native">
              <font-awesome-icon icon="fas fa-globe" style="color: black" />
              <span>{{ nationality }}</span>
            </div>
            
            <div class="gender">
              <font-awesome-icon icon="fas fa-venus-mars" style="color: hotpink" />
              <span>{{ gender }}</span>
            </div>
            
            <div class="work">
              <font-awesome-icon icon="fas fa-briefcase" style="color: gray" />
              <span>{{ occupation }}</span>
            </div>
            
            <div class="love">
              <font-awesome-icon icon="fa fa-heart" style="color: red" />
              <span>{{ status }}</span>
            </div>
           </div>
          </div>
        </div>
      </aside>

      <main>
        <div class="posts">
          <h1>Posts</h1>
          
          <!-- Contenedor de posts vacío -->
          <!-- No hay ningún elemento aquí -->
          
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'Le Beau',
      handle: 'Lebeauu',
      followers: 78,
      following: 2,
      bio: "Hola a todos! Soy Alex, un chico de 13 años que ama los videojuegos, los cómics y las aventuras. Me encanta compartir mis logros en Minecraft, mis ideas locas y algunas historias divertidas del colegio. Si te gustan los memes y las risas, ¡sígueme! 🎮📚😂",
      location: 'Paris',
      nationality: 'Berlin',
      gender: 'Woman',
      occupation: 'Backend Engineer',
      status: 'Married'
    };
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
    box-sizing: border-box;
    padding: 0;
    margin: 0 0 0 0;
}

header {
    position: relative;
    border: 1px solid red;
}

header .profile-banner {
    width: 100%;
    height: 230px;
    overflow: hidden;
}

header .profile-banner img {
    width: 100%;
    height: 100%;
}

.user-img {
    position: absolute;
    top: -50px;
    left: 20px;
}

.user-img img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 5px solid #fff;
}


.container {
    display: flex;
}

aside, main {
  
    height: 100vh;
}

aside {
    flex: 2; /* Ajusta según lo necesites */
    padding: 20px;
}

aside .user-info {
    border: 1px solid black;
    height: 100%;
}

main {
    flex: 4; /* Ajusta según lo necesites */
    padding: 20px;
    border-radius: 20px;
}

main .posts {
    border: 1px solid black;
    height: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 20px;
}

main .posts .post {
  
    padding: 15px;
    border-radius: 15px;
}

main .posts .post .post-header {
  border: 1px solid black;
  gap: 10px;
}

main .posts .post .post-header .user-information {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
}

.post {
  
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


.user {
    position: relative;
    margin-top: -50px; /* Ajustar según necesidad para superponer la imagen */
    padding: 10px 20px;
    background: #fff;

}


.user-details {
    margin-top: 40px; /* Ajustar según necesidad para el margen de la imagen */
    padding: 15px;

}

.followers {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}



.interact-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  height: 30px;
  margin-top: 5px;
  
}

.interact-buttons button {
  border: .3px solid gray;
  color: white;
  border-radius: 10px;
  
}

.post-header img {
  width: 70px;
  border-radius: 50%;
}

aside .user-info {
  padding: 15px;
  border-radius: 10px;
}

aside .info {
  border: 1px solid black;
  padding: 15px;
  border-radius: 5px;
}

aside .description {
  margin-bottom: 20px;
}

@media (max-width: 600px) {
    aside {
        display: none;
    }
  
    .container {
        flex-direction: column;
    }
}

</style>