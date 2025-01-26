<template>
<div> 
<div class="container"> 
  <div class="notifications">
      
    <div
    v-for="notification in notifications" :key="notification.id"
     :class="['notification', notification.readed ? 'read' : 'unread']">
        
   <div
   @click="goToNotification(notification.notification_type, notification.type_id)"
   class="notification-body"> 
      <div class="notification-user-img">
        <img style="width: 70px; border-radius: 50%" :src="notification.targetUser.profilePicture || '/images/default.jpeg'">
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
    import { defineComponent } from 'vue'
    
    export default defineComponent({
        name: 'NotificationsView'
    })
</script>

<style scoped src="./NotificationsView.css"></style>