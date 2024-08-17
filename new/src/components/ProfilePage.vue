<template>
  <div id="app">
    <header>
      <div class="profile-banner">
        <img :src="'http://localhost:3000/' + user.banner" alt="Profile Banner">
      </div>
      
      <div class="user">
        <div class="user-img">
         <img :src="'http://localhost:3000/' + user.profilePicture" alt="Foto de Perfil">
        </div>

        <div class="user-details">
          <div class="username">
            <h1>{{ user.username }}</h1>
          </div>
          
          <div class="followers" style="margin-bottom: 20px">
            <p style="font-weight: 700;">500 Followers</p>
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
            <button @click="sendChat(user.id)" style="background: gray;"> <font-awesome-icon :icon="['fas', 'comment']" />Chat</button>
            <button @click="sendFriendRequest(user.id)" style="background: #007bff;"> <font-awesome-icon :icon="['fas', 'user-plus']" />Friend Request</button>
          </div>
        </div>
      </div>
    </header>
    
    <div class="responsive-user-details">
        
        <div class="r-bio">
            <p>{{user.bio}}</p>
        </div>
        
        <div class="r-info">
            
             
             
            <div class="ubication">
              <font-awesome-icon icon="fas fa-map-marker-alt" style="color: red" />
              <span>{{ user.ubication }}</span>
            </div>
            
            <div class="native">
              <font-awesome-icon icon="fas fa-globe" style="color: black" />
              <span>{{ user.native_city }}</span>
            </div>
            
            <div class="gender">
              <font-awesome-icon icon="fas fa-venus-mars" style="color: hotpink" />
              <span>{{ user.gender }}</span>
            </div>
            
            <div class="work">
              <font-awesome-icon icon="fas fa-briefcase" style="color: gray" />
              <span>{{ user.job }}</span>
            </div>
            
            <div class="love">
              <font-awesome-icon icon="fa fa-heart" style="color: red" />
              <span>{{ user.civil_status }}</span>
            </div>
            
        </div>
        
    </div>

    <div class="container">
      <aside>
        <div class="user-info">
          <div class="info">
            <div class="info-header">
              <h4>Info</h4>
            </div>
           
           <div class="user-i">
               
               
             <div  class="description">
               <p>{{ user.bio }}</p>
             </div>
             
            <div class="ubication">
              <font-awesome-icon icon="fas fa-map-marker-alt" style="color: red" />
              <span>{{ user.ubication }}</span>
            </div>
            
            <div class="native">
              <font-awesome-icon icon="fas fa-globe" style="color: black" />
              <span>{{ user.native_city }}</span>
            </div>
            
            <div class="gender">
              <font-awesome-icon icon="fas fa-venus-mars" style="color: hotpink" />
              <span>{{ user.gender }}</span>
            </div>
            
            <div class="work">
              <font-awesome-icon icon="fas fa-briefcase" style="color: gray" />
              <span>{{ user.job }}</span>
            </div>
            
            <div class="love">
              <font-awesome-icon icon="fa fa-heart" style="color: red" />
              <span>{{ user.civil_status }}</span>
            </div>
            
            
           </div>
          </div>
        </div>
      </aside>

      <main>
             <div class="posts">
                 
          <div v-for="post in userPosts" :key="post.id" class="post" >
              
              
            <div class="post-header">
              <div class="post-user-img">
                <img style="width: 50px; border-radius: 50%" :src="'http://localhost:3000/' + post.user.profilePicture" alt="Post User Image">
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
                <img :src="'http://localhost:3000/' + post.postPicture" alt="Post Image">
              </div>
            </div>
            <div class="post-interactions">
              <div @click="likePost(post.id)" class="like"><font-awesome-icon icon="fas fa-thumbs-up" /> <span>Likes</span>   </div>
              <div @click="goToPostPage(post.id)"class="comment"><font-awesome-icon icon="fas fa-comment" /> <span>Likes</span></div>
              <div @click="savePost(post.id)" class="save"><font-awesome-icon icon="fas fa-bookmark" /></div>
              <div class="share"><font-awesome-icon icon="fas fa-share" /></div>
            </div>
            
            
            
          </div>
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
      userPosts: [],
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
        console.log(data.user);
        this.user = data.user;
        this.userPosts = data.user.posts
         
         console.log('ghi usuario id: ', this.usuario.user_id)
         console.log('thi usu 73 d', this.user.id)
        if(this.user.id == this.usuario.user_id) {
          this.isSelfUser = true
        } else {
          this.isSelfUser = false
        }
        
       
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async sendFriendRequest(friend_target) {
    console.log('Send friend request method called, ', friend_target);
    const response = await fetch('http://localhost:3000/api/sofi/send_friend_request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friend_target }),
        credentials: 'include'
    });
    
    if (!response.ok) {
        console.log('Response not ok');
    }
    
    const data = await response.json();
    console.log('Server friend request data: ', data);
},

async sendChat(user_id) {
    const response = await fetch('http://localhost:3000/api/sofi/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user_id }),
        credentials: 'include'
    })
    const data = await response.json()
    console.log('Server data chat; ', data)
    if(data.chat.message == "Chat already exists") {
        return this.$router.push('/chat/' + user_id)
    } else if(data.chat.message = "chatDoesNotExist") {
        console.log('This is your first conversation with this person, enjoy !')
        this.$router.push('/chat/' + user_id)
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

.responsive-user-details {
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
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