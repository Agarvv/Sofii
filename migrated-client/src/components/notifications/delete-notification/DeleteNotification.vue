<template>
    <div 
      @click="closeNotification" 
      class="notification-close"
    >
      <i class="fa fa-close"></i>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { usePost } from '@/composables/usePost'
    import { useGet } from '@/composables/useGet'
    import { apiService } from '@/api/ApiService'

    interface DeleteNotificationOptions {
        notificationId: number 
    }

    export default defineComponent({
        name: 'DeleteNotification',
        props: {
            notificationId: {
                type: Number,
                required: true 
            }
        },
        setup(props) {
            
            
            const closeNotification = async () => {
                const data = await useGet<string>({
                     endpoint: `/users/notifications/delete/${props.notificationId}`,
                     withError: true 
                 })

                 console.log("data", data)
                // window.location.reload(); 
            }
            
            return { closeNotification } 
        }
    })
</script>