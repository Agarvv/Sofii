// useUser.js
import { ref, onMounted } from 'vue';

export function useUser() {
  const usuario = ref(null);
  const isLoadingUser = ref(true);
  const userError = ref(null);

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/sofi/check_token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        usuario.value = data.user;
        console.log('Composable user:', usuario.value);
      } else {
        const data = await response.json();
        console.log('Composable user server data', data);
      }
    } catch (e) {
      console.error('Error al obtener los datos del usuario:', e);
      userError.value = 'Error al obtener los datos del usuario.';
    } finally {
      isLoadingUser.value = false;
    }
  };

  onMounted(fetchUser);

  return { usuario, isLoadingUser, userError };
}