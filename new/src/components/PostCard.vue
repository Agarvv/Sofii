<template>
     <div  class="post" >
         
            <div class="post-header">
              <div @click="goToPage('/user/' + post.user.id)">
                 <img style="
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  object-fit: cover;
                 " :src="post.user.profilePicture || '/images/default.jpeg'" alt="Post Image">
              </div>
              <div class="post-user-detail">
                <h4>{{ post.user.username }}</h4>
                <p style="color: gray">{{ post.userHandle }}</p>
              </div>
             
              <div v-if="
              post.user_id == user.user_id
              " @click="deleteAPost(post.id)" class="post-button-delete">
                <font-awesome-icon icon="close" />
              </div>
            </div>
            <div class="post-content">
              <div class="post-description">
                <p>{{ post.description }}</p>
              </div>
              <div @click="goToPage('/post/' + post.id)" class="post-image">
                <img :src="post.postPicture ? post.postPicture : '/images/default_banner.webp'" alt="Post Image">
              </div>
            </div>
            
            
            <div class="post-interactions">
              <div @click="likeAPost(post.id)" class="like">
                    <font-awesome-icon 
                      icon="fas fa-thumbs-up" 
                      :style="{ color: isLiked ? 'blue' : ''}" 
                      />
               <span :style="{ color: isLiked ? 'blue' : '' }">{{ post.postLikes.length }}</span>
              
              </div>
              <div class="comment"> <font-awesome-icon icon="fas fa-comment" /> <span>{{post.postComments.length}}</span></div>
              
              <div @click="saveAPost(post.id)" class="save">
                  <font-awesome-icon icon="fas fa-bookmark"
                   :style="{ color: isSaved ? 'blue' : ''}"
                  /> <span :style="{ color: isSaved ? 'blue' : ''}">{{post.saved_post.length}}</span> </div>
            </div>
            
          </div>
          
</template>

<script>
import { likePost, savePost, deletePost } from '../services/postService'
import { mapGetters, mapActions } from 'vuex'
import { apiUrl } from '../config'

export default {
    name: 'PostCard',
    props: {
        post: {}
    },
    data() {
        return {
            error: "",
            apiUrl: apiUrl,
            isLiked: this.post.isLiked,
            isSaved: this.post.isSaved,
            isLiking: false,
            isSaving: false,
            // isOwn: false
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        
        ...mapActions(['fetchUser']),
        
    
        async likeAPost(post_id) {
           if(this.isLiking) return
            try {
              this.isLiking = true
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
            } finally {
              this.isLiking = false
            }
        },
       
       async saveAPost(post_id) {
        if(this.isSaving) return
           try {
            this.isSaving = true
            const data = await savePost(post_id)
           
           if(data.saved) {
               this.isSaved = true
           } else {
               this.isSaved = false
           }

           } catch(e) {
            console.error(e)

           } finally {
            this.isSaving = false
           }
       },
       
        async deleteAPost(post_id) {
            const wants = confirm('Are you sure you want to delete this post?')
            if(wants) {
              try {
                const data = await deletePost(post_id)
                console.log('Data from deleting post: ', data)
                this.$emit('delete', this.post.id)
            } catch(e) {
                this.error = "Internal Server Error"
            }
            } else {
              return
            }
        },
        goToPage(route) {
            this.$router.push(route)
        }
    },
created() {
  this.$socket.on('likePost', newLike => {
    console.log('new like', newLike);
      if (newLike.post_id === this.post.id) {
        this.post.postLikes.push({ ...newLike });
      } 
    });

    this.$socket.on('unlikePost', like => {
      console.log('unlike', like);
      if (like.post_id === this.post.id) {
        this.post.postLikes = this.post.postLikes.filter(l => l.id !== like.id);
      } 
    });

     this.$socket.on('savedPost', saved => {
      console.log('saved', saved);
      if (saved.post_id === this.post.id) {
        this.post.saved_post.push(saved);
      }
    });

    this.$socket.on('unsavedPost', saved => {
      console.log('unsaved', saved);
      if (saved.post_id === this.post.id) {
        this.post.saved_post = this.post.saved_post.filter(s => 
          !(s.user_id === saved.user_id && s.post_id === saved.post_id)
        );
        //if (saved.user_id === this.user.id) {
       //   postTarget.isSaved = false;
       // }
      }
    });
},
async mounted() {
    await this.fetchUser()
},
watch: {
  post(newPost) {
      console.log('post fron watch', newPost)
      console.log('user from watch', this.user)
    this.isLiked = newPost.isLiked
    this.isSaved = newPost.isSaved
   // this.isOwn = newPost.user_id == this.user.user_id
  },
},
}
</script>

<style scoped>
.post {
    padding: 15px;
    border-bottom: 1px solid #eee; 
    display: flex;
    flex-direction: column;
    background: #fff; 
    border-radius: 8px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
    margin-bottom: 20px;
    width: 100%;
}

.post .post-header {
    display: flex;
    gap: 10px;
    align-items: center;
}

.post .post-header .username {
    flex: 1; /* Permite que el nombre de usuario ocupe todo el espacio disponible */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.post .post-button-ellipsis {
    display: flex;
    align-items: top;
    justify-content: flex-end;
    width: auto;
}

.post-description {
    margin-bottom: 15px;
    color: #333; /* Color de texto más oscuro */
}

.post-image img {
    width: 100%;
    height: auto;
    max-height: 300px;
    object-fit: cover;
    border-radius: 8px; /* Bordes redondeados para imágenes */
}

.post-image {
    margin-bottom: 20px;
}

.post-interactions {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 15px 0;
    border-top: 1px solid #eee; /* Separador superior */
    color: #555; /* Color de los íconos de interacción */
}

.post-button-delete {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}


</style>