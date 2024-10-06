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
import { findVideos } from '../services/videoService'
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
      videos: [], // Empty
      error: "",
      videosById: {}
    };
  },
  methods: {
    async getVideos() {
      try {
          const data = await findVideos(this.usuario) 
          this.videos = data.videos
          this.videos.forEach(video => {
            this.videosById[video.id] = video;
          });
          console.log('videos by id: ', this.videosById) 
      } catch(e) {
          this.error = "Internal Server Error"
      }
    }
  },
  watch: {
      usuario(newValue) {
          if(newValue) {
              this.getVideos()
          }
      }
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