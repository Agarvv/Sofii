<template>
  <div>
    <header>
      <i class="fa fa-arrow-left"></i>
     
    </header>
    
    <div> 
      <div class="post-ctn">
          <PostCard :post="post"/>
          <UploadComment :id="$route.params.id" type="POST"/>
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
      console.log('post from service', post)
      this.post = post
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
      
          console.log('comments by id: ', this.commentsById)
          console.log('awnsers by id: ', this.awnsersById)
          
          await this.fetchUser() 
          await this.getPost(this.user)
          
          

    this.$socket.on('likePost', newLike => {
    console.log('Like Recibido!', newLike);
    alert('like received')

    const postTarget = this.post

    if (postTarget) {
        console.log('post target: ', postTarget);
        console.log('new liker: ', newLike);
        console.log('likes from post:', postTarget.postLikes);
        

        postTarget.postLikes.push({ ...newLike });


    } else {
        console.warn(`Post con ID ${newLike.post_id} no encontrado.`);
    }
});


this.$socket.on('unlikePost', like => {
        console.log('Unlike Recibido!', like);

        // Encontramos el post en cuestión
        const postTarget = this.post

        if (postTarget) {
            // Filtramos el like que corresponde al unlike
            postTarget.postLikes = postTarget.postLikes.filter(l => l.id !== like.id);
        } else {
            console.warn(`Post con ID ${like.post_id} no encontrado.`);
        }
  });


this.$socket.on('savedPost', saved => {
    console.log('Saved Received!', saved);

    const postTarget = this.post

    if (postTarget) {
        // Verificar si el evento pertenece al usuario actual
        if (saved.user_id === this.user.user_id) {
            postTarget.isSaved = true;  // Solo actualizamos isSaved si es para el usuario actual
        }
        postTarget.saved_post.push(saved);
    }
});


this.$socket.on('unsavedPost', saved => {
    const postTarget = this.post
    
    if (postTarget) {
        console.log('Unsaved recibido:', saved);

        // Eliminar el guardado del usuario específico
        postTarget.saved_post = postTarget.saved_post.filter(s => 
            !(s.user_id === saved.user_id && s.post_id === saved.post_id)
        );

        // Si el evento es para el usuario actual, actualizamos el estado `isSaved`
        if (saved.user_id === this.user.user_id) {
            postTarget.isSaved = false;
        }
    }
});

this.$socket.on('likeComment', like => {

    const commentTarget = this.commentsById[like.comment_id]
    if(commentTarget) {
      
        commentTarget.comment_likes.push(like)
    } else {
        return
    }
})

this.$socket.on('unlikeComment', like => {
   
    const commentTarget = this.commentsById[like.comment_id]
    if(commentTarget) {
        commentTarget.comment_likes = commentTarget.comment_likes.filter(l => l.id !== like.id)
    }
})

this.$socket.on('dislikeComment', dislike => {
    
    const commentTarget = this.commentsById[dislike.comment_id]
    if(commentTarget) {
        commentTarget.comment_dislikes.push(dislike)
    } else {
        return
        
    }
})

this.$socket.on('undislikeComment', dislike => {
    
    const commentTarget = this.commentsById[dislike.comment_id]
    if(commentTarget) {
        commentTarget.comment_dislikes = commentTarget.comment_dislikes.filter(d => d.id !== dislike.id)
    }
})

this.$socket.on('likeCommentAwnser', newLike => {
       alert('jwjf')
        const targetAwnser = 
        this.awnsersById[newLike.awnser_id]
        
        if(targetAwnser) {
            alert('ok')
            targetAwnser.awnser_likes.push(newLike)
        } else {
            alert('not ok')
        }
 })
        
this.$socket.on('unlikeCommentAwnser', newLike => {
    const targetAwnser = 
        this.awnsersById[newLike.awnser_id]
        
        if(targetAwnser) {
            targetAwnser.awnser_likes = targetAwnser.awnser_likes.filter(l => l.id !== newLike.id)
        }
})

this.$socket.on('dislikeCommentAwnser', dislike => {
        const targetAwnser = 
        this.awnsersById[dislike.awnser_id]
        
        if(targetAwnser) {
            targetAwnser.awnser_dislikes.push(dislike)
        }
        
       
 })
        
this.$socket.on('undislikeCommentAwnser', dislike => {
    const targetAwnser = 
        this.awnsersById[dislike.awnser_id]
        
        if(targetAwnser) {
            targetAwnser.awnser_dislikes = targetAwnser.awnser_dislikes.filter(l => l.id !== dislike.id)
          
        }
        
    
})

this.$socket.on('newComment', newComment => {
    this.post.postComments.push(newComment)
    this.commentsById[newComment.id] = newComment;
})

this.$socket.on('newCommentAwnser', newAwnser => {
    alert('new awnser')
    console.log('commemta wnser received: ', newAwnser)
    const commentTarget = this.commentsById[newAwnser.comment_id]
    if(commentTarget) {
        commentTarget.awnsers.push(newAwnser)
        this.awnsersById[newAwnser.id] = newAwnser
    }
})





  },
  mounted() {
      console.log('this post: ', this.post)
      this.post.postComments.forEach(comment => {
            this.commentsById[comment.id] = comment;
          //  comment.isLiked = comment.comment_likes.some(like => like.user_id == this.usuario.user_id)
            
         //   comment.isDisliked = comment.comment_dislikes.some(dislike => dislike.user_id == this.usuario.user_id)
            
            
         
            comment.awnsers.forEach(awnser => {
            this.awnsersById[awnser.id] = awnser; 
            
          //  awnser.isLiked = awnser.awnser_likes.some(like => like.user_id == this.usuario.user_id)
            
         //   awnser.isDisliked = awnser.awnser_dislikes.some(dislike => dislike.user_id == this.usuario.user_id)
            
            
          });
          
          console.log('final comment: ', comment)
          
         });
          
          
  }
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
    border: 4px solid black;
}

.post-ctn{
    background: white;
    width: 70%;
    padding: 10px;
    min-height: auto; 
    max-height: 600px;
    border: 3px solid red;
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