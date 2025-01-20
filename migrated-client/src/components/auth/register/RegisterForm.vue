<template>
  <div>
    <div class="container">
      <div class="wrapper">
        <div class="login-form">
          <h1 class="lf-h1">Welcome To Sofii!</h1>
          <form @submit="onSubmit()">
            <div class="inp-box">
              <input
                v-model="values.username"
                type="text"
                placeholder="Username"
              />
              <i class="fa fa-user icon"></i>
              <span v-if="errors.username" class="val-error">{{ errors.username }}</span>
            </div>
            <div class="inp-box">
              <input
                v-model="values.email"
                type="email"
                placeholder="Email"
              />
              <i class="fa fa-envelope icon"></i>
              <span v-if="errors.email" class="val-error">{{ errors.email }}</span>
            </div>
            <div class="inp-box">
              <input
                v-model="values.password"
                type="password"
                placeholder="Secure Password"
              />
              <i class="fa fa-lock icon"></i>
              <span v-if="errors.password" class="val-error">{{ errors.password }}</span>
            </div>
            <div class="btn-box">
              <button type="submit">
                Register
                <i class="fa fa-arrow-left"></i>
              </button>
            </div>
            <div class="form-links">
              <div>
                <a href="">Already Have An Account?</a>
              </div>
            </div>
          </form>
        </div>
        <div class="login-social-media">
          <div class="social-buttons">
            <!-- Social media buttons here -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';  
import { apiService } from '@/api/ApiService';
import { usePost } from '@/composables/usePost';

interface RegisterFormValues {
  username: string;
  password: string;
  email: string;
}

export default defineComponent({
  name: 'RegisterForm',
  setup() {
    const router = useRouter(); 

    const schema = yup.object({
      username: yup.string().required('Username is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const { handleSubmit, errors, values, resetForm, setFieldTouched } = useForm<RegisterFormValues>({
      validationSchema: schema,
      initialValues: {
        username: '',
        email: '',
        password: '',
      },
      validateOnMount: false, 
      
    });
  
    const { mutate } = usePost<RegisterFormValues>({
      serviceFunc: (data: RegisterFormValues) => apiService.post('/auth/register', data),
      withError: true,
      withLoading: true,
    });

    const onSubmit = handleSubmit(async (values) => {
      console.log("submit called")
      try {
        await mutate(values);
        resetForm(); 
        router.push({ name: 'login' });
      } catch (error) {
        console.error('Error al registrar:', error);
      }
    });

    return {
      handleSubmit,
      errors,
      onSubmit,
      values,
      setFieldTouched,
    };
  },
});
</script>


<style scoped src="./RegisterForm.css"></style>
