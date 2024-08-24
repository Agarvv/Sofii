
<template>
    
    
<div class="container"> 
  <main>
    <div class="main-header">
      <div class="user-details">
        <div class="user-img">
          <img :src="userProfilePicture" style="width: 60px; border-radius: 50%;">
        </div>
        <div class="user-username">
          <h4>{{ user.username }}</h4>
          <p style="color: green">Connected</p>
        </div>
      </div>
      <div class="header-interact">
        <div class="options">
          <font-awesome-icon icon="bars"></font-awesome-icon>
        </div>
      </div>
    </div>

    <div class="main-chatbox">
        
      <div class="messages">
        <div v-for="message in messages" :key="message.id" class="message" :class="getMessageClass(message)">
            
          <div class="message-user-img">
            <img :src="'http://localhost:3000/' + message.message_user.profilePicture" style="width: 40px; height: 40px; object-fit: cover; border-radius: 50%">
          </div>
          <p>{{ message.message_content }}</p>
        </div>
      </div>
      
    </div>

    <div class="main-footer">
      <div class="footer-buttons">
        <div @click="handleFiles('video')" class="video">
            <input @change="handleFilesChanges('video')" ref='videoInp' type="file" style="display: none">
          <font-awesome-icon icon="video"></font-awesome-icon>
        </div>
        <div @click="handleFiles('image')" class="image">
         <input @change="handleFilesChanges()" ref='imageInp' type="file" style="display: none">
          <font-awesome-icon icon="image"></font-awesome-icon>
        </div>
        <div class="micro">
          <font-awesome-icon icon="microphone"></font-awesome-icon>
        </div>
      </div>
      <div class="footer-message-input">
          <img  ref="demoImage" src="">
        <input v-model="message" id="inp" type="text" placeholder="Send a message...">
        <div @click="sendMessage" class="footer-send-message-button">
          <font-awesome-icon icon="paper-plane"></font-awesome-icon>
        </div>
      </div>
    </div>
  </main>
 </div>
 
</template>

<script>
export default {
  name: 'ChatBox',
  data() {
    return {
      messages: [],
      user: {},
      message: "",
      error: "",
      chat: {},
      chat_id: null
    };
  },
  computed: {
    userProfilePicture() {
      return this.user.profilePicture 
        ? `http://localhost:3000/${this.user.profilePicture}`
        : 'default_image_path_here'; // Ruta por defecto si no hay imagen
    }
  },
  methods: {
    async sendMessage() {
      if (!this.message.trim()) {
        this.error = "You cannot send an empty message.";
        return;
      }

      try {
        this.$socket.emit('chatMessage', {
          message: this.message,
          chat_id: this.chat_id // Se corrigió `this.chat.chat_id` por `this.chat_id`
        });

        this.message = ""; // Limpiar el campo de entrada después de enviar
      } catch (error) {
        console.error("Error sending message:", error);
        this.error = "Failed to send the message.";
      }
    },
    getMessageClass(message) {
      if (!message.message_user || !this.user) return ''; // Protección extra contra indefinidos
      return message.message_user.id === this.user.id ? 'user' : 'friend';
    },
    getMessageUserProfilePicture(message) {
      return message.message_user?.profilePicture 
        ? `http://localhost:3000/${message.message_user.profilePicture}`
        : 'default_image_path_here'; // Ruta por defecto si no hay imagen
    },
    handleChatConnection(chat_id) {
      console.log('Connecting to chat:', chat_id);
      this.$socket.emit('joinRoom', chat_id);
    },
    handleFiles(type, event) {
      switch(type) {
        case "image":
          this.$refs.imageInp.click();
          break;
        case "video":
          this.$refs.videoInp.click();
          break;
        default:
          return;
      }
    },
    handleFilesChanges(event) {
    console.log('changes');

    const file = event.target.files[0]; // Accedemos al archivo
    if (file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            console.log('src', e.target.result); // Verificar que se obtiene el resultado
            if (this.$refs.demoImage) {
                this.$refs.demoImage.src = e.target.result; // Actualizamos el src
            } else {
                console.error('Referencia demoImage no encontrada');
            }
        };

        reader.onerror = (error) => {
            console.error('Error al leer el archivo:', error);
        };

        reader.readAsDataURL(file); // Esto es lo que lee el archivo
    } else {
        console.error('No se ha seleccionado ningún archivo');
    }
}
      
      
      
 
      
    },
 
  async created() {
    try {
      const response = await fetch('http://localhost:3000/api/sofi/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: this.$route.params.receiver_id }),
        credentials: 'include'
      });

      const data = await response.json();
      console.log('Server data chat:', data);

      if (response.ok) {
        this.chat = data.chat;
        this.chat_id = data.chat.chat_id; // Guardar el `chat_id`
        this.handleChatConnection(this.chat_id);
        this.messages = data.chat.messages;
        this.user = data.userToDisplayInfo;
      } else {
        console.error("Error fetching chat data:", data);
        this.error = "Failed to fetch chat data.";
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      this.error = "Failed to fetch chat data.";
    }
  },
  mounted() {
    this.$socket.on('chatMessage', (message) => {
      this.messages.push(message);
    });
  }
};
</script>

<style scoped>

.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
main {
  display: flex;
  width: 70%;
  flex-direction: column;
  height: 100vh;
}

.main-header, .main-footer {

  background: white;
  z-index: 1;
}

.main-header {
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  align-items: center;
}

.main-header .user-details {
    display: flex;
  
    gap: 10px;
}

.main-footer {
  height: 80px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #f0f0f0;
 
}

.main-chatbox {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background: #fcfcfc;
  margin-top: 70px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.messages .message {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
   flex-wrap: wrap;
  padding: 10px;
  border-radius: 10px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
}

.messages .message.friend {
  align-self: flex-end;
  background: #42445A;
  color: white;
 
}

.message.friend img {
    display: none;
}

.messages .message.user {
  align-self: flex-start;
  background: #02CCFF;
  color: white;
  text-align: right;
}

.footer-buttons {
  display: flex;
  gap: 10px;
  font-size: 24px;
  align-items: center;
}

.footer-message-input {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 5px;
}


.footer-message-input input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
}

.footer-send-message-button {
  padding-right: 10px;
  font-size: 25px;
  cursor: pointer;
}

@media(max-width: 600px) {
    main {
        width: 100%;
    }
}
</style>