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
                v-bind="register('username')"
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
                v-bind="register('email')"
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
                v-bind="register('password')"
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
import { useForm, useField, required, email, min } from 'vee-validate';
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


    const values = reactive<RegisterFormValues>({
      username: '',
      email: '',
      password: ''
    });
    
    const { handleSubmit, errors, register } = useForm({
      initialValues: values,
    });

    const { value: username, errorMessage: usernameError } = useField(
      'username',
      required('Username is required')
    );
    const { value: email, errorMessage: emailError } = useField(
      'email',
      required('Email is required'),
      email('Invalid email')
    );
    const { value: password, errorMessage: passwordError } = useField(
      'password',
      required('Password is required'),
      min(6, 'Password must be at least 6 characters')
    );

    const { mutate } = usePost<RegisterFormValues>({
      serviceFunc: (data: RegisterFormValues) => apiService.post('/auth/register', data),
      withError: true,
      withLoading: true,
    });


    const onSubmit = handleSubmit(async () => {
      console.log('Form Submitted:', values);
      await mutate(values);
      router.push({ name: 'login' });
    });

    return {
      values,
      errors,
      register,
      username,
      email,
      password,
      usernameError,
      emailError,
      passwordError,
      onSubmit,
    };
  },
});
</script>