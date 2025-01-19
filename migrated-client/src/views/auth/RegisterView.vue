<template>
   <RegisterForm />
</template>

<script>
 import { defineComponent } from 'vue';
 import RegisterForm from '@/components/auth/register/RegisterForm.vue';


 export default defineComponent({
    name: 'RegisterView',
    components: {
        RegisterForm
    }
 })
</script>