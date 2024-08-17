<template>
    <header>
  <h1>Sofii</h1>
</header>




<div class="container"> 
  
  <div class="notifications">
    
    <div class="notifications-header">
      <h2>Your Notifications</h2>
    </div>
    
    <div v-for="notification in notifications" :key="notification.id" class="notification">
      
      
    
   <div class="notification-body"> 
      <div class="notification-user-img">
        <img style="width: 70px; border-radius: 50%" :src="'http://localhost:3000/' + notification.targetUser.profilePicture">
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


</template>

<script>
    export default {
        name: 'NotificationsComponent',
        data() {
            return {
                notifications: []
            }
        },
        methods: {
            async getUserNotifications() {
                const response = await
                fetch('http://localhost:3000/api/sofi/notifications', {
                    method: 'GET',
                    credentials: 'include'
                })
                
                const data = await response.json()
                console.log('Server data notification: ', data)
                this.notifications = data.notifications
            },
            async closeNotification(notification_id) {
    console.log('Close notification Method Called: ', notification_id);

    const response = await fetch('http://localhost:3000/api/sofi/destroy_notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ notification_id: notification_id }),
        credentials: 'include'
    });

    const data = await response.json();
    console.log('server data destroy notification: ', data);

    if (response.ok) {
        // Encuentra el índice de la notificación en el array
        const index = this.notifications.findIndex(notification => notification.id === notification_id);

        if (index !== -1) {
            // Si se encontró, elimínala del array
            this.notifications.splice(index, 1);
            console.log(`Notificación con ID ${notification_id} eliminada.`);
        } else {
            console.warn(`No se encontró la notificación con ID ${notification_id}.`);
        }
    }
},
            
        },
        async created() {
            this.getUserNotifications()
        },
        async mounted() {
            
        }
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