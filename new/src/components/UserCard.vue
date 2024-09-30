<template>
<div class="user-card">
  <div class="user-card-user-img">
    <img style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" :src="'http://localhost:3000/' + user.profilePicture">
  </div>
  <div class="user-card-details">
    <h3>{{user.username}}</h3>
    <p style="color: gray">{{user.job}}</p>
    <div class="user-buttons">
      <button @click="followUser(user.id)" class="follow-btn">{{isFollowing ? 'Unfollow' : 'Follow'}}</button>
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
                isFollowing: user.following
            }
        },
        methods: {
            goToPage(route) {
                this.$router.push(route)
            },
            async followUser(user_id) {
                try {
                    const data = await followUser(user_id)
                    if(data.followed && !data.unfollowed) {
                        this.isFollowing = true
                    } else if(data.unfollowed && !data.followed) {
                        this.isFollowing = false
                    }
                } catch(e) {
                    return 
                    console.log("ERROR!!", e)
                }
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
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  width: 100%;
}

.user-buttons button {
  height: 35px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
}

.user-buttons .follow-btn {
  background: black;
  color: white;
  
}

</style>
