<template>
  <div>
    <header>
      <i class="fa fa-arrow-left"></i>
    </header>
    
    <div class="container"> 
      <div class="post">
        <div class="post-header">
          <div class="post-user">
            <div class="post-user-img">
              <img :src="post.user_img">
            </div>
            <div class="post-username">
              <h3>{{ post.user_name }}</h3>
              <p style="color: gray">3h</p>
            </div>
          </div>
          <div class="post-description">
            <p>{{ post.description }}</p>
          </div>
        </div>
        
        <div class="post-image">
          <img style="width: 300px" :src="'http://localhost:3000/' + post.postPicture" alt="Post Image">
        </div>
        
        <div class="post-interactions">
          <div class="like">
            <i class="fa fa-heart"></i>
            <span>{{ post.likes }}</span>
          </div>
          <div class="comment">
            <i class="fa fa-comment"></i>
            <span>Comment</span>
          </div>
          <div class="share">
            <i class="fa fa-share"></i>
            <span>Share</span>
          </div>
          <div class="save">
            <i class="fa fa-bookmark"></i>
            <span>Save</span>
          </div>
        </div>
        
        <div class="comments">
            
            
            
          <div class="upload-comment">
              
            <div class="user-picture">
              <img :src="user">
            </div>
            
            <div class="input">
              <input type="text" placeholder="Upload A Comment">
            </div>
            <div class="send-button">
              <i class="fa fa-share"></i>
            </div>
            
            
          </div>
          
          <div class="comment-section">
              
              
              
            <div v-for="(comment, index) in comments" :key="index" class="comment">
                
              <div class="comment-user-details">
                  
                <div class="user-comment-img"> 
                  <img :src="comment.user_image">
                </div>
                <div class="user-comment-username">
                  <h4>{{ comment.user_name }}</h4>
                </div>
              </div>
              
              
              <div class="user-comment">
                <p>{{ comment.content }}</p>
              </div>
              
              
              <div class="comment-interacts">
                <div class="like">
                  <i class="fa fa-thumbs-up"></i>
                  <p>{{ comment.likes }}</p>
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
                <p>See {{ comment.responses.length }} Responses</p>
                <i class="fa fa-angle-down"></i>
              </div>
              
              
              <div style="display: none;" class="comment-responses">
                  
                <div v-for="(awnser, idx) in awnsers" :key="idx" class="response">
                    
                  <div class="response-user">
                    <div class="response-user-img">
                      <img :src="awnser.user_img">
                    </div>
                    
                    <div class="response-username">
                      <h3>{{ awnser.user_name }}</h3>
                    </div>
                    
                  </div>
                  
                  <div class="response-content">
                    <p>{{ awnser.content }}</p>
                  </div>
                  
                  <div class="comment-response-interact">
                      
                    <div class="like">
                      <i class="fa fa-thumbs-up"></i>
                      <span>{{ awnser.likes }}</span>
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
  </div>
</template>


<script>
export default {
    name: 'PostPage',
    data() {
        return {
            post: {},
            comments: [],
            awnsers: []
        }
    },
    methods: {
        async getPost() {
            const postId = this.$route.params.id; // probablemente quieras 'params' aquí
            const response = await fetch(`http://localhost:3000/api/sofi/post/${postId}`);

            if (!response.ok) {
                console.log('Something Went Wrong.');
                return;
            }

            const data = await response.json();
            console.log(data);
            this.post = data.post;

            const commentsResponse = await fetch(`http://localhost:3000/api/sofi/postsComments/${postId}`);
            if (!commentsResponse.ok) {
                console.log('Something Went Wrong..');
                return;
            }

            const commentsData = await commentsResponse.json();
            console.log(commentsData);
            this.comments = commentsData;
        },
        async getAwnsers(comment_id) {
            const response = await fetch(`http://localhost:3000/api/sofi/commentAwnsers/${comment_id}`);
            if (!response.ok) {
                console.log('Something Went Wrong!');
                return;
            }

            const data = await response.json();
            console.log(data);
            this.awnsers = data.awnsers;
        }
    }, 
    async mounted() {
      await this.getPost()
    },
}
</script>

<style scoped>
    html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
}

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

header {
    padding: 15px;
}

.container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.post {
    background: white;
    height: 100%;
    width: 70%;
    padding: 10px;
}

.post-user-img img {
    width: 70px;
    border-radius: 50%;
}

.post-header .post-user {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.post-description {
    margin-bottom: 10px;
}

.post-image img {
    width: 100%;
    height: 100%;
}

.post-interactions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}

.post-interactions div {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
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

@media (max-width: 600px) {
    .post {
        width: 100%;
    }
}

</style>