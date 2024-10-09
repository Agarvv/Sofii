<template>
  <div>
    
    <div> 
      <div class="post-ctn">
          <PostCard :post="post"/>
          <UploadComment :id="$route.params.id" type="POST" :user="user"/>
        <div class="comments">
          <div class="comment-section">
            <div v-for="(comment, index) in post.postComments" :key="comment.id" class="comment">
               <CommentCard :comment="comment"/>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { likePost,
         savePost,
         getPost,
        // postComment,
        // awnserToComment,
        // likeComment,
        // likeCommentAwnser,
        // dislikeComment,
        // dislikeCommentAwnser,
        // likeCommentAwnser,
        // checkIfUserLikedPost,
        // checkIfUserSavedPost
 } from '../services/postService'
         
         
import UploadComment from './UploadComment'
import CommentCard from './CommentCard'
import PostCard from './PostCard'
import { mapGetters, mapActions } from 'vuex';


export default {
  name: 'PostPage',
  components: {
    UploadComment,
    CommentCard,
    PostCard
  },
  data() {
    return {
      post: {
        
      },
      postComment: "",
      comment_awnser: "",
      error: "",
      isLiked: false,
      isSaved: false,
      commentsById: {},
      awnsersById: {}
    };
  },
  computed: {
    ...mapGetters(['user']),
  }, 
  methods: {
    ...mapActions(['fetchUser']),


  async getPost(currentUser) {
   try { 
      const post = await getPost(this.$route.params.id, currentUser)
      this.post = post
      console.log('thos.potd', this.post)
   } catch(e) {
       this.error = "Oops, Something Went Wrong..."
       console.log('ERROR!', e)
   }
    },

     async likeAPost(post_id) {
            try {
                const data = await likePost(post_id)
        
                if(data.liked) {
                    this.isLiked = true
                } else {
                    this.isLiked = false
                }
                
                
            } catch(e) {
                alert(e)
                this.error = "Oops, Something Went Wrong!"
            }
        },
       

       async saveAPost(post_id) {
           const data = await savePost(post_id)
           
           if(data.saved) {
               this.isSaved = true
           } else {
               this.isSaved = false
           }
       },
  },

  async created() {
      
      await this.fetchUser() 
          await this.getPost(this.user)
      
          console.log('comments by id: ', this.commentsById)
          console.log('awnsers by id: ', this.awnsersById)
         
          
          this.post.postComments.forEach(comment => {
            this.commentsById[comment.id] = comment;
            comment.awnsers.forEach(awnser => {
            this.awnsersById[awnser.id] = awnser; 
          });
          console.log('final comment: ', comment)
         });


this.$socket.on('newComment', newComment => {
    this.post.postComments.push(newComment)
    this.commentsById[newComment.id] = newComment;
})

this.$socket.on('newCommentAwnser', newAwnser => {
    
    console.log('commemta wnser received: ', newAwnser)
    const commentTarget = this.commentsById[newAwnser.comment_id]
    if(commentTarget) {
        commentTarget.awnsers.push(newAwnser)
        this.awnsersById[newAwnser.id] = newAwnser
    }
})

  },
};
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

img {
    object-fit: cover;
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

.post-ctn{
    background: white;
    width: 100%;
    padding: 10px;
    min-height: auto; 
    max-height: 600px;

}

.post-user-img img {
    width: 70px;
    height: 70px;
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

.post .send-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.comment-section {
    background: white;
    color: black;
    margin-top: 20px;
     width: 100%;
     height: 100vh;
}

.comment-user-details img {
    width: 50px;
    height: 50px;
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
    border: 3px solid red;
    display: flex;
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

.comment-awnser {
    display: grid;
    align-items: center;
    grid-gap: 10px;
    grid-template-columns: .1fr 1fr .1fr;
    margin-bottom: 15px;
}

.comment-awnser-input {
    height: 35px;
}
.comment-awnser-input input {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: .3px solid gray;
    padding: 10px;
}

.comment-awnser-send-button {
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 600px) {
    .post {
        width: 100%;
    }
}

</style>