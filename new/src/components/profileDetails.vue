<template>

<SuccessComponent v-if="successMessage" :success="successMessage"/>

<ErrorComponent v-if="error" :error="error"/>

<LoadingComponent v-if="loadingData || loadingSetData" 
  :message="loadingData ? 'Loading Your Data, Please Wait...' : 'Setting Your Data, Please Wait...'"/>

  <header>
    <h1>Profile Settings</h1>
  </header>

<div class="wrapper">
  <div class="container">
    <div class="user-details-section">
      <div class="profile-picture">
        <h4>Your Profile Picture</h4>
        <div @click="handlePhotoOpen" id="profile-picture-photo">
          <input @change="handleFileChanges($event, 'profile_pic')" style="display: none;" type="file" id="profilePhotoInput">
          <img :src="userNewData.profile_pic 
           ? userNewData.profile_pic 
           : (user.user_picture 
               ? apiUrl + '/' + usuario.user_picture 
               : '/images/default.jpeg')" 
          id="profile-photo">
        </div>
      </div>

      <div @click="handleBannerOpen" class="banner">
        <h4>Your Banner</h4>
        <input @change="handleFileChanges($event, 'profile_banner')" style="display: none;" type="file" id="profileBannerInput">
        <div class="banner-img">
          <img :src="userNewData.profile_banner 
           ? userNewData.profile_banner 
           : (user.user_banner 
               ? apiUrl + '/' + usuario.user_banner 
               : '/images/default_banner.webp')" 
            id="profile-banner">
        </div>
      </div>

      <div class="bio">
        <h4>Your Bio</h4>
        <div class="bio-inputs">
          <input :value="usuario.user_bio" @input="setUserData($event, 'bio')" type="text" placeholder="Set BIO">
        </div>
        <div class="bio-submit">
          <button @click="saveAllChanges">SET AS BIO</button>
        </div>
      </div>

      <div class="native-city">
        <h4>Your Native City</h4>
        <div class="native-city-inputs">
          <input :value="usuario.user_native_city" @input="setUserData($event, 'native_city')" type="text" placeholder="Enter Your Native City">
        </div>
        <div class="native-city-btn">
          <button @click="saveAllChanges">Set As Native City</button>
        </div>
      </div>

      <div class="ubication">
        <h4>Your Ubication</h4>
        <div class="ubication-inputs">
          <input :value="usuario.user_ubication" @input="setUserData($event, 'ubication')" type="text" placeholder="Enter Your Ubication">
        </div>
        <div class="ubication-btn">
          <button @click="saveAllChanges">Save</button>
        </div>
      </div>

      <div class="civil-status">
        <h4>Your Civil Status</h4>
        <div class="civil-status-select">
          <select :value="usuario.user_civil_status" v-model="userNewData.civil_status">
            <option value="In couple">In Couple</option>
            <option value="Married">Married</option>
            <option value="Single">Single</option>
          </select>
        </div>
      </div>

      <div class="gender">
        <h4>Your Gender</h4>
        <div class="gender-select">
          <select :value="usuario.user_gender" v-model="userNewData.gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
      </div>

      <div class="job">
        <h4>Your Job</h4>
        <div class="job-inputs">
          <input :value="usuario.user_job" @input="setUserData($event, 'job')" type="text" placeholder="Enter Your Job Title">
        </div>
        <div class="job-btn">
          <button @click="saveAllChanges">Set As Job</button>
        </div>
      </div>
    </div>

    <div class="save-button">
      <button @click="saveAllChanges">Save All</button>
    </div>
  </div>

  </div>
</template>

<script> 
import SuccessComponent from './SuccessComponent'
import ErrorComponent from './ErrorComponent'
import LoadingComponent from './LoadingComponent'
import { mapGetters, mapActions } from 'vuex';
import apiUrl from '../config'
import { fetchUrl } from '../helpers/fetchUrl'

