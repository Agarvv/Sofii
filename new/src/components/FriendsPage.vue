<template>
    
    
    <header> 
  <div class="logo">
  <i class="fa fa-arrow-left"></i>
   <!-- <font-awesome-icon icon="arrowLeft"/> -->
    <h1>Sofii</h1>
  </div>
</header>

<div class="container">
  
  <aside>
    
    <div class="aside-header">
      <h1>Your Friends</h1>
      <font-awesome-icon icon="search"/> 
    </div>
    
    <div class="aside-content">
      
      <div class="only-friends">
     
       <font-awesome-icon icon="userFriends"/> 
        <h4>Only My Friends</h4>
        <input type="radio">
      </div>
       
      <div class="pending-requests">
        <font-awesome-icon icon="userPlus"/>
        <h4>Pending requests</h4>
        <input type="radio">
      </div>
      
      
    </div>
    
    
  </aside>
  
  <main>

    <div class="responsive-main-header">
      
      <div class="rmh-only-friends">
        <font-awesome-icon icon="userFriends"/> 
      
        <h4>Only My Friends</h4>
        
        <input type="radio">
      </div>
      <div class="rmh-pending-requests">

       <font-awesome-icon icon="userPlus"/> 

        <h4>Pending requests</h4>
        
        <input type="radio">
        
        
      </div>
    
    </div>
    
    <div class="friends-requests">
      <h4>Your Friend Requests</h4>
      <div v-for="request in friend_requests" :key="request.id" class="friend">
        
        <div class="friend-details">
          
          <div class="friend-img">
            <img style="width: 80px; border-radius: 50%" :src="'http://localhost:3000/' + request.sender.profilePicture">
          </div>
          
          <div class="friend-username-and-buttons">
            <h2>{{request.sender.username}}</h2>
            
            <div  class="friend-buttons">
              <button @click="acceptRequest(request.id)" class="f-button-accept">
                Accept
              </button>
              <button @click="declineRequest(request.id)" class="f-button-deny">
                Deny
              </button>
            </div>
            
          </div>
          
        </div>
        
      </div> <!-- END OF FRIEND DIV --> 
      
      
    </div>
    
    <div class="friends"> 
    <h4>Your Friends</h4>
      
      <div v-for="friend in friends" :key="friend.friendToDisplayInfo.id"class="friend">
        
        <div class="friend-details">
           
          <div class="friend-img"> 
            
            <img :src="'http://localhost:3000/' + friend.friendToDisplayInfo.profilePicture">
            
          </div>
          
          <div class="friend-username">
              <h3>{{friend.friendToDisplayInfo.username}}</h3>
          </div>
          
          
        </div> 
        
        <div class="friend-chat">
           <font-awesome-icon icon="message"/>
         
        </div>
        
      </div>
      
    </div>
    
    
  </main>
  
  
</div>






    
    
</template>

<script>
export default {
    name: 'FriendsPage',
    data() {
        return {
            friends: [], // Cambiado de {} a [] porque es una lista/array de amigos.
            friend_requests: []
        };
    },
    methods: {
        async getFriends() {
            try {
                const response = await fetch('http://localhost:3000/api/sofi/friends', {
                    method: 'GET',
                    credentials: 'include'
                });
                
                const data = await response.json();
                this.friend_requests = data.friends.userFriendsRequests;
                this.friends = data.friends.friends; // Asegúrate que 'data.friends' tenga la estructura correcta.
                console.log(data)
                console.log(this.friend_requests)
                console.log(this.friends)
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        },
        async acceptRequest(request_id) {
    try {
        console.log('Method acceptRequest called with request_id:', request_id);
        
        const response = await fetch('http://localhost:3000/api/sofi/accept_friend_request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', // Esto asegura que las cookies de sesión se incluyan en la solicitud
            body: JSON.stringify({ request_id }) // Envía el ID de la solicitud en el cuerpo de la solicitud
        });
        
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        
        const data = await response.json();
        console.log('Server response for acceptRequest:', data);

        // Aquí podrías actualizar la lista de solicitudes de amistad o realizar alguna otra acción
        // Ejemplo: Eliminar la solicitud aceptada de la lista
        this.friend_requests = this.friend_requests.filter(request => request.id !== request_id);

    } catch (error) {
        console.error('Error accepting friend request:', error);
    }
},

async declineRequest(request_id) {
    try {
        console.log('Method declineRequest called with request_id:', request_id);
        
        const response = await fetch('http://localhost:3000/api/sofi/deny_friend_request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ request_id }) // Envía el ID de la solicitud en el cuerpo de la solicitud
        });
        
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Server response for declineRequest:', data);

        // Aquí también podrías actualizar la lista de solicitudes de amistad o realizar otra acción
        // Ejemplo: Eliminar la solicitud rechazada de la lista
        this.friend_requests = this.friend_requests.filter(request => request.id !== request_id);

    } catch (error) {
        console.error('Error declining friend request:', error);
    }
}





    },
    async created() {
        await this.getFriends();
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
  padding: 20px;
  background-color: #f5f5f5;
}

header .logo {
  display: flex;
  gap: 15px;
  align-items: center;
}

.container {
  border: none;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  gap: 20px;
}

.container aside {
  background-color: #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.container main {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

main .responsive-main-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  border-bottom: 2px solid #ddd;
}

.rmh-only-friends, .rmh-pending-requests {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
}

aside .aside-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 2px solid #ddd;
}

aside .aside-content {
  padding: 10px;
}

aside .aside-content div {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  font-size: 18px;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

aside .aside-content div input[type="radio"] {
  width: 20px;
  height: 20px;
}

main .friends-requests {
  padding: 15px;
}

main friends-requests .friend {
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.friends-requests .friend .friend-details {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
}

.friends-requests .friend-img img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.friend-username-and-buttons {
  width: 100%;
}

.friends-requests .friend .friend-buttons {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.f-button-accept {
  background: #28a745;
  border: none;
  color: white;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
}

.f-button-deny {
  background: #dc3545;
  border: none;
  color: white;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
}

.friends {
  padding: 15px;
}

.friends .friend {
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}

.friends .friend .friend-details {
  display: flex;
  align-items: center;
  gap: 15px;
}

.friends .friend .friend-img img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.friends .friend .friend-username {
  font-size: 20px;
  font-weight: 600;
}

.friends .friend .friend-chat i {
  font-size: 24px;
  color: #007bff;
  cursor: pointer;
}

@media (max-width: 600px) {
  .container aside {
    display: none;
  }
  
  .container {
    grid-template-columns: 1fr;
  }
}



</style>