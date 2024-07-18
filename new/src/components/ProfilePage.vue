<template>
  <div id="app">
    <header>
      <div class="profile-banner">
        <img src="cinco-jotas-jamon.jpg" alt="Profile Banner">
      </div>
      
      <div class="user">
        <div class="user-img">
          <img :src="user.userPicture" alt="Foto de Perfil">
        </div>

        <div class="user-details">
          <div class="username">
            <h1>{{ user.username }}</h1>
          </div>
          
          <div class="followers" style="margin-bottom: 20px">
            <p style="font-weight: 700;">500Followers</p>
            <p style="color: gray">120 Following</p>
          </div>

          <div v-if="isSelfUser" class="isSelfUserDiv">

           <div class="buttons">
             <div>
             <button>Edit Your Account</button>
             </div>
           </div>

          </div>
          
          <div v-else class="interact-buttons">
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
             <div v-if="user.description" class="description">
               <p>{{ user.description }}</p>
             </div>
             
            <div class="ubication">
              <font-awesome-icon icon="fas fa-map-marker-alt" style="color: red" />
              <span>{{ user.location }}</span>
            </div>
            
            <div class="native">
              <font-awesome-icon icon="fas fa-globe" style="color: black" />
              <span>{{ user.nationality }}</span>
            </div>
            
            <div class="gender">
              <font-awesome-icon icon="fas fa-venus-mars" style="color: hotpink" />
              <span>{{ user.gender }}</span>
            </div>
            
            <div class="work">
              <font-awesome-icon icon="fas fa-briefcase" style="color: gray" />
              <span>{{ user.occupation }}</span>
            </div>
            
            <div class="love">
              <font-awesome-icon icon="fa fa-heart" style="color: red" />
              <span>{{ user.status }}</span>
            </div>
           </div>
          </div>
        </div>
      </aside>

      <main>
        <div class="posts">
          <h1>Posts</h1>
          
    
          
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import userMixin from '../mixins/userMixin';
export default {
 mixins: [userMixin], // Asegúrate de incluir el mixin aquí
  data() {
    return {
      user: {},
      isSelfUser: false
    };
  },
  methods: {
    async getUser() {
      try {
        const response = await fetch(`http://localhost:3000/api/sofi/user/${this.$route.params.id}`);
        if (!response.ok) {
          throw new Error('Something went wrong.');
        }
        const data = await response.json();
        console.log(data);
        this.user = data.user;
         
        if(this.user.id == this.usuario.user_id) {
          this.isSelfUser = true
        } else {
          this.isSelfUser = false
        }
        
       
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
  },
  async mounted() {
    await this.getUser(); // Corregir llamada a método
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

.isSelfUserDiv {
}

.isSelfUserDiv .buttons {
  display: grid;
  grid-template-columns:  1fr;

}

.isSelfUserDiv .buttons div {
  height: 40px;
}

.isSelfUserDiv .buttons div button {
 width: 100%;
 height: 100%;
 border: none;
 background: blue;
 color: white;
 font-weight: 700;
 border-radius: 20px;
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