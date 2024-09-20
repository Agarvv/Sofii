<template>
<div>
      <HeaderComponent :activePage="'create'" :user="usuario"/>
       <div class="create-container">
    <div class="f-column">
      <img style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" src="195196-2.jpg">
      <div class="fc-inp"> 
       <input v-model="content" placeholder="What's Up?">
      </div>
    </div>
    <div class="demostration-content">
      <img style="
       display: none;
       width: 100%;
       height: 250px;
       object-fit: cover;
       border-radius: 15px;
      " :src=" imageSource">
      <video style="
      display: none;
      width: 100%;
      height: 250px;
      object-fit: cover;
      border-radius: 15px;
      " controls>
        <source :src="videoSource">
      </video>
    </div>
    <div class="s-column">
     <div @click="openFileInput('imageInp')" class="sce-one">
       <font-awesome-icon icon="image"/>
       <input @change="handleImageChange" type="file" id="imageInp">
     </div>
     <div @click="openFileInput('videoInp')" class="sce-two">
       <font-awesome-icon :icon="video"/>
       <input @change="handleVideoChange" id="videoInp" type="file">
     </div>
     <div @click="submitForm" class="sce-three">
       <font-awesome-icon :icon="paperPlane"/>
     </div>
    </div>
  </div>


</div>
</template>

<script>
import HeaderComponent from './HeaderComponent'
import { createPost } from '../services/postService'
import { createVideo } from '../services/videoService'


export default {
    components: {
        HeaderComponent
    }, 
    mixins: [userMixin], 
    
  data() {
    return {
      photos: [],
      content: '',
      videoSource: null,
      imageSource: null
    };
  },
  methods: {
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
        this.photos.push(ev.target.result);
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
        this.photos.push(ev.target.result);
      };
    },
    async submitForm() {
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
        } catch (error) {
          console.log('error', e)
        }
      }

      if (this.videoSource) {
        const videoBlob = await fetch(this.videoSource).then(res => res.blob());
        formData.append('video', videoBlob, 'video.mp4');
        try {
          const data = await createVideo(formData) 
          console.log('all ok',data)
        } catch(e) {
          console.log('ERROR!', e)
        }
      }

    }
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
  margin: 0;
}

.create-container {
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.f-column {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.fc-inp {
  flex-grow: 1;
}

.fc-inp input {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  border: 1px solid #ddd;
  padding: 0 15px;
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

.s-column i {
  font-size: 20px; 
}
</style>