export default {
    components: {
       SuccessComponent,
       ErrorComponent,
       LoadingComponent
    },
  name: 'profileDetails',
  computed: {
        //The actual user 
      ...mapGetters(['user'])
  },
  data() {
    return {
      //The user new data Object
      userNewData: {
        profile_pic: "",    
        profile_banner: "", 
        bio: "",                
        native_city: "",        
        ubication: "",          
        civil_status: "",   
        gender: "",         
        job: ""             
      },
      originalData: {},
      success: null,
      successMessage: "",
      changes: [],
      apiUrl: apiUrl,
      error: "",
      loadingData: true,
      loadingSetData: false
    };
  },
  methods: {
      //Method for get the actual user
    ...mapActions(['fetchUser']),
    
    
    async getUserData() {
      try {
          await this.fetchUser()
          this.originalData = {
        profile_pic: this.user.profilePicture,
        profile_banner: this.user.banner,
        bio: this.user.bio,
        native_city: this.user.native_city,
        ubication: this.user.ubication,
        civil_status: this.user.civil_status,
        gender: this.user.gender,
        job: this.user.job
      };
      this.userNewData = { ...this.originalData };
      } catch(e) {
          this.error = "Something Went Wrong While Loading Your Data..."
          console.log('ERROR!', e)
      } finally {
          this.loadingData = false 
      }
    },
    
    
    handlePhotoOpen() {
      document.getElementById('profilePhotoInput').click();
    },
    handleBannerOpen() {
      document.getElementById('profileBannerInput').click();
    },
    
    
    setUserData(event, field) {
      this.userNewData[field] = event.target.value;
    },
    
    
    handleFileChanges(event, target) {
      const file = event.target.files[0];
      if (file) {
        this.userNewData[target] = file; // Store the file directly
      }
    },
    
    async saveAllChanges() {
    const changes = {};
    this.changes = []; 

    for (const key in this.userNewData) {
        if (this.userNewData[key] !== this.originalData[key] && this.userNewData[key] !== "") {
            changes[key] = this.userNewData[key];
        }
    }

    for (const key in changes) {
        try {
            this.loadingSetData = true;
            let response;
            const formData = new FormData();
            
            switch (key) {
    case 'profile_pic':
        formData.append('profile-picture', changes[key]);
        response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/set_profile_picture', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        break;
    case 'profile_banner':
        formData.append('profile-banner', changes[key]);
        response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/set_profile_banner', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        break;
    case 'bio':
        response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/set_bio', {
            method: 'POST',
            body: JSON.stringify({ bio: changes[key] }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        break;
    case 'native_city':
        response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/set_native_city', {
            method: 'POST',
            body: JSON.stringify({ native_city: changes[key] }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        break;
    case 'ubication':
        response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/set_ubication', {
            method: 'POST',
            body: JSON.stringify({ ubication: changes[key] }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        break;
    case 'civil_status':
        response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/set_civil_status', {
            method: 'POST',
            body: JSON.stringify({ civil_status: changes[key] }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        break;
    case 'gender':
        response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/set_gender', {
            method: 'POST',
            body: JSON.stringify({ gender: changes[key] }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        break;
    case 'job':
        response = await fetch(process.env.VUE_APP_API_URL + '/api/sofi/set_job', {
            method: 'POST',
            body: JSON.stringify({ job: changes[key] }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        break;
    default:
        console.error(`No endpoint found for field ${key}`);
        continue;
}
            
            
            
            
            

            if (response.ok) {
                this.changes.push(key); 
            } else {
                const errorData = await response.json();
                console.error(`Error saving ${key}: ${response.statusText}`, errorData);
            }
        } catch (error) {
            this.error = "Something Went Wrong...";
            console.error(`Error saving ${key}: `, error);
        } finally {
            this.loadingSetData = false;
        }
    }

    if (this.changes.length > 0) {
        const changesList = this.changes.join(', ');
        this.successMessage = `Your ${changesList} has been changed successfully.`;
        this.success = true;
        console.log(this.successMessage);
    }
}
    
  },
 async mounted() {
        await this.getUserData()
  }
};
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

.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 80%;
  display: flex;
  flex-direction: column;
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
  gap: 20px;
}

.profile-picture, .banner, .bio, .native-city, .ubication, .civil-status, .gender, .job {
  padding: 10px;
  margin-bottom: 20px;
}

.profile-picture h4, .banner h4, .bio h4, .native-city h4, .ubication h4, .civil-status h4, .gender h4, .job h4 {
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

.bio-inputs input, .native-city-inputs input, .ubication-inputs input, .job-inputs input {
  width: 100%;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.bio-submit button, .native-city-btn button, .ubication-btn button, .job-btn button {
  width: 100%;
  height: 40px;
  background: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.bio-submit button:hover, .native-city-btn button:hover, .ubication-btn button:hover, .job-btn button:hover {
  background-color: #0056b3;
}

.civil-status-select select, .gender-select select {
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

.success-header {
  background: rgb(15, 221, 15);
  color: white;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  padding: 15px;
}

@media (max-width: 600px) {
  .user-details-section {
    width: 100%;
  }
  
  .container {
      width: 100%;
  }
}
</style>