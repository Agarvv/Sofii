<template>
  <div>
    <div class="container">
      <div class="wrapper">
        <div class="login-form">
          <h1 class="lf-h1">Welcome To Sofii!</h1>
          <form @submit.prevent="onSubmit">
            <div class="inp-box">
              <input
                v-model="values.username"
                type="text"
                placeholder="Username"
              />
              <i class="fa fa-user icon"></i>
              <span v-if="!$v.username.$pending && !$v.username.$model" class="val-error">{{ errors.username }}</span>
            </div>
            <div class="inp-box">
              <input
                v-model="values.email"
                type="email"
                placeholder="Email"
              />
              <i class="fa fa-envelope icon"></i>
              <span v-if="!$v.email.$pending && !$v.email.$model" class="val-error">{{ errors.email }}</span>
            </div>
            <div class="inp-box">
              <input
                v-model="values.password"
                type="password"
                placeholder="Secure Password"
              />
              <i class="fa fa-lock icon"></i>
              <span v-if="!$v.password.$pending && !$v.password.$model" class="val-error">{{ errors.password }}</span>
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
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
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
    const values = {
      username: '',
      email: '',
      password: '',
    };

    const $v = useVuelidate();

    const { mutate } = usePost<RegisterFormValues>({
      serviceFunc: (data: RegisterFormValues) => apiService.post('/auth/register', data),
      withError: true,
      withLoading: true,
    });

    const onSubmit = async () => {
      if (!$v.$invalid) {
        console.log('Form Submitted:', values);
        await mutate(values);
        router.push({ name: 'login' });
      } else {
        console.log('Form has errors');
      }
    };

    return {
      values,
      $v,
      errors: {
        username: 'Username is required',
        email: 'Invalid email',
        password: 'Password must be at least 6 characters',
      },
    };
  },
});
</script>

<style scoped src="./RegisterForm.css"></style>