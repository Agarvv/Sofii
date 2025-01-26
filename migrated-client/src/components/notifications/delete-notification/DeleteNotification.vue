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
            const { mutate } = usePost<DeleteNotificationOptions>({
                serviceFunc: (data: DeleteNotificationOptions) => apiService.post('/users/notifications', data),
                successFunc: () => window.location.reload(),
                withError: true,
                withLoading: true 
            })
            
            const closeNotification = async () => {
                 await mutate({
                     notificationId: props.notificationId 
                 }) 
            }
            
            return { closeNotification } 
        }
    })
</script>