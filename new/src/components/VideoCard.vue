<template>
  <div  class="video">
    <div class="video-header">
      <div @click="goToUserPage(video.user_video.id)" class="video-user-img">
        <img style="width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;" :src="video.user_video.profilePicture ? video.user_video.profile_picture : '/images/default.jpeg'">
      </div>
      <div class="video-user-detail">
        <h4>{{ video.user_video.username }}</h4>
      </div>
      <div @click="deleteAVideo(video.id)" class="video-button-delete">
        <font-awesome-icon icon="fas fa-close" />
      </div>
    </div>
    <div class="video-content">
      <div class="video-description">
        <p>{{ video.video_description }}</p>
      </div>
      <div @click="goToVideoPage(video.id)" class="video-file">
        <video controls>
          <source :src="video.video_content" type="video/mp4" />
          Your browser does not support Videos.
        </video>
      </div>
    </div>
    <div class="video-interactions">
      <div @click="likeAVideo(video.id)" class="like">
          <font-awesome-icon icon="fas fa-thumbs-up" :style="{color: isLiked ? 'blue' : ''}"/> 
        <span 
        :style="{
        color: isLiked ? 'blue' : ''
        }"
        >{{video.video_likes.length}}</span>
      </div>
      <div @click="goToVideoPage(video.id)" class="comment"><font-awesome-icon icon="fas fa-comment" />  
      <span>{{video.video_comments.length}}</span>
      </div>
      <div @click="saveAVideo(video.id)" class="save">
          <font-awesome-icon icon="fas fa-bookmark"
          :style="{
          color: isSaved ? 'blue' : ''
          }"
          />
      <span :style="{
      color: isSaved ? 'blue' : ''
      }">{{video.videos_saved.length}}</span>
      </div>
    </div>
    
    

    
  </div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { likeVideo } from '../services/videoService'
import { saveVideo } from '../services/videoService'
import { deleteVideo } from '../services/videoService'
import apiUrl from '../config'

export default {
  name: 'VideoCard',
  props: {
    video:  {}
  },
  data() {
    return {
      comment: "",
      error: "",
      apiUrl: apiUrl
    };
  },
  computed() {
      isLiked() {
                return this.video.isLiked
      },
      isSaved() {
          return this.video.isSaved
      }
  },
  methods: {
    async likeAVideo(video_id) {
      try {
          const data = await likeVideo(video_id)
          console.log('Data received from method!', data)
          
          if(data.liked) {
          this.isLiked = true
          } else {
              this.isLiked = false
          }
          
      } catch(e) {
          this.error = "Internal Server Error !"
          console.log(e)
      }
    },
    async saveAVideo(video_id) {
      try {
          const data = await saveVideo(video_id)
          console.log('Data received from method! sage', data)
          if(data.saved) {
              this.isSaved = true 
          } else {
              this.isSaved = false
          }
      } catch(e) {
          this.error = "Internal Server Error !"
          console.log(e)
      }
    },
    async deleteAVideo(video_id) {
        try {
          const data = await deleteVideo(video_id)
          console.log('Data received from method!', data)
      } catch(e) {
          this.error = "Internal Server Error !"
          console.log(e)
      }
    },
    goToVideoPage(video_id) {
      this.$router.push('/watch/' + video_id);
    },
    goToUserPage(user_id) {
      this.$router.push('/user/' + user_id);
    }
  },
  created() {
      console.log('video prop: ', this.video)
  }
};
</script>

<style scoped>
.videos {
  height: 100%;
  width: 100%;
}

.video {
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.video-header {
  display: flex;
  gap: 10px;
  align-items: center;
}

.video-user-img img {
  width: 50px;
  border-radius: 50%;
}

.video-description {
  margin-bottom: 15px;
  color: #333;
}

.video-file video {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.video-file {
  margin-bottom: 20px;
}

.video-interactions {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 15px 0;
  border-top: 1px solid #eee;
  color: #555;
}

.video-interactions i {
  font-size: 25px;
}


</style> 