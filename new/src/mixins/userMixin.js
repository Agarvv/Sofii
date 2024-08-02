// src/mixins/userMixin.js
export default {
  data() {
    return {
      usuario: null,
      isLoadingUser: true, // Indicador de carga
      userError: null // Mensaje de error si ocurre
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:3000/api/sofi/check_token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
      const data = await response.json()
      this.usuario = data.user
      console.log('mixin user: ', this.usuario)
      } else {
           const data = await response.json()
           console.log('Mixin user server data', data)
      }
    } catch (e) {
      console.error('Error al obtener los datos del usuario:', e);
      this.userError = 'Error al obtener los datos del usuario.';
      
    } finally {
      this.isLoadingUser = false; // Finalizar la carga
    }
  }
};