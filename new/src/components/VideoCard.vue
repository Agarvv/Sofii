<template>
  <div  class="video">
    <div class="video-header">
      <div @click="goToUserPage(video.user_video.id)" class="video-user-img">
        <img :src="'http://localhost:3000/' + video.user_video.profilePicture" alt="Video User Image">
      </div>
      <div class="video-user-detail">
        <h4>{{ video.user_video.username }}</h4>
      </div>
      <div class="video-button-ellipsis">
        <font-awesome-icon icon="fas fa-ellipsis-h" />
      </div>
    </div>
    <div class="video-content">
      <div class="video-description">
        <p>{{ video.video_description }}</p>
      </div>
      <div @click="goToVideoPage(video.id)" class="video-file">
        <video controls>
          <source :src="'http://localhost:3000/' + video.video_content" type="video/mp4" />
          Your browser does not support Videos.
        </video>
      </div>
    </div>
    <div class="video-interactions">
      <div @click="likeVideo(video.id)" class="like"><font-awesome-icon icon="fas fa-thumbs-up" /> 
                   
      </div>
      <div @click="goToVideoPage(video.id)" class="comment"><font-awesome-icon icon="fas fa-comment" /></div>
      <div @click="saveVideo(video.id)" class="save"><font-awesome-icon icon="fas fa-bookmark" /></div>
    </div>
    
    

    
  </div>
  
</template>

<script>
export default {
  name: 'VideoCard',
  props: {
    video: { 
      type: Object,
      required: true
    }
  },
  data() {
    return {
      comment: ""
    };
  },
  methods: {
    async likeVideo(video_id) {
      const type = "VIDEO";
      
      const response = await fetch('http://localhost:3000/api/sofi/like_content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ video_id, type }),
        credentials: 'include'
      });
      const data = await response.json();
      console.log('Server data for likes: ', data);
    },
    async saveVideo(video_id) {
      const type = "VIDEO";
      
      const response = await fetch('http://localhost:3000/api/sofi/save_content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ video_id, type }),
        credentials: 'include'
      });
      const data = await response.json();
      console.log('Server data save videos: ', data);
    },
    goToVideoPage(video_id) {
      this.$router.push('/watch/' + video_id);
    },
    goToUserPage(user_id) {
      this.$router.push('/user/' + user_id);
    }
  },
  mounted() {
    console.log('Video:', this.video); 
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