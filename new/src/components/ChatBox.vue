<template>
  <div class="container">
    <main>
      <div class="main-header">
        <div class="user-details">
          <div class="user-img">
            <img :src="userProfilePicture" class="profile-img">
          </div>
          <div class="user-username">
            <h4>{{ user.username }}</h4>
            <p class="status">Connected</p>
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
          <div
            v-for="message in messages"
            :key="message.id"
            class="message"
            :class="getMessageClass(message)"
          >
            <div class="message-user-img">
              <img :src="getMessageUserProfilePicture(message)" class="message-img">
            </div>
            <p>{{ message.message_content }}</p>
          </div>
        </div>
      </div>
        
      <div class="demo-content">
        <div class="preview-container" v-if="imageSrc || videoSrc">
          <img ref="demoImage" v-if="imageSrc" :src="imageSrc" class="preview-image">
          <video ref="demoVideo" v-if="videoSrc" controls class="preview-video">
            <source :src="videoSrc">
          </video>
          <div class="cancel-preview" @click="cancelPreview">
            <font-awesome-icon icon="times-circle"></font-awesome-icon>
          </div>
        </div>
      </div>

      <div class="main-footer">
        <div v-if="isRecording" class="recording-ui">
          <div class="timer">{{ formatTime(recordingTime) }}</div>
          <button @click="stopRecording" class="stop-button">
            <font-awesome-icon icon="stop"></font-awesome-icon>
          </button>
        </div>
        <div v-else class="footer-buttons">
          <div @click="handleFiles('video')" class="video">
            <input @change="handleFilesChanges" ref="videoInp" type="file" accept="video/*" hidden>
            <font-awesome-icon icon="video"></font-awesome-icon>
          </div>
          <div @click="handleFiles('image')" class="image">
            <input @change="handleFilesChanges" ref="imageInp" type="file" accept="image/*" hidden>
            <font-awesome-icon icon="image"></font-awesome-icon>
          </div>
          <div @click="startRecording" class="micro">
            <font-awesome-icon icon="microphone"></font-awesome-icon>
          </div>
        </div>
        <div class="footer-message-input">
          <input
            v-model="message"
            id="inp"
            type="text"
            placeholder="Send a message..."
          >
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
      chat_id: null,
      videoSrc: "",
      imageSrc: "",
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
      recordingTime: 0,
      recordingInterval: null,
      image: null,
      video: null
    };
  },
  computed: {
    userProfilePicture() {
      return this.user.profilePicture 
        ? `http://localhost:3000/${this.user.profilePicture}`
        : 'default_image_path_here'; 
    }
  },
  methods: {
    async sendMessage() {
    // Inicializar el tipo y datos
    let type = 'text';
    let data = {};

    // Verificar el estado de los datos de entrada
    console.log('Preparing to send message...');
    console.log('imageSrc:', this.imageSrc);
    console.log('videoSrc:', this.videoSrc);
    console.log('message:', this.message);
    console.log('chat_id:', this.chat.chat_id);

    // Verificar si hay una imagen
    if (this.imageSrc) {
     let type;
     type = this.message ? 'image-text' : 'image'

        const response = await fetch('http://localost:3000/api/sofi/upload_media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
 
          }),
          credentials: 'include'
        })

        const data = await response.json()
        console.log('upload media: ', data)

        if(response.ok) {
          this.$socket.emit('chatMessage', {
            type: type,
            message: this.message,
            image: data.image
          })
        } else {
          console.error('Something went wrong...')
        }
    }

    // Verificar si hay un video
    if (this.videoSrc) {
        
    }

    // Verificar si es un mensaje de texto solo
    if (!this.imageSrc && !this.videoSrc && this.message) {
        console.log('Single message detected')
        data = {
            type: 'single_message',
            message: this.message,
            chat_id: this.chat.chat_id
        };
    }

    // Log final de tipo y datos
    console.log('Final type:', type);
    console.log('Final data being sent:', data);

    // Emitir el mensaje a través del socket
    try {
        console.log('Emitting chatMessage...');
        this.$socket.emit('chatMessage', data);
        console.log('Message emitted successfully');
    } catch (error) {
        console.error('Error emitting chatMessage:', error);
    }
},




    getMessageClass(message) {
      if (!message.message_user || !this.user) return ''; 
      return message.message_user.id === this.user.id ? 'user' : 'friend';
    },
    getMessageUserProfilePicture(message) {
      return message.message_user?.profilePicture 
        ? `http://localhost:3000/${message.message_user.profilePicture}`
        : 'default_image_path_here'; 
    },
    handleFiles(type) {
      if (type === "image") {
        this.$refs.imageInp.click();
      } else if (type === "video") {
        this.$refs.videoInp.click();
      }
    },
 handleFilesChanges(event) {
    const file = event.target.files[0]; // Obtiene el primer archivo
    if (file) {
        const reader = new FileReader(); // Crea un nuevo FileReader

        reader.onload = (e) => {
            // Verifica si es una imagen
            if (file.type.startsWith("image/")) {
                this.imageSrc = e.target.result; // Asigna el Data URL a imageSrc
                console.log('new src::', this.imageSrc);
                this.image = file; // Almacena el archivo para otros usos
            } 
            // Verifica si es un video
            else if (file.type.startsWith("video/")) {
                this.videoSrc = e.target.result; // Asigna el Data URL a videoSrc
                console.log('new video src::', this.videoSrc);
                this.video = file; // Almacena el archivo para otros usos
            }
        };

        reader.onerror = (error) => {
            console.error('Error reading file:', error);
        };

        reader.readAsDataURL(file); // Lee el archivo como Data URL
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
    startRecording() {
      this.isRecording = true;
      this.recordingTime = 0;

      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };
        this.mediaRecorder.start();

        this.recordingInterval = setInterval(() => {
          this.recordingTime++;
        }, 1000);
      }).catch(error => {
        console.error('Error accessing microphone:', error);
      });
    },
    stopRecording() {
      this.isRecording = false;
      clearInterval(this.recordingInterval);
      this.mediaRecorder.stop();

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();

        reader.onload = (e) => {
          this.$socket.emit('chatMessage', {
            type: 'audio',
            content: e.target.result,
            chat_id: this.chat_id
          });
        };

        reader.readAsDataURL(audioBlob);
        this.audioChunks = [];
      };
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
      console.log('data: ', data)
      if (response.ok) {
        this.chat = data.chat;
        this.chat_id = data.chat.chat_id;
        this.messages = data.chat.messages;
        this.user = data.userToDisplayInfo;
        this.$socket.emit('joinRoom', this.chat_id);
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
  position: relative;
}

main {
  display: flex;
  width: 70%;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 80px;
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
  gap: 15px;
}

.footer-message-input {
  flex-grow: 1;
  display: flex;
  gap: 10px;
}

.footer-message-input input {
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
}

.footer-send-message-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #4CAF50;
  border-radius: 50%;
  color: white;
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
}

.message {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.message.friend {
  justify-content: flex-start;
}

.message.user {
  justify-content: flex-end;
  flex-direction: row-reverse;
}

.message-user-img {
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.message-img {
  width: 100%;
  height: auto;
  border-radius: 50%;
}

.message p {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 20px;
  max-width: 70%;
}

.user p {
  background-color: #4CAF50;
  color: white;
}
</style>