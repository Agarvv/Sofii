<template> 


 <div class="wrapper">
  <div class="container"> 

    <VideoCard :video="video"/>
     <div class="comments">
            
            
            
          <div class="upload-comment">
              
            <div class="user-picture">
              <img alt="User Picture">
            </div>
            
            <div class="input">
              <input v-model="comment" type="text" placeholder="Upload A Comment">
            </div>
            <div  @click="commentPost()" class="send-button">
              <font-awesome-icon icon="paper-plane"/>
            </div>
            
            
          </div>
          
          <div class="comment-section">
              
              
              
            <div v-for="comment in video.video_comments" class="comment">
                
              <div class="comment-user-details">
                  
                <div class="user-comment-img"> 
                  <img :src="'http://localhost:3000/' + comment.video_comment_user.profilePicture" alt="User Picture">
                </div>
                <div class="user-comment-username">
                  <h4>{{comment.video_comment_user.username}}</h4>
                </div>
              </div>
              
              
              <div class="user-comment">
                <p>{{comment.comment_content}}</p>
              </div>
              
              
              <div class="comment-interacts">
                <div class="like">
                  <i class="fa fa-thumbs-up"></i>
                  <p>Likes</p>
                </div>
                <div class="awnser">
                  <i class="fa fa-comments"></i>
                  <p>Awnser</p>
                </div>
                <div class="dislike">
                  <i class="fa fa-thumbs-down"></i>
                  <p>Don't Like</p>
                </div>
              </div>
              
              
              <div class="view-responses-button">
                <p>See Responses</p>
                <i class="fa fa-angle-down"></i>
              </div>
              
              
              <div style="display: none;" class="comment-responses">
                  
                <div class="response">
                    
                  <div class="response-user">
                    <div class="response-user-img">
                      <img >
                    </div>
                    
                    <div class="response-username">
                      <h3></h3>
                    </div>
                    
                  </div>
                  
                  <div class="response-content">
                    <p></p>
                  </div>
                  
                  <div class="comment-response-interact">
                      
                    <div class="like">
                      <i class="fa fa-thumbs-up"></i>
                      <span></span>
                    </div> 
                    
                    <div class="awnser">
                      <i class="fa fa-comment"></i>
                      <span>Awnser</span>
                    </div>
                    
                    <div class="dislike">
                      <i class="fa fa-thumbs-down"></i>
                      <span>Dislike</span>
                      
                    </div>
                    
                  </div>
                  
                  <div class="comment-response-response-awnser">
                    <div class="user-img">
                      <img src="invict-victory-edp.jpg" style="width: 40px; border-radius: 50%;">
                    </div>
                    <div class="response-inp">
                      <input type="text" placeholder="Awnser To @lebeau">
                    </div>
                    <div class="response-send-button">
                      <i class="fa fa-share"></i>
                    </div>
                    
                    
                  </div>
                  
                  
                </div> <!-- <-- END OF AWNSERS FOR -->
                
                
              </div>
              
              
            </div> <!-- <-- END OF COMMEMTS FOR -->
            
            
          </div>
        </div>
        
    </div>
  </div> 
</template>

<script>
import VideoCard from './VideoCard.vue';

    export default {
        name: 'SingleVideoPage',
        components: {
            VideoCard
        },
        data() {
            return {
                video: {},
                comment: ""
            }
        },
        methods: {
            async getVideo() {
                const videoId = this.$route.params.video_id
                
                const response = await fetch('http://localhost:3000/api/sofi/video/' + videoId)
                
                const data = await response.json()
                
                console.log('Server data:bid ', data)
                
                this.video = data.video
            },
            async commentPost() {
    const response = await fetch('http://localhost:3000/api/sofi/comment_post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comment: this.comment,
            type: "VIDEO",
            video_id: this.video.id
        }),
        credentials: 'include'
    });

    const data = await response.json();
    console.log('comment posted: ', data);
}
        },
        async created() {
            this.getVideo()
        }
    }
</script>

<style scoped>


.wrapper {
    width: 100%;
    height: 100vh;

    
}

    .comments {
    position: relative;
}

.upload-comment {
    display: grid;
    grid-template-columns: 1fr 9fr 1fr;
    grid-gap: 10px;
    padding: 10px;
    background: white;
    border-bottom: 1px solid #ccc;
    position: sticky;
    top: 0;
    z-index: 1;
}

.post .send-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}



.upload-comment .user-picture img {
    width: 40px;
    border-radius: 50%;
}

.upload-comment input {
    width: 100%;
    height: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
}

.comment-section {
    background: white;
    color: black;
    margin-top: 20px;
     width: 100%;
     height: 100vh;
}

.comment-user-details img {
    width: 40px;
    border-radius: 50%;
}

.comment-user-details {
    display: flex;
    align-items: center;
    gap: 10px;
}

.comment-user-details h4 {
    font-size: 18px;
    font-weight: 700;
}

.user-comment {
    display: flex;
    flex-wrap: wrap;
}

.comment {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.comment-interacts {
    margin-top: 10px;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.comment-interacts div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 16px;
    padding: 5px;
}

.comment-responses {
    padding-left: 20px;
}

.comment-responses .response {
    padding: 10px;
    border-top: 1px solid #ccc;
}

.response-user-img img {
    width: 30px;
    border-radius: 50%;
}

.response-user {
    display: flex;
    align-items: center;
    gap: 10px;
}

.comment-response-interact {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 10px;
}

.comment-response-interact div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 5px;
}

.response-content {
    margin-bottom: 10px;
}

.comment-response-response-awnser {
    display: grid;
    grid-template-columns: 0.2fr 3fr 0.2fr;
    grid-gap: 10px;
}

.comment-response-response-awnser .user-img {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.comment-response-response-awnser .response-inp input[type="text"] {
    width: 100%;
    border-radius: 15px;
    border: none;
}

.comment-response-response-awnser .response-send-button {
    display: flex;
    align-items: center;
    justify-content: center;
}

.view-responses-button {
    font-size: 16px;
    color: gray;
    margin-bottom: 10px;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
}
</style>