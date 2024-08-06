<template>
    <div>
        <!-- Aquí puedes agregar el contenido de la plantilla -->
    </div>
</template>

<script>
export default {
    name: 'SavedPage',
    data() {
        return {
            // Define tus datos aquí si es necesario
        };
    },
    methods: {
        redirectToContent(type, id) {
            switch (type) {
                case 'video': {
                    this.$router.push('/watch/' + id);
                    break; // Añadido para evitar la ejecución del siguiente case
                }
                case 'post': {
                    this.$router.push('/post/' + id);
                    break; // Añadido para evitar la ejecución del siguiente case
                }
                default: {
                    console.warn('Unknown content type:', type); // Manejo para tipos no reconocidos
                }
            }
        }
    },
    async created() {
        try {
            const response = await fetch('http://localhost:3000/api/sofi/get_user_saved_content', {
                method: 'GET',
                credentials: 'include'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Saved server data: ', data);
            
            // Aquí puedes manejar los datos guardados como lo necesites
        } catch (error) {
            console.error('Error fetching user saved content:', error);
        }
    }
};
</script>

<style scoped>
    /* Añade estilos aquí si es necesario */
</style>