<template>
  <div class="user-card">
    <div class="user-details">
      <div class="user-picture">
        <img 
          style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" 
          :src="user.profilePicture ? apiUrl + '/' + user.profilePicture : '/images/default.jpeg'"
          alt="User Picture"
        />
      </div>
      <div class="username-job">
        <h4>{{user.username.length > 7 ? user.username.slice(0,7) + '..' : user.username}}</h4>
        <p class="job-title">{{ user.job ? user.job : 'No Job' }}</p>
      </div>
    </div>
    <div class="user-buttons">
      <div 
        @click="goToPage('/user/' + user.id)" 
        class="view-profile">
        <font-awesome-icon icon="user" />
      </div>
      <div 
        :style="isFollowed ? 'background-color: rgba(255, 255, 255, 0.7); color: gray;' : 'background-color: #f0f0f0; color: black;'" 
        @click="followUser" 
        class="follow">
        <font-awesome-icon :icon="isFollowed ? 'user-minus' : 'user-plus'" />
      </div>
    </div>
  </div>
</template>

<script>
import { followUser } from '../services/usersService'
import apiUrl from '../config'
export default {
  name: 'HomePageUserMustLike',
  props: {
    user: {}
  },
  data() {
    return {
      error: "",
      isFollowed: this.user.isFollowing,
      apiUrl: apiUrl
    }
  },
  methods: {
    async goToPage(route) {
      this.$router.push(route)
    },
    async followUser() {
      try {
        const data = await followUser(this.user)
        this.isFollowed = data.followed || !data.unfollowed
      } catch (e) {
        console.log("error", e)
      }
    }
  }
}
</script>

<style scoped>
.user-card {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.user-details {
  display: flex;
  align-items: center;
  gap: 10px;
}

.username-job h4 {
  margin: 0;
  font-size: 1.1em;
}

.job-title {
  color: gray;
  margin: 0;
  font-size: 0.9em;
}

.user-buttons {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.view-profile,
.follow {
  background: #E4E4E4;
  padding: 8px 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.view-profile:hover,
.follow:hover {
  background: #d0d0d0;
}
</style>
