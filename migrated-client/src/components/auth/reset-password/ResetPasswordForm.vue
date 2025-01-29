<template>
  <div>
    <div class="out">
      <div class="container">
        <h2>Change Your Password</h2>
        <form @submit.prevent="handleSubmit"> 
          <input
            v-model="password" 
            type="password" 
            placeholder="New Password"
            required
          />
          <span v-if="errors.password" class="val-error">{{ errors.password }}</span>

          <button type="submit">Update Your Password</button>
        </form> 
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useRoute } from 'vue-router';
import { apiService } from '@/api/ApiService';
  import { usePost } from '@/composables/usePost';


interface ResetPasswordFormValues {
  email: string;
  resetToken: string;
  password: string;
}

export default {
  name: 'ResetPasswordForm', 
  setup() {
      
    const route = useRoute();
    const email = route.params.email as string || ''; 
    const resetToken = route.params.token as string || ''; 

    const validationSchema = yup.object({
      password: yup.string().min(6, "Password must have at least 6 characters").required("Password is required"),
    });

    const { handleSubmit, errors } = useForm<ResetPasswordFormValues>({
      validationSchema,
    });

    const { value: password } = useField("password");
    
    const { mutate } = usePost<ResetPasswordFormValues>({
        serviceFunc: (data: ResetPasswordFormValues) => apiService.post('/auth/reset-password', data),
        successMessage: "Your password is set!", 
        withError: true,
        withLoading: true,
      });


    const onSubmit = async (values: ResetPasswordFormValues) => {
      const formData = {
        email: email,
        resetToken: resetToken,
        password: values.password,
      };
      console.log("Password reset submitted with data:", formData);
      
      await mutate(formData); 
    };

    return {
      password,
      errors,
      handleSubmit: handleSubmit(onSubmit),
    };
  },
};
</script>

<style scoped src="./ResetPasswordForm.css"></style>