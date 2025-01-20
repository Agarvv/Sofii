<template>
  <LoadingComponent v-if="isLoading" />
  <SuccessComponent v-if="successMessage" :successMessage="successMessage" />
  <ErrorComponent v-if="errorMessage" :errorMessage="errorMessage" />

  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { apiStatusStore } from '@/store/apiStatusStore';
import { storeToRefs } from 'pinia';
import SuccessComponent from './shared/success/SuccessComponent.vue';
import ErrorComponent from './shared/error/ErrorComponent.vue';
import LoadingComponent from './shared/loading/LoadingComponent.vue';

export default defineComponent({
  components: {
    SuccessComponent,
    ErrorComponent,
    LoadingComponent
  },
  setup() {
    const apiStore = apiStatusStore(); 
    const { isLoading, successMessage, errorMessage } = storeToRefs(apiStore);

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

.val-error {
  color: red; 
  padding: 15px;
}
</style>
