<template>
  <div id="app">
    <header>
      <div>
        <font-awesome-icon icon="arrowLeft" />
      </div>

      <div>
        <h1>{{ username }}</h1>
      </div>

      <div>
        <img style="width: 50px; border-radius: 50%;" :src="profileImage" />
      </div>
    </header>

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
export default {
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
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (ev) => {
        if (this.photos.length >= 10) {
          alert('Has excedido la cantidad máxima de imágenes.');
          return;
        }
        this.photos.push(ev.target.result);
        this.imageSource = ev.target.result;
        console.log('image source: ', this.imageSource);
      };
    },
    handleVideoChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (ev) => {
        this.videoSource = ev.target.result;
      };
    },


    async submitForm() {
  const formData = new FormData();
  formData.append('description', this.content);
  formData.append('privatePost', false);
  formData.append('only_friends', false);
  
  if (this.imageSource) {
    const imageBlob = await fetch(this.imageSource).then(res => res.blob());
    console.log('Image BLOB: ', imageBlob)
    formData.append('postPicture', imageBlob);
  }
  
  if (this.videoSource) {
    const videoBlob = await fetch(this.videoSource).then(res => res.blob());
    formData.append('videoSource', videoBlob, 'video.mp4');
  }

  const response = await fetch('http://localhost:3000/api/sofi/createPost', {
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
  padding: 10px; /* Aumenté el padding para más espacio */
}

.container .form form {
  background: #03B9FF; /* Cambié el color de fondo */
  padding: 20px; /* Añadí un padding para separar del borde */
  border-radius: 10px; /* Redondeé los bordes */
}

.form-input {
  display: flex;
  gap: 20px; /* Aumenté el espacio entre los elementos */
  align-items: center;
}

.form-input-input {
  width: 100%;
  height: 100px;
}

.form-input-input input {
  width: 100%;
  padding: 10px;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px; /* Añadí margen arriba para separar de los botones */
}

.form-buttons .icons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px; /* Añadí espacio entre iconos */
  font-size: 20px;
}

.form-buttons .icons div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #007BFF; /* Color de fondo de los íconos */
  border-radius: 5px; /* Redondeé los botones de íconos */
}

.form-buttons .post-button {
  width: 30%;
  margin-top: 0; /* Ajusté el margen superior */
}

.form-buttons button {
  width: 100%;
  padding: 10px;
  font-size: 18px;
  font-weight: 700;
  color: black;
  border: .3px solid white;
  border-radius: 10px;
  cursor: pointer;
  background: #68FF03; /* Color de fondo del botón */
}

.form-image {
  width: 100%;
  margin-top: 20px;
  display: flex;
  gap: 20px;
  overflow: auto;
}

.form-image img {
  width: 100px;
  height: 100px; /* Asegura que las imágenes mantengan su proporción */
  object-fit: cover; /* Mantiene el ajuste de las imágenes dentro del contenedor */
}

.form-video {
  margin-top: 20px;
  max-width: 100%;
  overflow: hidden;
}

.form-video video {
  width: 100%;
  height: auto;
}
</style>
