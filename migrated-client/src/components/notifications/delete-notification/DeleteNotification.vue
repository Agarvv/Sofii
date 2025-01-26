<template>
    <div 
      @click="closeNotification(notification.id)" 
      class="notification-close"
    >
      <i class="fa fa-close"></i>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    import { usePost } from '@/composables/usePost'
    import { apiService } from '@/api/ApiService'
    
    export default defineComponent({
        name: 'DeleteNotification',
        props: {
            notificationId: {
                type: Number,
                required: true 
            }
        },
        setup(props) {
            interface DeleteNotificationOptions {
                notificationId: number 
            }
            
            const { mutate } = usePost<DeleteNotificationOptions>({
                serviceFunc: (data: DeleteNotificationOptions) => apiService.post('/users/notificayi')
            })
            const closeNotification = async () => {
                
            }
        }
    })
</script>