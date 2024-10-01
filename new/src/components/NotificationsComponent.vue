<template>
<div> 
<HeaderComponent :activePage="'notifications'" :user="usuario"/>
    
<div class="container"> 
  
  <div class="notifications">
      
    
    <div v-if="notifications.length > 0" class="notifications-header">
      <h2>Your Notifications</h2>
    </div>
    
      <div class="empty-notifications" v-if="notifications.length == 0">
          <h4>You Do Not Have Notifications...</h4>
      </div>
    
    <div v-for="notification in notifications" :key="notification.id" 
     :class="['notification', notification.readed ? 'read' : 'unread']">
      
    
   <div class="notification-body"> 
      <div class="notification-user-img">
        <img style="width: 70px; border-radius: 50%" :src="notification.targetUser.profilePicture ? 'http://localhost:3000/' + notification.targetUser.profilePicture : '/images/default.jpeg'">
      </div>
      
      <div class="notification-details">
        <h2>{{notification.notification}}</h2>
        <p style="color: gray">{{notification.createdAt}}</p>
      </div>
    </div>
    
    <div @click="closeNotification(notification.id)" class="notification-close">
      <font-awesome-icon icon="close"/>
    </div>
      
    </div> <!-- NOTIFICATION DIV END -->
  </div>
</div>
</div>
</template>

<script>
import HeaderComponent from './HeaderComponent'
import ErrorComponent from './ErrorComponent'
import LoadingComponent from './LoadingComponent'

import { getUserNotifications, destroyUserNotification } from '../services/usersService'
import { mapGetters, mapActions } from 'vuex';


    export default {
        components: {
            HeaderComponent
        }, 
        name: 'NotificationsComponent',
        data() {
            return {
                notifications: [],
                error: "",
                loading: true 
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            ...mapActions(['fetchUser']),
            async getUserNotifications() {
                try {
                    const data = await getUserNotifications() 
                    console.log("data", data)
                    this.notifications = data.notifications
                } catch(e) {
                    console.log(e)
                    this.error = "Something Went Wrong..."
                } finally {
                    this.loading = false
                }
            },
        async closeNotification(n_id) {
         try {
            const data = await destroyUserNotification(n_id)
            
            const index = this.notifications.findIndex(notification => notification.id === n_id);

            if (index !== -1) {
                this.notifications.splice(index, 1);
                
            } else {
                console.warn(`Notification Not Found... ${notification_id}.`);
            }
            
         } catch(e) {
             console.log('error', e)
             return 
         }
      }
},
            
   async created() {
        await this.fetchUser()
        if(this.user) {
            await this.getUserNotifications()
        }
   },
    
}
</script>

<style scoped>
    * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

header {
  background-color: #4A90E2;
  color: white;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 10px 10px;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}

.notifications-header {
  margin-bottom: 20px;
  text-align: center;
}

.container .notifications {
  width: 80%;
  max-width: 800px;
  height: 100%;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;
}

.notifications .notification {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #eee;
  transition: background 0.3s;
}



.notifications .notification:hover {
  background-color: #f9f9f9;
  transform: scale(1.02);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.notification-body {
  display: flex;
  align-items: center;
  gap: 15px;
}

.notification-user-img img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.notification-details h4 {
  margin: 0;
  color: #333;
}

.notification-details p {
  margin: 0;
  color: #777;
}

.notification-close i {
  font-size: 20px;
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
}

.notification-close i:hover {
  color: #e74c3c;
}

.empty-notifications {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: gray;
    
}

@media (max-width: 600px) {
  .container .notifications {
    width: 100%;
  }

  .notification-body {
    flex-direction: column;
    align-items: flex-start;
  }
}

</style>