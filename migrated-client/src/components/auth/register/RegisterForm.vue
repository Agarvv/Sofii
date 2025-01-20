<template>
  <div>
    <div class="container">
      <div class="wrapper">
        <div class="login-form">
          <h1 class="lf-h1">Welcome To Sofii!</h1>
          <form @submit="onSubmit">
            <div class="inp-box">
              <input
                v-model="values.username"
                type="text"
                placeholder="Username"
                name="username"
              />
              <i class="fa fa-user icon"></i>
              <span v-if="errors.username" class="val-error">{{ errors.username }}</span>
            </div>
            <div class="inp-box">
              <input
                v-model="values.email"
                type="email"
                placeholder="Email"
                name="email"
              />
              <i class="fa fa-envelope icon"></i>
              <span v-if="errors.email" class="val-error">{{ errors.email }}</span>
            </div>
            <div class="inp-box">
              <input
                v-model="values.password"
                type="password"
                placeholder="Secure Password"
                name="password"
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
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
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

    const validationSchema = Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });
    
    const formik = useFormik({
      initialValues: {
        username: '',
        email: '',
        password: ''
      },
      validationSchema,
      onSubmit: async (values) => {
        console.log('Form Submitted:', values);
        const { mutate } = usePost<RegisterFormValues>({
          serviceFunc: (data: RegisterFormValues) => apiService.post('/auth/register', data),
          withError: true,
          withLoading: true,
        });
        await mutate(values);
        router.push({ name: 'login' });
      }
    });

    return {
      values: formik.values,
      errors: formik.errors,
      onSubmit: formik.handleSubmit,
    };
  },
});
</script>