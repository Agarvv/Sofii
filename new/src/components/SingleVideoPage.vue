<template> 


 <div class="wrapper">
  <div class="container"> 

    <VideoCard :video="video"/>
     <div class="comments">
            
            
          <div class="upload-comment">
              
            <div class="user-picture">
              <img style="object-fit: cover; height: 50px; width: 50px;" :src="'http://localhost:3000/' + usuario.user_picture" alt="User Picture">
            </div>
            
            <div class="input">
              <input v-model="comment" type="text" placeholder="Upload A Comment">
            </div>
            <div  @click="commentPost()" class="send-button">
              <font-awesome-icon icon="paper-plane"/>
            </div>
            
            
          </div>
          
          <div class="comment-section">
              
              
              
            <div v-for="(comment, index) in video.video_comments" class="comment">
                
              <div class="comment-user-details">
                  
                  
                <div class="user-comment-img"> 
                  <img style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;" :src="'http://localhost:3000/' + comment.video_comment_user.profilePicture" alt="User Picture">
                </div>
                <div class="user-comment-username">
                  <h4>{{comment.video_comment_user.username}}</h4>
                </div>
              </div>
              
              
              <div class="user-comment">
                <p>{{comment.comment_content}}</p>
               
              </div>
              
              
              <div class="comment-interacts">
                <div @click="like('COMMENT', comment.id)" class="like">
                  <font-awesome-icon icon="thumbs-up"/>
                  <p>{{comment.comment_likes.length}}</p>
                </div>
                <div @click="toggleAwnserInp(index)" class="awnser">
                  <font-awesome-icon icon="share"/>
                  <p>{{comment.awnsers.length}}</p>
                </div>
                <div @click="dislike('COMMENT', comment.id)" class="dislike">
                  <font-awesome-icon icon="thumbs-down"/>
                  <p>{{comment.comment_dislikes.length}}</p>
                </div>
              </div>
              
              <div v-show="comment.showAwnserInp" class="comment-awnser-input">
                  
                  <div class="comment-awnser-input-userImg">
                      <img style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" :src="'http://localhost:3000/' + usuario.user_picture">
                  </div>
                  
                  <div class="comment-awnser-input-inp">
                      <input v-model="comment_awnser" type="text" placeholder="Awnser To This Comment">
                      
                  </div>
                  
                  <div @click="awnserToComment(comment.id)">
                      <font-awesome-icon icon="paper-plane" />
                  </div>
                  
              </div>
              
              
              <div v-if="comment.awnsers.length > 0" @click="toggleAwnsers(index)" class="view-responses-button">
                <p>{{!comment.showAwnsers ? 'Show Awnsers' : 'Close Awnsers'}}</p>
                <font-awesome-icon :icon="!comment.showAwnsers ? 'angle-down' : 'angle-up'"/>
              </div>
              
              
              <div v-show="comment.showAwnsers" class="comment-responses">
                  
                <div v-for="awnser in comment.awnsers" :key="awnser.id" class="response">
                    
                  <div class="response-user">
                    <div class="response-user-img">
                      <img :src="'http://localhost:3000/' + awnser.comment_awnser_user.profilePicture">
                    </div>
                    
                    <div class="response-username">
                      <h3>{{awnser.comment_awnser_user.username}}</h3>
                    </div>
                    
                  </div>
                  
                  <div class="response-content">
                    <p>{{awnser.awnser_content}}</p>
                  </div>
                  
                  <div class="comment-response-interact">
                      
                    <div @click="like('AWNSER', comment.id, awnser.id)" class="like">
                      <font-awesome-icon icon="thumbs-up"/>
                      <span>{{awnser.awnser_likes.length}}</span>
                    </div> 
                    
                    
                    <div @click="dislike('AWNSER', comment.id, awnser.id)" class="dislike">
                      <font-awesome-icon icon="thumbs-down"/>
                      <span>{{awnser.awnser_dislikes.length}}</span>
                      
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
import userMixin from '../mixins/userMixin'

    export default {
        mixins: [userMixin],
        name: 'SingleVideoPage',
        components: {
            VideoCard
        },
        data() {
            return {
                video: {},
                comment: "",
                comment_awnser: ""
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
},
async awnserToComment(comment_id) {
    console.log('awnser to commdnt: method', comment_id)
    
    const response = await fetch('http://localhost:3000/api/sofi/awnser_to_comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: "VIDEO",
            video_id: this.video.id,
            awnser_content: this.comment_awnser,
            comment_id: comment_id
        }),
        credentials: 'include'
    })
    
    const data = await response.json()
    console.log('server data awnser comment: ', data)
    
},

async like(type, comment_id, awnser_id) {
    let response;
    let data; 
    
    switch(type) {
        
        case "COMMENT":
             response = await 
            fetch('http://localhost:3000/api/sofi/like_content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: "VIDEO_COMMENT",
                    video_id: this.video.id,
                    comment_id: comment_id
                }),
                credentials: 'include'
            })
            
            data = await response.json()
            console.log('server data like video comment: ', data)
            break;
        
        case "AWNSER":
            response = await fetch('http://localhost:3000/api/sofi/like_content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: "VIDEO_COMMENT_AWNSER",
                    video_id: this.video.id,
                    comment_id: comment_id,
                    awnser_id: awnser_id
                }),
                credentials: 'include'
            })
            
            data = await 
            response.json()
            console.log('server data like video comment awnser: ', data)
            
            break; 
            
            
        default:
             return 
    }
},

async dislike(type, comment_id, awnser_id) {
    let response;
    let data; 
    
    switch(type) {
        
        case "COMMENT":
             response = await 
            fetch('http://localhost:3000/api/sofi/dislike_content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: "VIDEO_COMMENT",
                    video_id: this.video.id,
                    comment_id: comment_id
                }),
                credentials: 'include'
            })
            
            data = await response.json()
            console.log('server data dislike video comment: ', data)
            break;
        
        case "AWNSER":
            response = await fetch('http://localhost:3000/api/sofi/dislike_content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: "VIDEO_COMMENT_AWNSER",
                    video_id: this.video.id,
                    comment_id: comment_id,
                    awnser_id: awnser_id
                }),
                credentials: 'include'
            })
            
            data = await 
            response.json()
            console.log('server data dislike video comment awnser: ', data)
            
            break; 
            
            
        default:
             return 
    }
},
toggleAwnserInp(index) {
   this.video.video_comments[index].showAwnserInp = !this.video.video_comments[index].showAwnserInp;
},
toggleAwnsers(index) {
    this.video.video_comments[index].showAwnsers = !this.video.video_comments[index].showAwnsers
}
        },
        async created() {
            this.getVideo()
            console.log(this.usuario)
        },
        async mounted() {
            console.log('mounted video', this.video)
            this.video.video_comments.forEach((comment) => {
                comment.showAwnserInp = false
                comment.showAwnsers = false
            })
            
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
    grid-template-columns: .1fr 1fr .1fr;
    grid-gap: 10px;
    padding: 10px;
    background: white;
    border-bottom: 1px solid #ccc;
  
}

.upload-comment div {
    display: flex;
    align-items: center;
    justify-content: center;
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
   
}

.response-user-img img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 50%;
}

.response-user {
    display: flex;
    align-items: center;
    gap: 10px;
}

.comment-response-interact {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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

.comment-awnser-input {
    display: grid;
    grid-template-columns: .1fr 1fr .1fr;
    grid-gap: 10px;
  
    padding: 10px;
}

.comment-awnser-input div {
   
    display: flex;
    align-items: center;
    justify-content: center;
}

.comment-awnser-input-inp input {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: .1px solid black;
   
}

</style>