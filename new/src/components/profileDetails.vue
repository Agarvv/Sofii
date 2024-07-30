<template>
  <header>
    <h1>Profile Settings</h1>
  </header>

  <div class="container">
    <div class="user-details-section">
      <div class="profile-picture">
        <h4>Your Profile Picture</h4>
        <div @click="handlePhotoOpen" id="profile-picture-photo">
          <input @change="handleFileChanges($event, 'profile_pic')" style="display: none;" type="file" id="profilePhotoInput">
          <img :src="userNewData.profile_pic" id="profile-photo">
        </div>
      </div>

      <div @click="handlePhotoOpen()" class="banner">
        <h4>Your Banner</h4>
        <input @change="handleFileChanges($event, 'profile_banner')" type="file">
        <div class="banner-img">
          <img :src="userNewData.profile_banner">
        </div>
      </div>

      <div class="bio">
        <h4>Your Bio</h4>
        <div class="bio-inputs">
          <div class="bio-inp-flex-dir-column">
            <div class="bio-input">
              <input @input="setUserData($event, 'bio')" type="text" placeholder="Set BIO">
            </div>
            <div class="bio-submit">
              <button @click="saveAllChanges">SET AS BIO</button>
            </div>
          </div>
        </div>
      </div>

      <div class="native-city">
        <h4>Your Native City</h4>
        <div class="native-city-inputs">
          <div class="native-city-inp">
            <input @input="setUserData($event, 'native_city')" type="text" placeholder="Enter Your Native City">
          </div>
          <div class="native-city-btn">
            <button @click="saveAllChanges">Set As Native City</button>
          </div>
        </div>
      </div>

      <div class="ubication">
        <h4>Your Ubication</h4>
        <div class="ubication-inputs">
          <div class="ubication-inp">
            <input @input="setUserData($event, 'ubication')" type="text" placeholder="Enter Your Ubication">
          </div>
          <div class="ubication-btn">
            <button @click="saveAllChanges">Save</button>
          </div>
        </div>
      </div>

      <div class="civil-status">
        <h4>Your Civil Status</h4>
        <div class="civil-status-select">
          <select v-model="userNewData.civil_status">
            <option value="In couple">In Couple</option>
            <option value="Married">Married</option>
            <option value="Single">Single</option>
          </select>
        </div>
      </div>
    </div>

    <div class="save-button">
      <button @click="saveAllChanges">Guardar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profileDetails',
  data() {
    return {
      userNewData: {
        profile_pic: "",
        profile_banner: "",
        bio: "",
        native_city: "",
        ubication: "",
        civil_status: ""
      },
      originalData: {}
    }
  },
  methods: {
    async getUserData() {
        console.log('profile details user mixin', this.usuario)
      this.originalData = {
        profile_pic: this.usuario.profilePicture,
        profile_banner: this.usuario.banner,
        bio: this.usuario.bio,
        native_city: this.usuario.native_city,
        ubication: this.usuario.ubication,
        civil_status: this.usuario.civil_status
      };
      this.userNewData = { ...this.originalData };
    },
    handlePhotoOpen() {
        document.getElementById('profilePhotoInput').click()
    },
    setUserData(event, field) {
      this.userNewData[field] = event.target.value;
    },
    handleFileChanges(event, target) {
      const file = event.target.files[0];
      if (file) {
        this.userNewData[target] = URL.createObjectURL(file);
      }
    },
    async saveAllChanges() {
      const changes = {};
      for (const key in this.userNewData) {
        if (this.userNewData[key] !== this.originalData[key] && this.userNewData[key] !== "") {
          changes[key] = this.userNewData[key];
        }
      }
      console.log("Cambios detectados: ", changes);

      for (const key in changes) {
        try {
          const formData = new FormData();
          let response;
          switch (key) {
            case 'profile_pic':
              formData.append('profile-picture', changes[key]);
              response = await fetch('http://localhost:3000/api/sofi/set_profile_picture', {
                method: 'POST',
                body: formData,
                credentials: 'include'
              });
              break;
            case 'profile_banner':
              formData.append('profile-banner', changes[key]);
              console.log('random data changed banner')
              break;
            case 'bio':
              console.log('random data changed banner2')
              break;
            case 'native_city':
             console.log('random data changed banner3')
              break;
            case 'ubication':
             
              console.log('random data changed banner4')
              break;
            case 'civil_status':
              console.log('random data changed banner5')
              break;
            default:
              console.error(`No se encontró un endpoint para el campo ${key}`);
              continue;
          }
          if (response.ok) {
            console.log(`Cambio en ${key} guardado exitosamente`);
          } else {
            const errorData = await response.json();
            console.error(`Error al guardar ${key}: ${response.statusText}`, errorData);
          }
        } catch (error) {
          console.error(`Error al guardar ${key}: `, error);
        }
      }
    }
  },
  mounted() {
    this.getUserData();
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
  color: #333;
}

header {
  background-color: #007BFF;
  color: white;
  padding: 20px;
  text-align: center;
  border-bottom: 2px solid #0056b3;
  margin-bottom: 50px;
}

.container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.user-details-section {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.profile-picture, .banner, .bio, .native-city, .ubication, .civil-status {
  padding: 10px;
  margin-bottom: 20px;
}

.profile-picture h4, .banner h4, .bio h4, .native-city h4, .ubication h4, .civil-status h4 {
  margin-bottom: 10px;
  color: #007BFF;
}

#profile-picture-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

#profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #007BFF;
  object-fit: cover;
}

.banner .banner-img img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #007BFF;
}

.bio-input input, .native-city-inp input[type="text"], .ubication-inp input {
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.bio-submit button, .native-city-btn button, .ubication-btn button {
  width: 100%;
  height: 40px;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.bio-submit button:hover, .native-city-btn button:hover, .ubication-btn button:hover {
  background-color: #0056b3;
}

.civil-status-select select {
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
}

.save-button {
  margin-top: 20px;
  text-align: center;
}

.save-button button {
  width: 200px;
  height: 50px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button button:hover {
  background-color: #218838;
}

@media (max-width: 600px) {
  .user-details-section {
    width: 100%;
  }
}
</style>
