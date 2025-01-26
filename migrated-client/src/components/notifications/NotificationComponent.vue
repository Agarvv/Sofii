<template>
  <div v-if="notification">
    <div
      @click="goToNotification"
      class="notification-body"
     >
      <div class="notification-user-img">
        <img 
          style="width: 70px; border-radius: 50%" 
          :src="notification.targetUser.profilePicture"
        />
      </div>

      <div class="notification-details">
        <h2>{{notification.notification}}</h2>
      </div>
    </div>

    <div 
      @click="closeNotification(notification.id)" 
      class="notification-close"
    >
      <i class="fa fa-close"></i>
    </div>
    
  </div> 
</template>


<script lang="ts">
    import { defineComponent } from 'vue'
    import { Notification } from '@/types/notifications/Notification'
    
    export default defineComponent({
        name: 'NotificationComponent',
        props: {
            notification: {
                type: Object as () => Notification,
                required: true 
            }
        },
        setup(props) {
            const goToNotification = () => {
                
            }
            
            return { goToNotification } 
        }
    })
</script>