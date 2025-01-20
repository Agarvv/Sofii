<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="email">Email:</label>
      <input type="email" v-model="email" id="email" />
      <span v-if="errors.email">{{ errors.email }}</span>
    </div>
    
    <div>
      <label for="password">Password:</label>
      <input type="password" v-model="password" id="password" />
      <span v-if="errors.password">{{ errors.password }}</span>
    </div>
    
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

export default {
  name: 'RegisterForm', 
  setup() {
    const validationSchema = yup.object({
      email: yup.string().email("Email inválido").required("El email es obligatorio"),
      password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
    });

    const { handleSubmit, errors } = useForm({
      validationSchema,
    });

    const { value: email } = useField("email");
    const { value: password } = useField("password");

    const onSubmit = (values) => {
      console.log("Form submitted:", values);
    };

    return {
      email,
      password,
      errors,
      handleSubmit: handleSubmit(onSubmit),
    };
  },
};
</script>
