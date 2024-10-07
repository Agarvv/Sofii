<template>
  <div>
    <header>
      <h1>Chat</h1>
      <p>Sofii</p>
    </header>
    <main>
      <div class="main-header">
        <div class="mh-search">
          <i class="fa fa-search"></i>
          <font-awesome-icon icon="search" />
          <input 
            type="search" 
            placeholder="Search Chats..." 
            v-model="searchQuery"  
          >
        </div>
      </div>
      <div class="main-chats">
        <div 
          v-for="chat in filteredChats" 
          :key="chat.id" 
          @click="goToPage('/chat/' + chat.userToDisplayInfo.id)" 
          class="chat"
        >
          <div class="main-chat-user">
            <div class="user-img">
              <img :src="chat.userToDisplayInfo.profilePicture || '/images/default.jpeg'">
            </div>
            <div class="user-details">
              <h4>{{chat.userToDisplayInfo.username || 'Someone'}}</h4>
              <p>{{chat.last_message}}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import apiUrl from '../config'
import HeaderComponent from './HeaderComponent'
import { getChats } from '../services/chatService'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    HeaderComponent
  },
  name: 'ChatPage',
  data() {
    return {
      contacts: [],
      searchQuery: "", 
      apiUrl: apiUrl
    }
  },
  computed: {
    filteredChats() {
      if (!this.searchQuery) {
        return this.contacts; 
      }
     
      return this.contacts.filter(chat => 
        chat.userToDisplayInfo.username
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()) ||
        chat.last_message
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    async getContacts() {
      try {
        const data = await getChats();
        console.log('data', data);
        this.contacts = data.chats; 
      } catch(e) {
        console.error('error', e);
      }
    },
    goToPage(route) {
      this.$router.push(route);
    }
  },
  async created() {
    await this.getContacts(); 
  }
};
</script>

<style scoped>
 header {
  padding: 15px;
  background-color: #2C2F33; 
  color: white;
  
}

header p {
  color: #B9BBBE; 
}

.container{
    width: 70%;
}

.main-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.mh-search {
  background: #7289DA;
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  display: flex;
  align-items: center;
}

.mh-search input {
  background: transparent; 
  border: none;
  color: white;
  outline: none;
  width: 100%;
}

.mh-search input::placeholder {
  color: #D3D3D3;
}

.main-chat-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat {
  transition: 0.4s;
  width: 85%;
  padding: 15px;
  border-radius: 15px;
  background: #F6F6F6;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}

.chat:hover {
  background: #A1A9FF;
}

.main-chat-user .user-img img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.main-chats {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.main-chat-user .user-details p {
  color: #B9BBBE; 
}

@media(max-width: 730px) {
  .container {
    width: 100%;
    
  }

  .main-chat-user .user-img img {
    width: 35px;
    height: 35px; 
  }

  .main-chat-user .user-details p {
    font-size: 14px; 
  }
}
</style>

