<template>
    <HeaderComponent activePage="create"/> 
    
    <ErrorComponent v-if="error" :error="error"/>
    
    <LoadingComponent v-if="loading" message="Creating, Please wait..."/>
    
<div class="container">
    
  <div class="create-container">
    <div class="f-column">
      <img style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" :src="user.user_picture ? apiUrl + '/' + user.user_picture : '/images/default.jpeg' ">
      <div class="fc-inp"> 
       <input v-model="content" placeholder="What's Up?">
      </div>
    </div>
    <div class="demostration-content">
      <img v-if="imageSource" style="
       width: 100%;
       height: 250px;
       object-fit: cover;
       border-radius: 15px;
      " :src="imageSource">
      <video v-if="videoSource"
       :key="videoSource"  
       :src="videoSource"  
       style="width: 100%; height: 250px; object-fit: cover; border-radius: 15px;"
       controls>
     </video>
    </div>
    <div class="s-column">
     <div @click="openFileInput('imageInp')" class="sce-one">
      <font-awesome-icon icon="image"/>
       <input  style="display: none" @change="handleImageChange" type="file" id="imageInp">
     </div>
     <div @click="openFileInput('videoInp')" class="sce-two">
      <font-awesome-icon icon="video"/>
       <input style="display: none" @change="handleVideoChange" id="videoInp" type="file">
     </div>
     <div @click="submitForm" class="sce-three">
        <font-awesome-icon icon="paper-plane"/>
     </div>
    </div>
  </div>


</div>
</template>

<script>
import ErrorComponent from './ErrorComponent'
import LoadingComponent from './LoadingComponent'
import HeaderComponent from './HeaderComponent'

import apiUrl from '../config'
import { createPost } from '../services/postService'
import { createVideo } from '../services/videoService'
import { mapGetters, mapActions } from 'vuex';


export default {
  
    components: {
          HeaderComponent,
          LoadingComponent,
          ErrorComponent
      },
  data() {
    return {
      photos: [],
      content: '',
      videoSource: null,
      imageSource: null,
      loading: false,
      error: "",
      apiUrl: apiUrl
    };
  },
  computed: {
      ...mapGetters(['user'])
  },
  methods: {
      ...mapActions(['fetchUser']),
    openFileInput(inputId) {
      document.getElementById(inputId).click();
    },
    handleImageChange(e) {
      if (this.videoSource) {
        return;
      }

      if (this.imageSource) {
        return;
      }

      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (ev) => {
        this.imageSource = ev.target.result;
        console.log('image source: ', this.imageSource);
      };
    },
    handleVideoChange(e) {
      if (this.imageSource) {
        return;
      }

      if (this.videoSource) {
        return;
      }

      const file = e.target.files[0];
      if (!file) return;


      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (ev) => {
        this.videoSource = ev.target.result;
        console.log('video source', this.videoSource)
      };
    },
    async submitForm() {
        
        if(this.loading) {
            alert('please wait')
        }
        
        if(this.error) {
            this.error = ""
        }
       
      this.loading = true 
      const formData = new FormData();
      formData.append('description', this.content);
      formData.append('privatePost', false);
      formData.append('only_friends', false);

      if (this.imageSource) {
        const imageBlob = await fetch(this.imageSource).then(res => res.blob());
        formData.append('postPicture', imageBlob, 'image.jpg');
        try {
          const data = await createPost(formData)
          console.log('all ok', data)
          this.$router.push('/')
     
        } catch (e) {
           console.log("Something Went Wrong...")
           this.error = "Something Went Wrong..."
        } finally {
            this.loading = false
        }
      }

      if (this.videoSource) {
        const videoBlob = await fetch(this.videoSource).then(res => res.blob());
        formData.append('video', videoBlob, 'video.mp4');
        try {
          const data = await createVideo(formData) 
          console.log('all ok', data)
          this.loading = false 
          this.$router.push('/')
        } catch(e) {
           this.loading = false
           this.error = "Something Went Wrong..."
        }
      }

    }
  },
  async mounted() {
      await this.fetchUser()
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center; /* Centramos horizontalmente */
  align-items: center; /* Centramos verticalmente */
}

.container {
  width: 100%;
  padding: 20px;
}

.create-container {
  width: 70%; /* Ajuste a un 70% del ancho de la pantalla */
  max-width: 800px; /* Limitar el ancho máximo */
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto; 
}

.f-column {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.fc-inp {
  width: 100%;
}

.fc-inp input {
  background: red;
  width: 100%; 
  height: 40px;
  border-radius: 20px;
  border: 1px solid #ddd;
  font-size: 14px;
  background: #e0e0e0;
  transition: border-color 0.3s;
}

.fc-inp input:focus {
  outline: none;
  border-color: #007bff;
}

.s-column {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 10px;
}

.s-column div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  transition: background-color 0.3s, transform 0.3s;
}

.s-column div:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

.demostration-content img,
.demostration-content video {
  width: 100%; 
  max-height: 250px; 
  object-fit: cover;
  border-radius: 15px;
}

@media(max-width: 600px) {
    .create-container {
        width: 100%;
    }
}
</style>
