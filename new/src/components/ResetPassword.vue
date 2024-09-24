<template>
    <ErrorComponent v-if="error" :error="error"/>
    <SuccessComponent v-if="success" :success="success" />
    
    <div class="container">
        <h2>Change Your Password</h2>
        <form @submit.prevent="changePassword">
            <input v-model="newPassword" type="password" placeholder="New Password" required>
            <input v-model="comparePassword" type="password" placeholder="Confirm Password " required>
            <button type="submit">Actualizar Contraseña</button>
        </form>
    </div>
</template>

<script>
import changeUserPassword from '../services/usersService'
import { SuccessComponent } from './SuccessComponent'
import { ErrorComponent } from './ErrorComponent'

export default {
    name: 'ResetPassword',
    data() {
        return {
            newPassword: "",
            comparePassword: "",
            error: "",
            success: ""
        }
    },
    methods: {
        async changePassword() {
             try {
                const data = await changeUserPassword(this.password, this.$route.params.reset_token)
                this.success = "¡Your Password Has Been Changed Sucesfully!"
             } catch (e) {
                this.error = "Something Went Wrong, Or Your Request To Reset The Password Has Expired.."
             }
        }
    }
}
</script>

<style scoped>
 .container {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
}

h2 {
    color: #333;
    margin-bottom: 10px;
}

input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
    font-size: 16px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #218838;
}

</style>