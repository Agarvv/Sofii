<template>
  <NotificationCard
    v-if="notification"
    :notification="notification"
    @hideNotification="hideNotification"
  /> 
  
  <LoadingComponent v-if="isLoading" />
  <SuccessComponent v-if="successMessage" :successMessage="successMessage" />
  <ErrorComponent v-if="errorMessage" :errorMessage="errorMessage" />

  <router-view/>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'; 
import { apiStatusStore } from '@/store/apiStatusStore';
import { storeToRefs } from 'pinia';
import SuccessComponent from './shared/success/SuccessComponent.vue';
import ErrorComponent from './shared/error/ErrorComponent.vue';
import LoadingComponent from './shared/loading/LoadingComponent.vue';
import { useSocket } from './composables/useWebSocket';
import NotificationCard from './shared/notification/NotificationCard.vue';

export default defineComponent({
  components: {
    SuccessComponent,
    ErrorComponent,
    LoadingComponent,
    NotificationCard
  },
  setup() {
    const notification = ref<any>(null); 
    
    const { socket } = useSocket(); 
    const apiStore = apiStatusStore(); 
    const { isLoading, successMessage, errorMessage } = storeToRefs(apiStore);
    
    onMounted(() => {
      socket.instance.on('newNotification', (newNotification) => {
        console.log("new notification", newNotification);
        notification.value = newNotification;
        setTimeout(() => {
          notification.value = null; 
        }, 5000);
      });
    });

    const hideNotification = () => {
      notification.value = null; 
    };

    return {
      isLoading,
      successMessage,
      errorMessage,
      notification,
      hideNotification 
    };
  }
});
</script>

<style>
* {
  font-family: 'Poppins', sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: inherit; 
}
.val-error {
  color: red; 
  padding: 15px;
}

button {
  border: none !important;
}
</style>