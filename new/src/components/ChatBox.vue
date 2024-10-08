<template>
  <div> 
    <div class="container">
      <main>
        <div class="main-header">
          <div class="user-details">
            <div @click="goToPage('/user/' + userToInfo.id)" class="user-img">
              <img 
                style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" 
                :src="userToInfo.profilePicture || '/images/default.jpeg'" 
                class="profile-img" 
              />
            </div>
            <div class="user-username">
              <h4>{{ userToInfo.username || 'Someone' }}</h4>
              <p v-if="isUserTyping">{{ userToInfo.username }} Is Typing...</p>
              <p 
                v-if="!isUserTyping && userToInfo.active" 
                style="color: green;" 
                class="status"
              >
                Online
              </p>
              <p 
                v-if="!isUserTyping && !userToInfo.active" 
                style="color: gray"
              >
                Offline
              </p>
            </div>
          </div>
          <div class="header-interact">
            
          </div>
        </div>
        <div class="main-chatbox">
          <div class="messages">
            <div
              v-for="message in messages"
              :key="message.id"
              class="message"
              :class="getMessageClass(message)"
            >
              <div class="msg_content">
                <div 
                  v-if="message.message_content.length > 0" 
                  class="message-user-img"
                >
                  <img 
                    :src="getMessageUserProfilePicture(message)" 
                    class="message-img"
                  />
                </div>
                <p v-if="message.message_content.length > 0">
                  {{ message.message_content }}
                </p>
                <font-awesome-icon 
                  icon="check" 
                  size="1x" 
                  :style="{ color: message.readed ? '#1DA1F2' : '#000000' }" 
                  class="msgIcon" 
                />
              </div>

              <div v-if="message.withFile">
                <img 
                  v-if="message.fileType === 'image' || message.fileType === 'text-image'" 
                  style="width: 200px; height: 200px; object-fit: cover;" 
                  :src="message.fileSource" 
                />
                <video 
                  controls 
                  v-if="message.fileType === 'video' || message.fileType === 'text-video'"
                  style="
                   width: 250px;
                   height: 250px;
                   object-fit: cover;
                  "
                >
                  <source :src="message.fileSource" />
                </video>
              </div>
            </div>










          </div>
        </div>

        <div class="demo-content">
          <div class="preview-container" v-if="imageSrc || videoSrc">
            <img 
              ref="demoImage" 
              v-if="imageSrc" 
              :src="imageSrc" 
              class="preview-image" 
            />
            <video 
              ref="demoVideo" 
              v-if="videoSrc" 
              controls 
              class="preview-video"
            >
              <source :src="videoSrc" />
            </video>
            <div 
              class="cancel-preview" 
              @click="cancelPreview"
            >
              <font-awesome-icon icon="times-circle"></font-awesome-icon>
            </div>
          </div>
        </div>

        <div class="footer-chat">
          <div class="footer-buttons">
            <div @click="handleFiles('video')" class="video">
              <input 
                @change="handleFilesChanges" 
                ref="videoInp" 
                type="file" 
                accept="video/*" 
                hidden 
              />
              <font-awesome-icon icon="video"></font-awesome-icon>
            </div>
            <div @click="handleFiles('image')" class="image">
              <input 
                @change="handleFilesChanges" 
                ref="imageInp" 
                type="file" 
                accept="image/*" 
                hidden 
              />
              <font-awesome-icon icon="image"></font-awesome-icon>
            </div>
          </div>

          <div class="footer-message-input">
            <input 
              @input="broadcastTyping" 
              v-model="message" 
              id="inp" 
              type="text" 
              placeholder="Send a message..." 
            />
            <div 
              @click="sendMessage" 
              class="footer-send-message-button"
            >
              <font-awesome-icon icon="paper-plane"></font-awesome-icon>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>

import { startChat } from '../services/chatService'
import apiUrl from '../config'
import { mapGetters, mapState, mapActions } from 'vuex';


