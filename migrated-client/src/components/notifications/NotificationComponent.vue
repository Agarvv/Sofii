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

      <DeleteNotification
      :notificationId="notification.id"
    /> 
    </div>

  
    
  </div> 
</template>


<script lang="ts">
    import { defineComponent } from 'vue'
    import { Notification } from '@/types/notifications/Notification'
    import DeleteNotification from './delete-notification/DeleteNotification.vue'
    
    export default defineComponent({
        name: 'NotificationComponent',
        props: {
            notification: {
                type: Object as () => Notification,
                required: true 
            }
        },
        components: {
            DeleteNotification
        }, 
        setup(props) {
            const goToNotification = () => {
                console.log("soon")
            }
            
            return { goToNotification } 
        }
    })
</script>

<style scoped src="./NotificationComponent.css"></style>