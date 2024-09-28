<template>
<div>


  <LoadingComponent message="Setting Up Your Password..." v-if="loading"/>
  <ErrorComponent v-if="error" :error="error"/>
  <SuccessComponent v-if="success" :success="success" />

  <div class="out">
      <div class="container">
        <h2>Change Your Password</h2>
    
            <input v-model="newPassword" type="password" placeholder="New Password" required>
            <input v-model="comparePassword" type="password" placeholder="Confirm Password " required>
            <button @click="changePassword">Update Your Password</button>
    </div>
  </div>

</div>
</template>

<script>
import  { changeUserPassword } from '../services/usersService'
import SuccessComponent  from './SuccessComponent'
import LoadingComponent from './LoadingComponent'
import  ErrorComponent  from './ErrorComponent'
import fetchUrl from '../helpers/fetchUrl'


export default {
    components: {
        SuccessComponent,
        ErrorComponent,
        LoadingComponent
    },
    name: 'ResetPassword',
    data() {
        return {
            newPassword: "",
            comparePassword: "",
            error: "",
            success: "",
            loading: false 
        }
    },
    methods: {
        async changePassword() {
           if(this.error) {
            this.error = "" 
           }

           if(this.success) {
            this.success = ""
           }

           if(this.loading) {
            return
           }

            if(this.newPassword !== this.comparePassword) {
                this.error = "Assure Your Passwords Match!"
                return
            }
             try {
                this.loading = true
                const data = await changeUserPassword(this.newPassword, this.$route.params.reset_token, this.$route.params.email)
                this.success = "¡Your Password Has Been Changed Sucesfully!"
             } catch (e) {
                this.error = e
             } finally {
                this.loading = false
             }
        }
    }
}
</script>

<style scoped>
.out {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
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