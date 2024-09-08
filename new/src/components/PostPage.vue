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
              <img :src="'http://localhost:3000/' + post.user.profilePicture">
            </div>
            <div class="post-username">
              <h3>{{ post.user.username }}</h3>
              <p style="color: gray">3h</p>
            </div>
          </div>
          <div class="post-description">
            <p>{{ post.description }}</p>
          </div>
        </div>
        
        <div class="post-image">
          <img :src="'http://localhost:3000/' + post.postPicture" alt="Post Image">
        </div>
        
        <div class="post-interactions">
          <div @click="likeAPost(post.id)" class="like">
            <font-awesome-icon icon="thumbs-up"
            :style="{color: isLiked ? 'blue' : ''}"
            />
            <span
            :style="{color: isLiked ? 'blue' : ''}"
            >{{post.postLikes.length}}</span>
          </div>
          <div style="border: none" class="comment">
            <font-awesome-icon icon="comments"/>
            <span>{{post.postComments.length}}</span>
          </div>
          <div class="share">
            <font-awesome-icon icon="share"/>
          </div>
          <div @click="saveAPost(post.id)" class="save">
            <font-awesome-icon icon="bookmark"
            :style="{color: isSaved ? 'blue' : ''}"
            />
            <span
            :style="{color: isSaved ? 'blue' : ''}"
            >{{post.saved_post.length}}</span>
          </div>
        </div>
        
        <div class="comments">

         <UploadComment :id="$route.params.id" :type="POST"/>
          
          <div class="comment-section">

            <div v-for="(comment, index) in post.postComments" :key="comment.id" class="comment">

              <div class="comment-user-details">
                <div class="user-comment-img"> 
                  <img :src="`http://localhost:3000/${comment.commentUser.profilePicture}`" alt="User Picture">
                </div>
                <div class="user-comment-username">
                  <h4>{{ comment.commentUser.username }}</h4>
                </div>
              </div>
              
              <div class="user-comment">
                <p>{{ comment.comment_content }}</p>
              </div>
              
              <div class="comment-interacts">
                <div @click="likeComment(comment.id)" class="like">
                  <font-awesome-icon icon="thumbs-up"/>
                  <p>{{ comment.comment_likes.length }}</p>
                </div>
                <div @click="toggleShowAwnserInp(index)" class="awnser">
                  <font-awesome-icon icon="share"/>
                  <p>{{comment.awnsers.length}}</p>
                </div>
                <div @click="dislike('COMMENT', comment.id)" class="dislike">
                  <font-awesome-icon icon="thumbs-down"/>
                  <p>{{comment.comment_dislikes.length}}</p>
                </div>
              </div>
              
              <div v-if="comment.showAwnserInp" class="comment-awnser">
                <div class="comment-awnser-user">
                  <div class="comment-awnswer-user-img">
                    <img style="border-radius: 50%; width: 50px; height: 50px; object-fit: cover" :src="`http://localhost:3000/${user.user_picture}`" alt="User Picture">
                  </div>
                </div>
                
                <div class="comment-awnser-input">
                  <input v-model="comment_awnser" placeholder="Answer To This Comment.">
                </div>
                
                <div @click="awnserToAComment(comment.id)" class="comment-awnser-send-button">
                  <font-awesome-icon icon="paper-plane"/>
                </div>
              </div>
              
              <div class="view-responses-button" @click="toggleResponses(index)">
                <p>{{ comment.showResponses ? 'Hide Responses' : 'See Responses' }}</p>
                <font-awesome-icon :icon="comment.showResponses ? 'chevron-up' : 'chevron-down'"/>
              </div>
              
              <div v-if="comment.showResponses" class="comment-responses">
                <div v-for="awnser in comment.awnsers" :key="awnser.id" class="response">
                  <div class="response-user">
                    <div class="response-user-img">
                      <img style="width: 40px; height: 40px; border-radius: 50%" :src="'http://localhost:3000/' + awnser.awnser_user.profilePicture">
                    </div>
                    <div class="response-username">
                      <h3>{{awnser.awnser_user.username}}</h3>
                    </div>
                  </div>
                  
                  <div class="response-content">
                    <p>{{awnser.answer_content}}</p>
                  </div>
                  
                  <div class="comment-response-interact">
                    <div @click="likeCommentAwnser(awnser.id, comment.id)" class="like">
                      <font-awesome-icon icon="thumbs-up"
                  
                      />
                      <span
      
                       >{{awnser.awnser_likes.length}}</span>
                    </div> 
                    <div @click="dislike('AWNSER', comment.id, awnser.id)" class="dislike">
                      <font-awesome-icon icon="thumbs-down"/>
                      <span>{{awnser.awnser_dislikes.length}}</span>
                    </div>
                  </div>
                </div> <!-- <-- END OF AWNSERS FOR -->
              </div>
            </div> <!-- <-- END OF COMMENTS FOR -->



          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userMixin from '@/mixins/userMixin';
