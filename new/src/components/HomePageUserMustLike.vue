<template>
<div>
 <div class="user-card">
    <div class="user-details">
      <div class="user-picture">
        <img style="
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        " :src="'http://localhost:3000/' + user.profilePicture">
      </div>
      <div class="username-job">
        <h4>{{user.username}}</h4>
        <p style="color: gray">{{user.job ? user.job : 'Not Specified Job.'}}</p>
      </div>
    </div>
    <div class="user-buttons">
      <div @click="goToPage('/user/' + user.user_id)" class="view-profile">
        <font-awesome-icon icon="user"/>
      </div>
       <div   :style="isFollowed ? 'background-color: rgba(255, 255, 255, 0.7); color: gray;' : 'background-color: #f0f0f0; color: black;'" 
               @click="followUser" 
               class="follow">
    <font-awesome-icon :icon="isFollowed ? 'user-minus' : 'user-plus'" />

    <span>{{ isFollowed ? 'Unfollow' : 'Follow' }}</span>
     </div>
    </div>
  </div>
  </div>
</template>

<script>
import {
followUser
} from('../services/usersService')
    export default {
        name: 'HomePageUserMustLike',
        props: {
            user: {}
        },
        data() {
            return {
               error: "",
               // IS FOLLOWED MEANS THAT YOU ARE OR NOT FOLLOWING THIS USER.=
               // IF YOU DO NOT, THEN IT WILL BE FALSE BUT-
               // IF YOU DO? THEN IT WILL BE TRUE
               isFollowed: this.user.isFollowing
            }
        },
        methods: {
          async goToPage(route) {
             this.$router.push(route)
          },
          async followUser() {
            try {
               const data = await followUser(this.user)
               console.log('receibed data from follow', data)
               if(data.followed) {
                this.isFollowed = true
               } else if(data.unfollowed) {
                this.isFollowed = false
               }
            } catch(e) {
                this.error = 'Ooops, Something Went Wrong On The Server...'
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
}


.user-details {
  display: flex;
  align-items: center;
  gap: 5px;
}

.user-buttons {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.user-buttons .view-profile, .follow {
  background: #E4E4E4;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
</style>