<template>
    
    <HeaderComponent :activePage="'watch'" :user="usuario" @showAside="toggleAside"/>
    
    <div v-show="showAside" class="rs-aside">
        <SidebarComponent activePage="home"/>
    </div>

    <div class="container">
      
        <div class="videos-wrapper"> 
            <div v-for="video in videos" :key="video.id" class="videos">
                <h1>Video</h1>
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
import VideoCard from './VideoCard';
import HeaderComponent from './HeaderComponent'
import SidebarComponent from './SidebarComponent'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    VideoCard,
    HeaderComponent,
    SidebarComponent
  },
  data() {
    return {
      videos: [], 
      error: "",
      showAside: false
    };
  },
  computed: {
      ...mapGetters(['user'])
  },
  methods: {
      ...mapActions(['fetchUser']),
      async getVideos() {
        try {
            await this.fetchUser();
            const data = await findVideos(this.user);
            console.log('data', data)
            this.videos = data.videos;
        } catch(e) {
            console.log('error?', e)
            this.error = "Internal Server Error";
        }
      },
      toggleAside() {
        this.showAside = !this.showAside;
      }
  },
  async mounted() {
      await this.getVideos()
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

.rs-aside {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px; 
    height: 100vh;
    overflow: auto; 
    display: block;
    border: 2px solid red;
}

@media(max-width: 600px) {
    .videos-wrapper {
        width: 100%;
    }
}

</style>