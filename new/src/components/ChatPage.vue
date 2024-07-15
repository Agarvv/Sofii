<template>
  <div>
    <header>
      <div class="up">
        
        <div class="f-up">
          <font-awesome-icon icon="arrow-left" style="font-size: 25px;"></font-awesome-icon>
          <h1>Sofii</h1>
        </div>
        
        <div class="s-up">
          <div class="add-user">
            <font-awesome-icon icon="user-plus"></font-awesome-icon>
          </div>
        </div>
        
      </div>
      <div class="down">
        
        <div class="header-down-search-inp">
          <input type="search" placeholder="Search Contacts...">
          <font-awesome-icon icon="search"></font-awesome-icon>
        </div>
        
      </div>
    </header>
    
    <div class="container">
      
      <aside>
        
        <div class="aside-header">
          
          <div class="aside-header-user">
            <div class="user-img">
              <img src="invict-victory-edp.jpg" style="width: 60px; border-radius: 50%;">
            </div>
            
            <div class="user-details">
              <h3>Le Beau</h3>
            </div>
          </div>
          
          <div class="aside-header-search-inp">
            <input type="search" placeholder="Search Contacts">
            <font-awesome-icon icon="search"></font-awesome-icon>
          </div>
          
          <div class="aside-interactions">
            <div class="add-contact">
              <font-awesome-icon icon="user-plus"></font-awesome-icon>
              <span>Add Contact</span>
            </div>
          </div>
          
        </div>
        
        <div class="aside-contacts">
          
          <div class="contact">
            
            <div class="contact-img">
              <img src="invict-victory-edp.jpg" style="width: 40px; border-radius: 50%;">
            </div>
            
            <div class="contact-details">
              <h4 class="contact-username">Le Male</h4>
              <p class="contact-last-message">I think We Should B...</p>
            </div>
            
          </div>
          
          <!-- Aquí irían más contactos -->

        </div>
        
      </aside>
      
      <main> 
        
        <div class="main-header">
          
          <div class="user-details">
            
            <div class="user-img">
              <img src="invict-victory-edp.jpg" style="width: 60px; border-radius: 50%;">
            </div>
            
            <div class="user-username">
              <h4>Le Beau</h4>
              <p style="color: green">Conected</p>
            </div>
            
          </div>
          
          <div class="header-interact">
            
            <div class="options">
              <font-awesome-icon icon="bars"></font-awesome-icon>
            </div>
            
          </div>
          
        </div>
        
        <div class="main-chatbox">
           <!-- Aquí irían los mensajes -->
        </div>
        
        <div class="main-footer">
           
           <div class="footer-buttons">
             <div class="video">
               <font-awesome-icon icon="video"></font-awesome-icon>
             </div>
  
             <div class="image">
               <font-awesome-icon icon="image"></font-awesome-icon>
             </div>
             <div class="micro">
               <font-awesome-icon icon="microphone"></font-awesome-icon>
             </div>
           </div>
           
           <div class="footer-message-input">
             <input id="inp" type="text" placeholder="Send a message...">
             <div class="footer-send-message-button">
               <font-awesome-icon icon="paper-plane"></font-awesome-icon>
             </div>
           </div>
           
        </div>
        
      </main>
      
    </div>
  </div>
</template>

<script>
    
</script>

<style scoped>
    html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background: #f9f9f9; /* Fondo un poco más claro */
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

header {
  padding: 15px;
  display: flex;
  flex-direction: column;
  background: #fff; /* Fondo blanco para el encabezado */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Sombra sutil */
}

header .up {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

header .up .f-up {
  display: flex;
  align-items: center;
  gap: 10px;
}

header .s-up .add-user {
  padding: 7px;
}

header .s-up .add-user i {
  font-size: 25px;
}

header .down .header-down-search-inp {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 35px;
}

header .down .header-down-search-inp input[type="search"] {
  flex: 1;
  height: 100%;
  background: white;
  border: none;
  border-radius: 10px;
}

header .down .header-down-search-inp i {
  font-size: 25px;
}

.container {
  border: 2px solid #ddd; /* Borde principal más suave */
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 3fr;
}

.container aside, main {
  border: 1px solid #ddd; /* Bordes más suaves en aside y main */
}

main {
  display: flex;
  flex-direction: column;
}

main .main-header, .main-chatbox, .main-footer {
  border: 1px solid #ddd; /* Bordes más suaves en main components */
}

main .main-header {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
}

main .main-header i {
  font-size: 25px;
}

main .main-footer {
  height: 70px;
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f0f0f0;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

main .main-chatbox {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  background: #fcfcfc; /* Fondo ligeramente más cálido */
}

.user-details {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
}

.footer-buttons {
  display: flex;
  gap: 10px;
  font-size: 20px;
  align-items: center;
}

.footer-buttons i {
  font-size: 20px;
}

.footer-buttons button:hover,
.footer-send-message-button button:hover,
.aside-contacts .contact:hover {
  background: #3b5998; /* Azul oscuro más intenso al pasar el mouse */
  color: #fff; /* Texto blanco al pasar el mouse */
}

.footer-message-input {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 5px;
}

.footer-message-input input {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.footer-send-message-button {
  margin-left: 10px;
}

.footer-send-message-button i {
  font-size: 20px;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
  overflow-y: auto;
}

.messages .message.friend {
  align-self: flex-start;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  border-radius: 10px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  background: #42445A;
  color: white;
}

.messages .message.user {
  color: white;
  background: #02CCFF;
  align-self: flex-end;
  padding: 10px;
  border-radius: 10px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.aside-header {
  padding: 10px;
  margin-bottom: 5px;
}

.aside-header-user {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 3px;
}

.aside-header-search-inp {
  display: flex;
  gap: 5px;
  align-items: center;
  height: 30px;
  margin-bottom: 20px;
}

.aside-header-search-inp input {
  flex: 1;
  height: 100%;
  border: none;
  border-radius: 10px;
}

.aside-contacts {
  width: 100%;
}

.aside-contacts .contact {
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 5px;
  background: #f5f5f5; /* Fondo ligeramente gris */
  color: #333; /* Texto gris oscuro */
}

.aside-contacts .contact:hover {
  background: white; /* Fondo blanco al pasar el mouse */
  color: black; /* Texto negro al pasar el mouse */
}

.aside-interactions {
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 10px;
}

.aside-interactions .add-contact {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: white; /* Fondo blanco */
  border: none;
  border-radius: 10px;
}

/* Media query para pantallas pequeñas */
@media (max-width: 600px) {
  .container {
    grid-template-columns: 1fr;
  }

  .container main {
    display: none;
  }

  header {
    display: block;
  }

  .aside-contacts .contact {
    border: 1px solid black;
    padding: 10px;
  }

  .aside-contacts .contact .contact-img img {
    border: 3px solid white;
    width: 100px;
  }

  .container aside .aside-header {
    display: none;
  }
}

</style>