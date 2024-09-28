<template>
    <SuccessComponent v-if="success" :success="success"/>
    
    <ErrorComponent v-if="error" :error="error"/>
    
    <h1 v-if="loading">Please Wait...</h1>
    
    <div class="outer-container">
        <div class="container">
            <h2>¿Forgot Your Password?</h2>
            <p>Enter Your Email, If Your Email Exists On Our System, You Will Receive a URL To Reset Your Password.</p>
        
                <input v-model="email" type="email" placeholder="Enter Your Email" required>
                <button @click="sendResetPasswordResetUrl">Send Code</button>
    
        </div>
    </div>
</template>

<script>
// import { sendPasswordResetUrl } from '../services/usersService'
import { SuccessComponent } from './SuccessComponent'
import { ErrorComponent } from './ErrorComponent'
import fetchUrl from '../helpers/fetchUrl'


export default {
    name: 'EnterEmailResetPassword',
    data() {
        return {
            email: "",
            error: "",
            success: "",
            loading: null
        }
    },
    methods: {
        async sendResetPasswordCode() {
            console.log('Method called')
            this.loading = true 
            try {
                const data = await sendPasswordResetUrl(this.email)
                this.success = "Check Your Email, We Just Sent You A URL To Verify You And Reset Your Password."
                
            } catch (e) {
                console.log('Algo malo paso', e)
                this.error = e
            } finally {
                this.loading = false
            }
        },
        async sendPasswordResetUrl() {
   try {
       const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/send_password_reset_url', {
     email: this.email
   }, 'POST')
   
   const data = await response.json()
  
   console.log('data from server', data)
   } catch(e) {
       console.log('error', e)
   }
}
    }
}
</script>

<style scoped>
.outer-container {
   justify-content: center;
    align-items: center; 
    height: 100vh;a
    width: 100%;
}

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

p {
    color: #666;
    margin-bottom: 20px;
}

input[type="email"] {
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
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}
</style>