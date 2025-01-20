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
                v-bind="username"
              />
              <i class="fa fa-user icon"></i>
              <span v-if="usernameError" class="val-error">{{ usernameError }}</span>
            </div>
            <div class="inp-box">
              <input
                v-model="values.email"
                type="email"
                placeholder="Email"
                name="email"
                v-bind="email"
              />
              <i class="fa fa-envelope icon"></i>
              <span v-if="emailError" class="val-error">{{ emailError }}</span>
            </div>
            <div class="inp-box">
              <input
                v-model="values.password"
                type="password"
                placeholder="Secure Password"
                name="password"
                v-bind="password"
              />
              <i class="fa fa-lock icon"></i>
              <span v-if="passwordError" class="val-error">{{ passwordError }}</span>
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
import { useForm, useField } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules'; 
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

    const { handleSubmit, errors } = useForm({
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