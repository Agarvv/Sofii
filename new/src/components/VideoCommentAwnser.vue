<template>
     <div  class="response">
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
                      
                    <div @click="likeAAwnser(awnser.id, awnser.comment_id)">
                      <font-awesome-icon icon="thumbs-up"
                      :style="{color: isLiked ? 'blue' : ''}"
                      />
                      <span
                     :style="{color: isLiked ? 'blue' : ''}"
                      >{{awnser.awnser_likes.length}}</span>
                    </div> 
                    
                    
                    <div @click="dislikeAAwnser(awnser.id, awnser.comment_id)">
                      <font-awesome-icon icon="thumbs-down"
                      :style="{color: isDisliked ? 'blue' : ''}"
                      />
                      <span
                     :style="{color: isDisliked ? 'blue' : ''}"
                      >{{awnser.awnser_dislikes.length}}</span>
                      
                    </div>
                    
                  </div>
                  
      </div> <!-- <-- END OF AWNSERS FOR -->
                
</template>

<script>
import {
    likeVideoCommentAwnser,
    dislikeVideoCommentAwnser
} from '../services/videoService'
    export default {
        name: 'VideoCommentAwnser',
        props: {
            awnser: {}
        },
        data() {
            return {
                error: "",
                isLiked: this.awnser.isLiked,
                isDisliked: this.awnser.isDisliked
            }
        },
        methods: {
            async likeAAwnser(awnser_id, comment_id) {
                try {
                    const data = await likeVideoCommentAwnser(comment_id, awnser_id, this.$route.params.video_id, "VIDEO_COMMENT_AWNSER")
                    console.log('all olkk: ', data)
                    if(!this.isLiked) {
                        this.isLiked = true
                    } else {
                        this.isLiked = false
                    }
                } catch(e) {
                    this.error = "Internal Server Error"
                }
            },
            async dislikeAAwnser(awnser_id, comment_id) {
                try {
                    const data = await dislikeVideoCommentAwnser(comment_id, awnser_id, this.$route.params.video_id, "VIDEO_COMMENT_AWNSER")
                    console.log('all olkk: ', data)
                    if(!this.isDisliked) {
                        this.isDisliked = true
                    } else {
                        this.isDisliked = false
                    }
                } catch(e) {
                    this.error = "Internal Server Error"
                }
            }
        }
    }
</script>

<style scoped>
    .response {
    padding: 10px;
    border-bottom: 1px solid #ccc; /* Agregado para separar respuestas */
}

.response-user {
    display: flex;
    align-items: center;
    gap: 10px;
}

.response-user-img img {
    width: 30px; /* Ancho de imagen para usuario */
    height: 30px; /* Alto de imagen para usuario */
    object-fit: cover;
    border-radius: 50%; /* Bordes redondeados para imagen de usuario */
}

.response-username h3 {
    font-size: 18px; /* Tamaño de fuente para nombre de usuario */
    font-weight: 700; /* Negrita para el nombre de usuario */
}

.response-content {
    margin-bottom: 10px; /* Margen inferior para separar del resto */
}

.comment-response-interact {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Dos columnas para interacciones */
    margin-bottom: 10px; /* Margen inferior */
}

.comment-response-interact div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px; /* Espacio entre iconos y texto */
    padding: 5px; /* Espacio interno */
}

.like, .dislike {
    cursor: pointer; /* Cambia el cursor al pasar por encima */
}
</style>