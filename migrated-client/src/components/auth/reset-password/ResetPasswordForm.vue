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
            required>
            
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

interface ResetPasswordFormValues {
  password: string;
}

export default {
  name: 'ResetPasswordForm', 
  setup() {
    const validationSchema = yup.object({
      password: yup.string().min(6, "Password must have at least 6 characters").required("Password is required"),
    });

    const { handleSubmit, errors } = useForm<ResetPasswordFormValues>({
      validationSchema,
    });

    const { value: password } = useField("password");

    const onSubmit = (values: ResetPasswordFormValues) => {
      console.log("Password reset submitted:", values);
    };

    return {
      password,
      errors,
      handleSubmit: handleSubmit(onSubmit),
    };
  },
};
</script>

<style src="./ResetPasswordForm.css"></style>