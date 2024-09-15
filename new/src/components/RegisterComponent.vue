<template>
  <div class="container">
  
<div class="wrapper">
  
  <div class="login-form">
  
    <h1 class="lf-h1">Welcome To Sofii!</h1>
    
    <form @submit.prevent="handleRegister">
      
      <div v-if="error" class="error">
          <p>{{error}}</p>
      </div>
      
      <div class="inp-box">
        <input v-model="name" class="name" type="text" placeholder="Username" required> 
        <font-awesome-icon icon="user" class="icon"/>
      </div>
      
      <div class="inp-box">
        <input v-model="email" class="email" placeholder="Email" id="inp1" type="email" required>
  
        <font-awesome-icon icon="envelope" class="icon"/>
      </div>
      <div class="inp-box">
        <input v-model="password" class="password" placeholder="Secure Password" id="inp2" type="password" required>
      
       <font-awesome-icon icon="lock" class="icon"/>
      </div>
      
      
      <div v-if="loading == false" class="btn-box">
         <button>
           Register
           <font-awesome-icon icon="arrowLeft"/>
         </button>
      </div>
      
       <div v-if="loading == true" class="btn-box">
         <button>
           Please Wait...
           <font-awesome-icon icon="arrowLeft"/>
         </button>
      </div>
      
      
      
      
      <div class="form-links">
        <div @click="goToRoute('/login')">
          <a href="">Already Have An Account?</a>
        </div>
      </div>
      
      
    </form>
    
  </div>
  
  
  <div class="login-social-media"> 
  
   
    <div class="social-buttons">
      
      <div class="google">
        <span>Continue With Google</span>
                <font-awesome-icon icon="google"/>       
      </div>
      
      <div class="facebook">

        <span>Continue With Facebook</span>
            <font-awesome-icon icon="facebook"/> 
      </div>
      
      <div class="apple">
        
        <span>Continue With Apple</span>
            <font-awesome-icon icon="apple"/>
      </div>
      
    </div>
    
  </div>




  
</div>
  
  
</div>
</template>

<script>
export default {
  name: 'RegisterComponent', 
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: "",
      loading: false
    };
  },
  methods: {
    async handleRegister() {
        if(this.error !== "") {
            this.error = ""
        }
        
      try {
          this.loading = true 
          
        const response = await fetch('http://localhost:3000/api/sofi/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password
          })
        });
        
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
           this.loading = false
            switch(data.error) {
                case "username_exists":
                    this.error = "That username Already Exists"
                    break; 
                case "email_exists":
                    this.error = "That email already exists"
                    break;
                
                case "name_missing":
                    this.error = "The Username Is Missing."
                    break; 
                case "email_missing":
                    this.error = "The Email Is Missing."
                    break;
                case "password_missing":
                    this.error = "The Password Is Missing."
                    break; 
                
                
                case "internal_server_error":
                    this.error = "Oops, Something Went Down..."
                    break;
            }
            
            
        } else if(response.ok) {
            setInterval(() => {
                this.loading = false 
                this.$router.push('/login')
            }, 3000)
        }
        
      } catch (error) {
        console.error('Error:', error);
      }
    },
    goToRoute(route) {
          this.$router.push(route)
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.container .wrapper {
  width: 70%;
  border: 1px solid #ccc; /* Color de borde más suave */
  height: 100vh;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  border-radius: 15px; /* Bordes redondeados para el contenedor */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra suave */
}

.wrapper .login-form, .login-social-media {
  flex: 1;
  width: 100%;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #f9f9f9; /* Fondo más suave */
  height: 500px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.login-form h2 {
  margin-bottom: 20px;
  color: #333; /* Color del encabezado */
}

.login-form .inp-box {
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  position: relative;
}

.inp-box .icon {
  position: absolute;
  top: 10px;
  right: 10px;
  color: gray;
}

.login-form .inp-box input {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px 20px;
  border: 1px solid #ddd; /* Borde del input */
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.inp-box input::placeholder {
  color: #aaa;
  font-size: 16px;
  transition: all 0.3s ease;
  position: absolute;
  top: 10px;
  left: 10px;
}

.inp-box input:focus::placeholder,
.inp-box input:not(:placeholder-shown)::placeholder {
  top: 1px;
  left: 10px;
}

.login-form form {
  width: 100%;
}

.btn-box {
  width: 100%;
  height: 50px;
}

.btn-box button {
 width: 100%;
 height: 100%;
 border: none;
 border-radius: 15px;
 background-color: #007BFF; /* Color de fondo del botón */
 color: white;
 font-weight: bold;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
 cursor: pointer;
}

.btn-box button:hover {
  background-color: #0056b3; /* Color de fondo al pasar el mouse */
}

.login-social-media {
  height: 500px;
  background-color: #34495E;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.login-social-media h2 {
  margin-bottom: 20px;
}

.login-social-media .social-buttons .google, .facebook, .apple {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra suave */
  font-weight: 700;
  border-radius: 15px;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 10px;
}

.social-buttons i {
  font-size: 25px;
}

.social-buttons .google {
  background: white;
  color: black;
  border: 1px solid #ddd; /* Borde de la tarjeta */
}

.social-buttons .google i {
  color: #db4437; /* Color del ícono de Google */
}

.social-buttons .facebook {
  background: #1877F2;
  border: 1px solid #ddd; /* Borde de la tarjeta */
}

.social-buttons .apple {
  background: #000;
  border: 1px solid #ddd; /* Borde de la tarjeta */
}


form .form-links {
  display: grid;
  grid-template-columns: 1fr;
}

form .form-links div {
  padding: 15px;
}

.lf-h1 {
  padding: 15px;
}

.error {
    background: #FF4C4C;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 15px;
    color: white;
}

@media(max-width: 600px) {
  .container .wrapper {
    width: 100%;
    flex-direction: column;
  }
}
</style>