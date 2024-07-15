<template>
     <div class="container">
    <form @submit.prevent="handleLogin">
      <h1>Welcome Back</h1>
      
  
      <div id="first-inp" class="inp-box">
        <label for="Enter Username">Enter Email</label>
        <input v-model="email" type="text" placeholder="Email">
        <i class="fa fa-envelope"></i>
      </div>
      
      <div id="second-inp" class="inp-box">
        <label for="Enter Username">Enter Password</label>
        <input v-model="password" type="text" placeholder="Password">
        <i class="fa fa-key"></i>
      </div>
   
      
              <div class="links-forgot-password">
          <a href="">¿Forgot Your Password?</a>
        </div>

      
       <div class="button">
        <button @click="handleLogin">Login</button>
      </div>
      
      
      <div class="links">
        
      
      </div>
      
      <div class="not-have-acc">
        <a href="">Dont Have An Account</a>
      </div>
      
      <div class="separator">
        <h4>OR</h4>
      </div>
      
      <div class="social">
        <i id="google" class="fa fa-google"></i>
        <i id="apple" class="fa fa-apple"></i>
        <i id="facebook" class="fa fa-facebook"></i>
      </div>
      
      
    </form>
  </div>
  
</template>

<script>
export default {
    name: 'LoginComponent',
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        async handleLogin() {
            try {
                const response = await fetch('http://localhost:3000/api/sofi/login', {
                    method: 'POST', // Agregué el método POST para enviar datos
                    headers: {
                        'Content-Type': 'application/json' // Corregí la forma de especificar el Content-Type
                    },
                    credentials: 'include',
                    body: JSON.stringify({ // Convertí el objeto a JSON con JSON.stringify
                        email: this.email, // Usé this.email para acceder a la propiedad email del componente
                        password: this.password // Usé this.password para acceder a la propiedad password del componente
                    })
                });

                if (!response.ok) {
                    console.log('Something Went Wrong.');
                    return;
                }

                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
}
</script>

<style scoped>
    body {
    font-family: 'Poppins', sans-serif;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);
    color: white;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.container {
    height: 100vh;
    padding: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container form {
    padding: 20px;
    height: auto;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #DE504F;
    border-radius: 30px;
    background: white;
    color: black;
}

.container form h1 {
    margin-bottom: 20px;
}

form .inp-box {
    position: relative;
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
}

form .inp-box label {
    display: block;
}

form .inp-box i {
    font-size: 20px;
    position: absolute;
    top: 15px;
    right: 10px;
    color: gray;
}

form .inp-box input {
    width: 100%;
    height: 100%;
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
    padding: 5px 10px;
}

form .button {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
}

form .button button {
    width: 100%;
    height: 100%;
    border: none;
    background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
    border-radius: 15px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
    font-family: 'Poppins', sans-serif;
}

form .button button:hover {
    background: #DE504F;
}

.links-forgot-password {
    width: 100%;
    text-align: right;
    padding: 5px;
    margin-bottom: 10px;
}

.links-forgot-password a {
    text-decoration: none;
    color: #DE504F;
}

.not-have-acc {
    margin-bottom: 30px;
}

.social {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.social i {
    padding: 10px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.social #google {
    background-color: #EE3131;
}

.social #apple {
    background: black;
}

.social #facebook {
    background: #2058FF;
}

.separator {
    margin-bottom: 20px;
    text-align: center;
}


</style>