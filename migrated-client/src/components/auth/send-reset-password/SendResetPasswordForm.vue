<template>
    <div>
      <div class="outer-container">
        <div class="container">
          <h2>¿Forgot Your Password?</h2>
          <p>Enter Your Email. If Your Email Exists On Our System, You Will Receive a URL To Reset Your Password.</p>
  
          <form @submit.prevent="handleSubmit">
            <div class="inp-box">
              <input v-model="email" type="email" placeholder="Enter Your Email" required />
              <i class="fas fa-envelope icon"></i>
              <span v-if="errors.email" class="val-error">{{ errors.email }}</span>
            </div>

            <div class="btn-box">
              <button type="submit">
                Send Code
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </form>
  
        </div>
      </div>
    </div>
  </template>
  

  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';
  import { apiService } from '@/api/ApiService';
  import { usePost } from '@/composables/usePost';

  interface ForgotPasswordFormValues {
    email: string;
  }

  export default defineComponent({
    name: 'SendResetPassword',
    setup() {


      const validationSchema = yup.object({
        email: yup.string().email("Invalid email").required("Email required"),
      });

      const { handleSubmit, errors } = useForm<ForgotPasswordFormValues>({
        validationSchema,
      });

      const { value: email } = useField('email');

      const { mutate } = usePost<ForgotPasswordFormValues>({
        serviceFunc: (data: ForgotPasswordFormValues) => apiService.post('/auth/send-reset-password', data),
        successMessage: "Please check your email.",
        withError: true,
        withLoading: true,
      });

      const onSubmit = async (values: ForgotPasswordFormValues) => {
        console.log("Form submitted:", values);
        await mutate(values);
      };

      return {
        email,
        errors,
        handleSubmit: handleSubmit(onSubmit),
      };
    },
  });
</script>


<style scoped src="./SendResetPasswordForm.css">

</style>