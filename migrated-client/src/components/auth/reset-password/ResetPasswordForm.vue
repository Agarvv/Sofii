<template>
    <div>
      <div class="out">
        <div class="container">
          <h2>Change Your Password</h2>
          
          <form @submit.prevent="handleSubmit">
            <div class="inp-box">
              <input v-model="password" type="password" placeholder="New Password" required />
              <i class="fas fa-lock icon"></i>
              <span v-if="errors.password" class="val-error">{{ errors.password }}</span>
            </div>
  
            <div class="btn-box">
              <button type="submit">
                Update Your Password
                <i class="fas fa-arrow-left"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';
  import { apiService } from '@/api/ApiService';
  import { usePost } from '@/composables/usePost';

  interface ResetPasswordFormValues {
    email: string;
    token: string;
    password: string; 
  }

  export default defineComponent({
    name: 'ResetPassword',
    setup() {
      const route = useRoute();
      const email = ref<string>('');  
      const token = ref<string>('');  
      const password = ref<string>(''); 
      const loading = ref(false);

      onMounted(() => {
        email.value = route.params.email as string;
        token.value = route.params.token as string;
      });

      const validationSchema = yup.object({
        password: yup
          .string()
          .min(6, "Password must have at least 6 chars")
          .required("Password is required"),  
      });

      const { handleSubmit, errors } = useForm<ResetPasswordFormValues>({
        validationSchema,
      });

      const { value: passwordField } = useField('password');  
      
      const { mutate } = usePost<ResetPasswordFormValues>({
        serviceFunc: (data: ResetPasswordFormValues) => apiService.post('/auth/reset-password', data),
        successMessage: 'Your Password Is Set!', 
        withError: true,
        withLoading: true,
      });

      const onSubmit = async (values: ResetPasswordFormValues) => {
        console.log("Form submitted:", values);
        await mutate(values);  
      };

      return {
        email,
        token,
        password, 
        errors,
        handleSubmit: handleSubmit(onSubmit),
        loading,
      };
    },
  });
</script>



<style scoped src="./ResetPasswordForm.css">

</style>
