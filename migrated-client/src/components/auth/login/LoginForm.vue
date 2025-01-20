<template>
    <div class="container">
      <div class="wrapper">
        <div class="login-form">
          <h1 class="lf-h1">Welcome Back To Sofii</h1>
  
          <form @submit.prevent="handleSubmit">
            
            <div class="inp-box">
              <input v-model="email" placeholder="Enter Your Email" id="inp1" type="email" required />
              <i class="fas fa-envelope icon"></i>
              <span v-if="errors.email" class="val-error">{{ errors.email }}</span>
            </div>
  
            <div class="inp-box">
              <input v-model="password" placeholder="Enter Your Password" id="inp2" type="password" required />
              <i class="fas fa-lock icon"></i>
              <span v-if="errors.password" class="val-error">{{ errors.password }}</span>
            </div>
  
            <div class="form-links">
              <div> 
                <a href="">Forgot Your Password?</a>
              </div>
              <div >
                <a href="">Don't have an account?</a>
              </div>
            </div>
  
            <div class="btn-box">
              <button type="submit">
                Login
                <i class="fas fa-arrow-left"></i>
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
  import { useRouter } from 'vue-router';
  import { apiService } from '@/api/ApiService';
  import { usePost } from '@/composables/usePost';

  interface LoginFormValues {
    email: string;
    password: string;
  }

  export default defineComponent({
    name: 'LoginForm',
    setup() {
      const router = useRouter();
      const loading = ref(false);

      const validationSchema = yup.object({
        email: yup.string().email("Invalid email").required("Email required"),
        password: yup.string().min(6, "Password must have at least 6 chars").required("Password required"),
      });

      const { handleSubmit, errors } = useForm<LoginFormValues>({
        validationSchema,
      });

      const { value: email } = useField('email');
      const { value: password } = useField('password');

      const { mutate } = usePost<LoginFormValues>({
        serviceFunc: (data: LoginFormValues) => apiService.post('/auth/login', data),
        successFunc: () => router.push({ name: 'home' }),
        withError: true,
        withLoading: true,
      });

      const onSubmit = async (values: LoginFormValues) => {
        console.log("Form submitted:", values);
        loading.value = true;
        await mutate(values);
        loading.value = false;
      };

      const goToRoute = (route: string) => {
        router.push(route);
      };

      return {
        email,
        password,
        errors,
        handleSubmit: handleSubmit(onSubmit),
        loading,
        goToRoute,
      };
    },
  });
</script>


<style scoped src="./LoginForm.css">

</style>