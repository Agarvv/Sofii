<template> 
   <SendResetPasswordForm />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SendResetPasswordForm from '@/components/auth/send-reset-password/SendResetPasswordForm.vue';

  export default defineComponent({
    name: 'SendResetPasswordView',
    components:  {
      SendResetPasswordForm
    }
  })
</script>