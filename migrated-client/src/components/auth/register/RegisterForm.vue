<template>
  <div>
    <form @submit="onSubmit">
      <div>
        <input v-model="values.username" type="text" placeholder="Username" />
        <span v-if="errors.username">{{ errors.username }}</span>
      </div>
      <div>
        <input v-model="values.email" type="email" placeholder="Email" />
        <span v-if="errors.email">{{ errors.email }}</span>
      </div>
      <div>
        <input v-model="values.password" type="password" placeholder="Password" />
        <span v-if="errors.password">{{ errors.password }}</span>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useForm } from 'vee-validate';

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export default defineComponent({
  name: 'RegisterForm',
  setup() {
    const { handleSubmit, errors, validate, reset } = useForm<RegisterFormValues>({
      initialValues: {
        username: '',
        email: '',
        password: ''
      },
    });

    const values = reactive<RegisterFormValues>({
      username: '',
      email: '',
      password: ''
    });
    
    const onSubmit = handleSubmit(() => {
      console.log('Form ok');

    });

    return {
      values,
      errors,
      onSubmit
    };
  }
});
</script>

<style scoped src="./RegisterForm.css">
    
</style>