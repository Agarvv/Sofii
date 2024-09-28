<template>
   <div>
   
   <LoadingComponent message="Sending Mail, Please Wait..." v-if="loading"/>

   <SuccessComponent v-if="success" :success="success"/> 

    <ErrorComponent v-if="error" :error="error"/>
    
    
    <div class="outer-container">
        <div class="container">
            <h2>¿Forgot Your Password?</h2>
            <p>Enter Your Email, If Your Email Exists On Our System, You Will Receive a URL To Reset Your Password.</p>
        
                <input v-model="email" type="email" placeholder="Enter Your Email" required>
                <button @click="sendResetPasswordCode">Send Code</button>
    
        </div>
    </div>
   
   </div>
</template>

<script>
import SuccessComponent from './SuccessComponent'
import ErrorComponent  from './ErrorComponent'
import LoadingComponent from './LoadingComponent'

 import { sendPasswordResetUrl } from '../services/usersService'

export default {
    components: {
        SuccessComponent,
        ErrorComponent,
        LoadingComponent
    },
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

            if(this.error) {
                this.error = ""
            }

            if(this.success) {
                this.success = ""
            }

            if(this.loading) {
                return
            }

            if(this.email == "") {
                this.error = "Please Enter Your Email"
            } 
            
            try {
                this.loading = true 
                const data = await sendPasswordResetUrl(this.email)
                this.success = "Check Your Email, We Just Sent You A URL To Verify You And Reset Your Password."
            } catch (e) {
                console.log('Something Went Wrong', e)
                this.error = "Something Went Wrong, maybe you tried to change your password too many times."
            } finally {
                this.loading = false
            }
        }
    }
}

</script>

<style scoped>
.outer-container {
    display: flex;
    justify-content: center;
    align-items: center; 
    height: 100vh;
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