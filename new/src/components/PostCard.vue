<template>
     <div  class="post" >
            <div class="post-header">
              <div>
 <img style="width: 50px; height: 50px; border-radius: 50%" :src="post.user.profilePicture ? apiUrl + '/' +  post.user.profilePicture: '/images/default.jpeg'" alt="Post User Image">
              </div>
              <div class="post-user-detail">
                <h4>{{ post.user.username }}</h4>
                <p style="color: gray">{{ post.userHandle }}</p>
              </div>
              <div @click="deleteAPost(post.id)" class="post-button-delete">
                <font-awesome-icon icon="close" />
              </div>
            </div>
            <div class="post-content">
              <div class="post-description">
                <p>{{ post.description }}</p>
              </div>
              <div @click="goToPost(post.id)" class="post-image">
                <img :src="apiUrl + '/' + post.postPicture" alt="Post Image">
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
              <div class="share"><font-awesome-icon icon="fas fa-share" /></div>
            </div>
            
          </div>
          
</template>

<script>
import { likePost, savePost, deletePost } from '../services/postService'
import userMixin from '../mixins/userMixin'
import { apiUrl } from '../config'

export default {
    mixins: [userMixin],
    name: 'PostCard',
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            error: "",
            isLiked: this.post.isLiked,
            isSaved: this.post.isSaved,
            apiUrl: apiUrl
        }
    },
    methods: {
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
       
        async deleteAPost(post_id) {
            try {
                const data = await deletePost(post_id)
                console.log('Data from deleting post: ', data)
            } catch(e) {
                this.error = "Internal Server Error"
            }
        },
        goToPost(id) {
            this.$router.push('/post/' + id)
        }
    },
    created() {
        console.log('post prop: ', this.post)
    }
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

.post-interactions i {
  font-size: 25px;
}

</style>