<template>
  <div> 
    <div class="container"> 
      <div class="notifications">
        <NotificationComponent
          v-for="notification in data.notifications"
          :notification="notification"
          :key="notification.id"
        /> 
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue'
    import NotificationComponent from '@/components/notifications/NotificationComponent'
    import { useGet } from '@/composables/useGet'
    import { Notification } from '@/types/notifications/Notification'
    
    export default defineComponent({
        name: 'NotificationsView',
        components: {
            NotificationComponent
        },
        setup() {
            const data = ref<Notification[]>([]); 
            
            const getNotifications = async () => {
                const response = await useGet<Notification[]>({
                    endpoint: '/users/notifications',
                    withError: true 
                })
                
                data.value = response 
                console.log("data from notifications", data)
            }

            onMounted(() => {
                getNotifications(); 
            })

            return { data }
        }
    })
</script>

<style scoped src="./NotificationsView.css"></style>