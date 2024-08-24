<template>
  <div>
      
      <HeaderComponent :activePage="'create'" :user="usuario"/>
    
    <div class="container">
      <div class="form">
        <form @submit.prevent="submitForm">
          <div class="form-input">
            <div class="form-input-user-img">
              <img :src="profileImage" style="width: 50px; border-radius: 50%;" />
            </div>
            <div class="form-input-input">
              <input v-model="content" placeholder="What's Up?" />
            </div>
          </div>
          <div class="form-buttons">
            <div class="icons">
              <div class="image" @click="openFileInput('imageInp')">
                <font-awesome-icon icon="image" />
                <input id="imageInp" type="file" style="display: none;" @change="handleImageChange" />
              </div>
              <div class="video" @click="openFileInput('videoInp')">
                <font-awesome-icon icon="video" />
                <input id="videoInp" type="file" style="display: none;" @change="handleVideoChange" />
              </div>
              <div class="emotion">
                <font-awesome-icon icon="smile" />
              </div>
              <div class="tags">
                <font-awesome-icon icon="hashtag" />
              </div>
            </div>
            <div class="post-button">
              <button type="submit">
                <i class="fa fa-upload"></i>
                Upload
              </button>
            </div>
          </div>
          <div class="form-image">
            <img v-for="(photo, index) in photos" :key="index" :src="photo" class="uploaded-photo" />
          </div>
          <div class="form-video">
            <video controls v-if="videoSource" class="uploaded-video">
              <source :src="videoSource" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './HeaderComponent'
import userMixin from '../mixins/userMixin'

export default {
    components: {
        HeaderComponent
    }, 
    mixins: [userMixin], 
    
  data() {
    return {
      username: 'Sofii',
      profileImage: '',
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
        alert('Ya has seleccionado un video. Solo puedes subir una imagen o un video.');
        return;
      }

      if (this.photos.length > 0) {
        alert('You cannot add more than 1 image.');
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
        alert('Ya has seleccionado una imagen. Solo puedes subir una imagen o un video.');
        return;
      }

      if (this.videoSource) {
        alert('You cannot add more than 1 video.');
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
        console.log('Image BLOB: ', imageBlob);
        formData.append('postPicture', imageBlob, 'image.jpg');
      }

      if (this.videoSource) {
        const videoBlob = await fetch(this.videoSource).then(res => res.blob());
        formData.append('video', videoBlob, 'video.mp4');
      }

      let url;
      if (this.videoSource) {
        url = 'http://localhost:3000/api/sofi/add_video';
      } else if (this.imageSource) {
        url = 'http://localhost:3000/api/sofi/createPost';
      } else {
        console.log('No image or video to upload.');
        return;
      }
      
      console.log('Fetching URL: ', url)

      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (!response.ok) {
        console.log('Response not Ok.');
      }

      const data = await response.json();
      console.log(data);
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

header {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
}

header i {
  font-size: 25px;
}

.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container .form {
  color: white;
  width: 100%;
  height: 100%;
  padding: 10px;
}

.container .form form {
  background: #03B9FF;
  padding: 20px;
  border-radius: 10px;
}

.form-input {
  display: flex;
  align-items: center;
}

.form-input-input input {
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  width: 100%;
  margin-left: 10px;
}

.form-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icons {
  display: flex;
}

.icons div {
  margin-right: 10px;
  font-size: 18px;
}

.post-button button {
  background: #0862aa;
  border: none;
  color: white;
  border-radius: 10px;
  padding: 10px 15px;
  cursor: pointer;
}

.post-button button i {
  margin-right: 5px;
}

.form-image {
  margin-top: 10px;
}

.uploaded-photo {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 10px;
}

.uploaded-video {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 10px;
}
</style>
