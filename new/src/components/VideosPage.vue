<template>
  <div>
    <div v-for="video in videos" :key="video.id" class="videos">
      <VideoCard :video="video" /> <!-- Cambié :videos="videos" a :video="video" -->
    </div>
  </div>
</template>

<script>
import VideoCard from './VideoCard.vue';

export default {
  components: {
    VideoCard
  },
  data() {
    return {
      videos: [] // Inicialmente vacío, se llenará con datos
    };
  },
  methods: {
    async getVideos() {
      const url = "http://localhost:3000/api/sofi/videos";
      try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Server data videos: ', data);
        this.videos = data.videos; // Asigna los datos recibidos al array videos
      } catch (error) {
        console.error('Fetch error: ', error);
      }
    }
  },
  created() {
    this.getVideos(); // Llama a la función para obtener los videos al crear el componente
  }
}
</script>

<style scoped>
/* Agrega estilos específicos si los necesitas */
</style>