export default {


  name: 'ChatBox',
  data() {
    return {
      messages: [],
      userToInfo: {},
      message: "",
      error: "",
      chat: {},
      chat_id: null,
      videoSrc: "",
      imageSrc: "",
      image: null,
      video: null,
      isUserTyping: false,
      apiUrl: apiUrl
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['fetchUser']),
    
    goToPage(route) {
        this.$router.push(route)
    },
    
    getMessageType() {
      if (this.imageSrc && this.message) return 'text-image';
      if (this.videoSrc && this.message) return 'text-video';
      if (this.imageSrc) return 'image';
      if (this.videoSrc) return 'video';
      return 'text';
    },

    async uploadMedia(file, mediaType) {
      const formData = new FormData();
      switch(mediaType) {
          case "image":
              formData.append('image', file)
              break;
          case "video":
              formData.append('video', file)
              break;
          default: 
               alert('File tipe undefined')
      }

      const response = await fetch(`${process.env.VUE_APP_API_URL}/api/sofi/upload_media`, {
  method: 'POST',
  body: formData,
  credentials: 'include'
});


      if (!response.ok) {
        throw new Error(`Error uploading ${mediaType}`);
      }
        
      const data = await response.json();
      
      return data.filepath;
    },

    clearMessage() {
      this.message = '';
      this.imageSrc = '';
      this.videoSrc = '';
    },

    async sendMessage() {
      try {
        let type = this.getMessageType();
        let data = {
          chat_id: this.chat.chat_id,
          message: this.message || '',
          type: type,
        };

        if (this.imageSrc) {
          data.file = await this.uploadMedia(this.image, 'image');
        } else if (this.videoSrc) {
          data.file = await this.uploadMedia(this.video, 'video');
        } 
        //check
          
        this.$socket.emit('chatMessage', data);
          this.$socket.emit('stopTyping', this.chat_id)
        this.clearMessage();
        // end check
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },

    getMessageClass(message) {
      console.log('message class', message);
      console.log('user', this.user)
      if (!message.message_user || !this.user) return '';
      return message.message_user.id === this.user.user_id ? 'friend' : 'user';
    },
    getMessageUserProfilePicture(message) {
      return message.message_user?.profilePicture
        ? message.message_user.profilePicture
        : '/images/default.jpeg';
    },
    handleFiles(type) {
      if (type === "image") {
        this.$refs.imageInp.click();
      } else if (type === "video") {
        this.$refs.videoInp.click();
      }
    },
    handleFilesChanges(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (file.type.startsWith("image/")) {
            this.imageSrc = e.target.result;
            this.image = file;
          } else if (file.type.startsWith("video/")) {
            this.videoSrc = e.target.result;
            console.log('new video src::', this.videoSrc);
            this.video = file;
          }
        };

        reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };

        reader.readAsDataURL(file);
      }
    },

    cancelPreview() {
      this.imageSrc = "";
      this.videoSrc = "";
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    },

    broadcastTyping() {
      // isUserTyping
     // this.$socket.emit('typing', this.chat_id)
     if(this.message.trim()!== '') {
        this.$socket.emit('typing', this.chat_id)
     } else {
        console.log('emiting stop typing')
        this.$socket.emit('stopTyping', this.chat_id)
     }
    },

    async startChat() {
      try {
        const data = await startChat(this.$route.params.receiver_id);
        console.log('all went ok', data);
        this.chat = data.chat;
        this.chat_id = data.chat.chat_id;
        this.messages = data.chat.messages;
        this.userToInfo = data.userToDisplayInfo;
        this.$socket.emit('joinRoom', this.chat_id);
      } catch (e) {
        console.error('error', e);
        throw e;
      }
    }
  },
  async created() {
    await this.fetchUser();
    await this.startChat();
    console.log('currengthis', this.user)
    console.log('user', this.userToInfo)

    const unreadMessages = this.messages.filter(message => message.readed === false);
    unreadMessages.forEach((message) => {
      console.log('usuario id: ', this.user.id);
      console.log('unreaded message: ', message);

      if (message.message_user_id !== this.user.user_id) {
        this.$socket.emit('readMessage', {
          message: message,
          chat_id: this.chat_id
        });
      }
    });
  },

  mounted() {
    this.$socket.on('chatMessage', (message) => {
      this.messages.push(message);
      console.log('message received from the server!', message);
    });

    this.$socket.on('typing', () => {
      this.isUserTyping = true;
    });

    this.$socket.on('stopTyping', () => {
       this.isUserTyping = false;
    })

     this.$socket.on('readMessage', (message) => {
        console.log('Message readed Received From Server!', message);

        const originalMessage = this.messages.find(msg => msg.id === message.id);
        if (originalMessage) {
          alert('message found');
          originalMessage.readed = true;
        } else {
          alert('message not found');
        }
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
  position: relative;
}

main {
  display: flex;
  width: 70%;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 80px;
  box-sizing: border-box;
}

.main-header, .main-footer {
  background: white;
  z-index: 1;
}

.main-header {
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  align-items: center;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-header .user-details {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-img {
  width: 60px;
  border-radius: 50%;
}

.status {
  color: green;
}

.main-footer {
  height: 80px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer-buttons {
  display: flex;
  gap: 5px;
}

.footer-message-input {
  flex-grow: 1;
  display: flex;
  gap: 10px;
  align-items: center; /* Alinea el input y el botón de enviar verticalmente */
}

.footer-message-input input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box; /* Para que el padding no rompa el layout */
}

.footer-send-message-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #4CAF50;
  border-radius: 50%;
  color: white;
  cursor: pointer; /* Cursor de mano para indicar que es clickeable */
}

.footer-send-message-button:hover {
  background-color: #45a049;
}

.video, .image, .micro {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 50%;
  cursor: pointer;
}

.preview-container {
  position: relative;
  max-height: 300px;
  overflow: hidden;
  margin-bottom: 20px;
}

.preview-image, .preview-video {
  width: 100%;
  border-radius: 10px;
}

.cancel-preview {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.recording-ui {
  display: flex;
  align-items: center;
  gap: 10px;
}

.timer {
  font-size: 1.5rem;
  font-weight: bold;
}

.stop-button {
  padding: 10px;
  background-color: red;
  border-radius: 50%;
  color: white;
}

.messages {
  padding-top: 80px;
  padding-bottom: 90px;
  overflow-y: auto;
  flex-grow: 1;
}

.messages .message {
  display: flex;
  width: 100%;
  flex-direction: column!important;
  /* align-items: flex-end;  */
  border: 1px solid red;
}

.message.friend {
  align-items: flex-start; /* Mensajes de amigos a la izquierda */
  flex-direction: row-reverse;
}

.message.friend .message-img {
  display: none;
}

.message.user {
  display: flex;
  flex-direction: row;
}

.message.user .msgIcon {
  display: none;
}

.message .msg_content {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.message-user-img {
  width: 40px;
  height: 40px;
}

.message-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.message p {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 20px;
  max-width: 70%;
  word-wrap: break-word;
  word-break: break-word;
  margin: 0;
}

.message.user p {
  background-color: #4CAF50;
  color: white;
}

.message.friend p {
  background-color: #E0E0E0;
  color: black;
}

.message-wrapper {
  display: flex;
  justify-content: flex-end;
}

.message-wrapper.user {
  border-color: #4CAF50;
}

.message-wrapper.friend {
  border-color: #E0E0E0;
}

.footer-chat {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
   padding: 15px;
}

@media(max-width: 600px) {
  main {
    width: 100%;
  }

  .message p {
    max-width: 85%;
  }

  .footer-message-input input {
    padding: 5px;
  }

  .messages {
    padding-top: 60px;
    padding-bottom: 70px;
  }
}

</style>