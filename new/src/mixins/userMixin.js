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
        this.usuario = await response.json();
      } else {
        this.$router.push('/login'); // Redirigir al login si la autenticación falla
      }
    } catch (e) {
      console.error('Error al obtener los datos del usuario:', e);
      this.userError = 'Error al obtener los datos del usuario.';
      this.$router.push('/login'); // Redirigir al login en caso de error
    } finally {
      this.isLoadingUser = false; // Finalizar la carga
    }
  }
};