import { likePost } from '../services/postService'
import { savePost } from '../services/postService'
import { getPost } from '../services/postService'
import { postComment } from '../services/postService'
import { awnserToComment } from '../services/postService'
import { likeComment } from '../services/postService'
import { likeCommentAwnser } from '../services/postService'
import { dislikeComment } from '../services/postService'
import { dislikeCommentAwnser } from '../services/postService'
import { checkIfUserLikedPost, checkIfUserSavedPost } from '../services/postService'
import UploadComment from './UploadComment'

export default {
  name: 'PostPage',
  components: {
    UploadComment
  },
  mixins: [userMixin],
  data() {
    return {
      post: {
        postComments: []
      },
      postComment: "",
      comment_awnser: "",
      user: {},
      error: "",
      isLiked: false,
      isSaved: false
    };
  },
  computed: {
     
  }, 
  methods: {
    async getPost() {
      const post = await getPost(this.$route.params.id)
      this.post = post
      this.post.isLiked = await checkIfUserLikedPost(post, this.usuario)
      this.post.isSaved = await checkIfUserSavedPost(post, this.usuario)
      this.isLiked = this.post.isLiked
      this.isSaved = this.post.isSaved
      console.log('final post n:', this.post)
    },

     async likeAPost(post_id) {
            try {
                const data = await likePost(post_id)
                console.log('Like Post Method: ', data)
                
                console.log('server data from like service xd', data)
                
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


    async awnserToAComment(comment_id) {
        try {
            const data = await awnserToComment("POST", this.$route.params.id, comment_id, this.comment_awnser)
            console.log('al ok,', data)
        } catch(e) {
            this.error = "Internal Server Error"
        }
    },

    async likeComment(comment_id) {
      try {
          const data = await likeComment("COMMENT", comment_id, this.$route.params.id)
      
          console.log('allvok: ', data)
      } catch(e) {
          this.error = "Internal Server Error"
      }
    },
    
    async likeCommentAwnser(awnser_id, comment_id) {
      try {
          const data = await likeCommentAwnser("COMMENT_AWNSER", comment_id, awnser_id, this.$route.params.id)
          console.log('all ok: ', data)
      } catch(e) {
          this.error = "Internal Server Error"
      }
    },
    
    
    async dislikeComment(comment_id) {
        try {
            const data = await dislikeComment("COMMENT", comment_id, this.$route.params.id)
            console.log('all ok: ', data)
        } catch(e) {
            this.error = "Internal Server Error"
        }
    },
    
    async dislikeCommentAwnser(comment_id, awnser_id) {
        try {
            const data = await dislikeCommentAwnser("COMMENT_AWNSER", comment_id, awnser_id, this.$route.params.id)
            console.log('all ol: ', data)
        } catch(e) {
            this.error = "Internal Server Error"
        }
    },

    updateCommentLikeStatus(comment_id, liked) {
      // Encuentra el comentario correspondiente y actualiza su estado de like
      const comment = this.post.postComments.find(comment => comment.id === comment_id);
      if (comment) {
        comment.liked = liked;
      }
    },

    updateCommentAnswerLikeStatus(comment_id, awnser_id, liked) {
      // Encuentra el comentario correspondiente y luego la respuesta dentro de él, y actualiza su estado de like
      const comment = this.post.postComments.find(comment => comment.id === comment_id);
      if (comment && comment.answers) {
        const answer = comment.answers.find(answer => answer.id === awnser_id);
        if (answer) {
          answer.liked = liked;
        }
      }
    },





    toggleResponses(index) {
      this.post.postComments[index].showResponses = !this.post.postComments[index].showResponses;
    },

    toggleShowAwnserInp(index) {
      this.post.postComments[index].showAwnserInp = !this.post.postComments[index].showAwnserInp;
    }
  },

  async created() {
    
    this.$socket.on('likePost', newLike => {
    console.log('Like Recibido!', newLike);
    

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
        if (saved.user_id === this.usuario.id) {
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
        if (saved.user_id === this.usuario.id) {
            postTarget.isSaved = false;
        }
    }
});







  },
  watch: {
    usuario(newValue, oldValue) {
      if(newValue) {
         this.getPost()
      }
    }
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
}

.post {
    background: white;
    height: 100%;
    width: 70%;
    padding: 10px;
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