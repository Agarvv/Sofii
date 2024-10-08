<template>
<div class="user-card">
  <div class="user-card-user-img">
    <img style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;"
     :src="user.profilePicture || '/images/default.jpeg'">
  </div>
  <div class="user-card-details">
    <h3>{{user.username}}</h3>
    <p style="color: gray">{{user.job}}</p>
    <div @click="goToPage('/user/' + user.id)" v-show="!isSelf" class="user-buttons">
      <button class="view-profile-btn">View Profile</button>
    </div>
  </div>
</div>

</template>

<script>
import { followUser } from '../services/usersService'


    export default {
        name: 'UserCard',
        props: {
            user: {}
        }, 
        data() {
            return {
                isSelf: this.user.isSelf
            }
        },
        methods: {
            goToPage(route) {
                this.$router.push(route)
            }
        }
    }
</script>

<style scoped>

.user-card-details {
  width: 100%;
}

.user-card {
  width: 100%;
  box-shadow: 10px;
  display: flex;
  gap: 10px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}

.user-buttons {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
}

.user-buttons button {
  height: 35px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
}


</style>
