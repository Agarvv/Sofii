<template>
       <div  class="comment">
              <div class="comment-user-details">
                <div class="user-comment-img"> 
                  <img 
                  :src="
                   comment.commentUser.profilePicture ||
                   '/images/default.jpeg'
                  " alt="User Picture">
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
                  <font-awesome-icon icon="thumbs-up"
                  :style="{color: isLiked ? 'blue' : ''}"
                  />
                  <p
                 :style="{color: isLiked ? 'blue' : ''}"
                  >{{ comment.comment_likes.length }}</p>
                </div>
                <div @click="toggleShowAwnserInp(index)" class="awnser">
                  <font-awesome-icon icon="share"/>
                  <p>{{comment.awnsers.length}}</p>
                </div>
                <div @click="dislikeComment(comment.id)" class="dislike">
                  <font-awesome-icon icon="thumbs-down"
                   :style="{color: isDisliked ? 'blue' : ''}"
                  />
                  <p>{{comment.comment_dislikes.length}}</p>
                </div>
              </div>
              
              <div v-if="comment.showAwnserInp" class="comment-awnser">
                <div class="comment-awnser-user">
                  <div class="comment-awnswer-user-img">
                    <img style="border-radius: 50%; width: 50px; height: 50px; object-fit: cover" :src="`http://localhost:3000/${usuario.user_picture}`" alt="User Picture">
                  </div>
                </div>
                
                <div class="comment-awnser-input">
                  <input v-model="commentAwnser" placeholder="Answer To This Comment.">
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
                
                 <AwnserCard :awnser="awnser"/>

                </div> <!-- <-- END OF AWNSERS FOR -->


              </div>

     </div> <!-- <-- END OF COMMENTS FOR -->
</template>

<script>
import apiUrl from '../config'
import {
    likeComment,
    dislikeComment,
    likeCommentAwnser,
    dislikeCommentAwnser,
    awnserToComment,
    
    
} from '../services/postService'


import AwnserCard from './AwnserCard'
export default {
    components: {
        AwnserCard
    }, 
    name: 'CommentCard',
    data() {
        return {
           newComment: "",
           commentAwnser: "",
           isLiked: this.comment.isLiked,
           isDisliked: this.comment.isDisliked,
           apiUrl: apiUrl
        }
    },
    props: {
       comment: {
           showResponses: false,  
            showAwnserInp: false  
       }
    },
    methods: {
        
    async likeComment(comment_id) {
      try {
          const data = await likeComment("COMMENT", comment_id, this.$route.params.id)
      
          console.log('allvok: ', data)
          
          if(this.isLiked == true) {
              this.isLiked = false
          } else {
              this.isLiked = true
          }
      } catch(e) {
          this.error = "Internal Server Error"
      }
    },
    
    async dislikeComment(comment_id) {
        try {
            const data = await dislikeComment("COMMENT", comment_id, this.$route.params.id)
            console.log('all ok: ', data)
            if(this.isDisliked == true) {
              this.isDisliked = false
          } else {
              this.isDisliked = true
          }
        } catch(e) {
            this.error = "Internal Server Error"
        }
    },
    
    async awnserToAComment(comment_id) {
        try {
            const data = await awnserToComment("POST", this.$route.params.id, comment_id, this.commentAwnser)
            console.log('al ok,', data)
        } catch(e) {
            this.error = "Internal Server Error"
        }
    },

    toggleResponses(index) {
    this.comment.showResponses = !this.comment.showResponses;
  },

  toggleShowAwnserInp(index) {
    this.comment.showAwnserInp = !this.comment.showAwnserInp;
  }

    },
    async created() {


  this.$socket.on('likeComment', like => {
          console.log('likeComment', like)
        
    if(like.comment_id === this.comment.id) {
    
        this.comment.comment_likes.push(like)
    } else {
        return
    }
})

this.$socket.on('unlikeComment', like => {
   console.log('unlikeComment', like)

    if(like.comment_id === this.comment.id) {
        this.comment.comment_likes = this.comment.comment_likes.filter(l => l.id !== like.id)
    }
})


this.$socket.on('dislikeComment', dislike => {
    console.log('dislikeComment', dislike)

    if(dislike.comment_id === this.comment.id) {
        this.comment.comment_dislikes.push(dislike)
    } 
})

this.$socket.on('undislikeComment', dislike => {
    console.log('undislikeComment', dislike)

    if(dislike.comment_id === this.comment.id) {
        this.comment.comment_dislikes = this.comment.comment_dislikes.filter(d => d.id !== dislike.id)
    }
})



    }
}
</script>

<style scoped>
.comment {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
}

.comment-user-details {
    display: flex;
    align-items: center;
    gap: 10px;
}

.comment-user-details img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.user-comment-username h4 {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
}

.user-comment p {
    font-size: 14px;
    margin-top: 10px;
}

.comment-interacts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 10px;
}

.comment-interacts div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    font-size: 14px;
}

.comment-awnser {
    display: grid;
    grid-template-columns: 50px 1fr 50px;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

.comment-awnser-input input {
    width: 100%;
    height: 35px;
    padding: 10px;
    border-radius: 10px;
    border: 0.3px solid gray;
}

.comment-awnser-send-button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.view-responses-button {
    font-size: 16px;
    color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin-top: 10px;
    cursor: pointer;
}

.comment-responses {
    padding-left: 20px;
    margin-top: 10px;
}

.response {
    padding: 10px;
    border-top: 1px solid #ccc;
}

</style>