<template>
  <LoadingComponent v-if="isLoading" />
  <SuccessComponent v-if="successMessage" :successMessage="successMessage" />
  <ErrorComponent v-if="errorMessage" :errorMessage="errorMessage" />

  <router-view/>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { apiStatusStore } from '@/store/apiStatusStore';
import { storeToRefs } from 'pinia';
import SuccessComponent from './shared/success/SuccessComponent.vue';
import ErrorComponent from './shared/error/ErrorComponent.vue';
import LoadingComponent from './shared/loading/LoadingComponent.vue';
import { useSocket } from './composables/useWebSocket';

export default defineComponent({
  components: {
    SuccessComponent,
    ErrorComponent,
    LoadingComponent
  },
  setup() {
    const { socket } = useSocket(); 

    const apiStore = apiStatusStore(); 
    const { isLoading, successMessage, errorMessage } = storeToRefs(apiStore);
    
    onMounted(() => {
  socket.instance.on('newNotification', (notification) => {
    console.log("new notification", notification);
  });
});


    return {
      isLoading,
      successMessage,
      errorMessage
    };
  }
})
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
</style>
