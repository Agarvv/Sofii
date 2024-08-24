
<template>
  <div>
   
   <HeaderComponent :activePage="'chat'" :user="usuario"/>
    
    
    <div class="container">
      
      <aside>
        
        <div class="aside-header">
         
          
          <div class="aside-header-search-inp">
            <input type="search" placeholder="Search Contacts">
            <font-awesome-icon icon="search"></font-awesome-icon>
          </div>
          
          
        </div>
        
        <div class="aside-contacts">
          
          <div @click="goToPage('/chat/' + contact.userToDisplayInfo.id)" v-for="contact in contacts" :key="contact.chat_id" class="contact">
            
            <div class="contact-img">
               <img :src="'http://localhost:3000/' + contact.userToDisplayInfo.profilePicture" style="width: 70px; height: 70px; object-fit: cover; border-radius: 50%;">
            </div>
            
            <div class="contact-details">
              <h4 class="contact-username">{{contact.userToDisplayInfo.username}}</h4>
                <p class="contact-last-message">
  {{ contact.last_message.length > 25 ? contact.last_message.substring(0, 25) + '...' : contact.last_message }}
             </p>
            </div>
            
          </div>
          
          <!-- Aquí irían más contactos -->

        </div>
        
      </aside> 
      
    </div>
  </div>
</template>


<script>
import HeaderComponent from './HeaderComponent'
import userMixin from '../mixins/userMixin'

export default {
    mixins: [userMixin],
    components: {
        HeaderComponent
    },
    name: 'ChatPage',
    data() {
        return {
            contacts: [],
            chat: [],
            messages: [],
            message: "",
            roomId: null
        }
    },
    methods: {
        async getContacts() {
            try {
                const response = await fetch('http://localhost:3000/api/sofi/chats', {
                    method: 'GET',
                    credentials: 'include'
                });

                const data = await response.json();
                console.log('Server data from chats:', data.chats);

                this.contacts = data.chats;
                console.log('this.contacts:', this.contacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        },
        goToPage(route) {
            this.$router.push(route)
        }
    },
    async created() {  // Esto está ahora fuera de methods
        await this.getContacts(); 
    },
};
</script>

<style scoped>
    html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background: #f9f9f9; /* Fondo un poco más claro */
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.container {
  border: 2px solid #ddd; /* Borde principal más suave */
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container aside {
    border: 1px solid black;
    width: 50%;
    height: 100vh;
}


.aside-header {
  padding: 10px;
  margin-bottom: 5px;
}

.aside-header-user {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 3px;
}

.aside-header-search-inp {
  display: flex;
  gap: 5px;
  align-items: center;
  height: 30px;
  margin-bottom: 20px;
}

.aside-header-search-inp input {
  flex: 1;
  height: 100%;
  border: none;
  border-radius: 10px;
}

.aside-contacts {
  width: 100%;
}

.aside-contacts .contact {
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 5px;
  background: #f5f5f5; /* Fondo ligeramente gris */
  color: #333; /* Texto gris oscuro */
}

.aside-contacts .contact:hover {
  background: white; /* Fondo blanco al pasar el mouse */
  color: black; /* Texto negro al pasar el mouse */
}

.aside-interactions {
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 10px;
}

.aside-interactions .add-contact {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: white; /* Fondo blanco */
  border: none;
  border-radius: 10px;
}

@media(max-width: 600px) {
    .container aside {
        width: 100%;
    }
}


</style>