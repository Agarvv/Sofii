<template>
  <div class="container">
    <h1>¡Welcome!</h1>
    <form @submit.prevent="handleRegister">
      <div class="inp-box">
        <label for="Username">Enter Username</label>
        <input v-model='name' type="text" placeholder="Enter Your Name">
      </div>
      <div class="inp-box">
        <label for="Email">Enter Email</label>
        <input v-model="email" type="email" placeholder="Enter Your Email">
      </div>
      <div class="inp-box">
        <label for="Password">Enter Password</label>
        <input v-model="password" type="password" placeholder="Enter Your Password">
      </div>
      <div class="links">
        <a href="#">Already Have An Account?</a>
      </div>
      <div class="button">
        <button type="submit">Register</button>
      </div>
      <div class="separator">
        <h3>OR</h3>
      </div>
      <div class="social">
        <div class="google">
          <button><i class="fa fa-google"></i> Use Google</button>
        </div>
        <div class="apple">
          <button><i class="fa fa-apple"></i> Use Apple</button>
        </div>
        <div class="facebook">
          <button><i class="fa fa-facebook"></i> Use Facebook</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterComponent', 
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async handleRegister() {
      try {
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

        if (!response.ok) {
          console.log('Something went wrong.');
          return;
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Poppins', sans-serif;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container {
  border: 1px solid black;
  width: 500px;
  height: 750px;
  padding: 30px;
  border-radius: 30px;
}

.img-field img {
  width: 80px;
  border-radius: 50%;
}

.container h1 {
  text-align: left;
}

.container form {
  padding: 20px;
  height: 93%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inp-box label {
  display: block;
}

.inp-box {
  width: 100%;
  height: 40px;
  margin-bottom: 50px;
}

.inp-box input {
  width: 100%;
  height: 100%;
  border: .3px solid gray;
  border-radius: 10px;
  position: relative;
}

.inp-box input::placeholder {
  position: absolute;
  top: 10px;
  left: 10px;
}

.links {
  margin-bottom: 20px;
}

.button {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
}

.button button {
  width: 100%;
  height: 100%;
  border: .3px solid gray;
  border-radius: 10px;
  background: transparent;
}

.separator {
  text-align: center;
  width: 100%;
}

.social {
  width: 100%;
}

.social .google, .apple, .facebook {
  height: 50px;
  margin-bottom: 12px;
}

.social button {
  width: 100%;
  height: 100%;
  border: none;
}

.google button {
  width: 100%;
  height: 100%;
}
</style>