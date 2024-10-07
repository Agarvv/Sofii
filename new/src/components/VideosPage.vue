<template>
    
    <HeaderComponent :activePage="'watch'" :user="usuario"/>
    
  <div class="container">
      
  <div class="videos-wrapper"> 
    <div v-for="video in videos" :key="video.id" class="videos">
      <VideoCard :video="video" /> 
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
import { mapGetters, mapActions } from 'vuex'


export default {
  components: {
    VideoCard,
    HeaderComponent
  },
  data() {
    return {
      videos: [], // Empty
      error: "",
      videosById: {}
    };
  },
  computed: {
      ...mapGetters(['user'])
  },
  methods: {
      ...mapActions(['fetchUser']),
    async getVideos() {
      try {
          await this.fetchUser()
          const data = await findVideos(this.user) 
          this.videos = data.videos
          this.videos.forEach(video => {
            this.videosById[video.id] = video;
          });
          
      } catch(e) {
          this.error = "Internal Server Error"
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