<template>
    
    <HeaderComponent :activePage="'watch'" :user="usuario"/>
    
  <div class="container">
      
  <div class="videos-wrapper"> 
    <div v-for="video in videos" :key="video.id" class="videos">
      <VideoCard :video="video" /> <!-- Cambié :videos="videos" a :video="video" -->
    </div>
    
    <div v-if="videos.length > 1" class="end-videos">
        <p>There Are No More Videos...</p>
    </div>
    
  </div>
    
  </div>
</template>

<script>
import VideoCard from './VideoCard.vue';
import HeaderComponent from './HeaderComponent'
import userMixin from '../mixins/userMixin'



export default {
  components: {
    VideoCard,
    HeaderComponent
  },
  mixins: [userMixin],
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

.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.videos-wrapper {
    width: 70%;
}

.end-videos {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
   color: gray;
}

@media(max-width: 600px) {
    .videos-wrapper {
        width: 100%;
    }
}

</style>