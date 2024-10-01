<template>
    <div class="awnser">
        <div class="response-user">
                    <div class="response-user-img">
                      <img style="width: 40px; height: 40px; border-radius: 50%"
                       :src="awnser.awnser_user.profilePicture ? 
                       apiUrl + '/' + awnser.awnser_user.profilePicture : 
                       '/images/default.jpeg'
                       ">
                    </div>
                    <div class="response-username">
                      <h3>{{awnser.awnser_user.username}}</h3>
                    </div>
                  </div>
                  
                  <div class="response-content">
                    <p>{{awnser.answer_content}}</p>
                  </div>
                  
                  <div class="comment-response-interact">
                    <div @click="likeCommentAwnser(awnser.id, awnser.comment_id, awnser.post_id)" class="like">
                      <font-awesome-icon icon="thumbs-up"
                       :style="{color: isLiked ? 'blue' : ''}"
                      />
                      <span
                         :style="{color: isLiked ? 'blue' : ''}"
                       >{{awnser.awnser_likes.length}}</span>
                    </div> 
                    <div @click="dislikeCommentAwnser(awnser.id, awnser.comment_id, awnser.post_id)" class="dislike">
                      <font-awesome-icon icon="thumbs-down"
                       :style="{color: isDisliked ? 'blue' : ''}"
                      />
                      <span
                      :style="{color: isDisliked ? 'blue' : ''}"
                      >{{awnser.awnser_dislikes.length}}</span>
                    </div>
                  </div>
    </div>
</template>

<script>
import {
    likeCommentAwnser,
    dislikeCommentAwnser
} from '../services/postService'
import apiUrl from '../config'

export default {
    name: 'AwnserCard',
    props: {
        awnser: {},
    },
    data() {
        return {
            error: "",
            isLiked: this.awnser.isLiked,
            isDisliked: this.awnser.isDisliked,
            apiUrl: apiUrl
        }
    },
    methods: {
            
        async likeCommentAwnser(awnser_id, comment_id, post_id) {
            
            try {
                const data = await likeCommentAwnser("COMMENT_AWNSER", comment_id, awnser_id, post_id)
                console.log('all olv : ', data)
                if(this.isLiked == true) {
                    this.isLiked = false
                } else {
                    this.isLiked = true
                }
            } catch(e) {
                this.error = "Internal Server Error"
            }
        },
        
        async dislikeCommentAwnser(awnser_id, comment_id, post_id) {
       
            try {
                const data = await dislikeCommentAwnser("COMMENT_AWNSER", comment_id, awnser_id, post_id)
                console.log('all ok: ', data)
                if(this.isDisliked== true) {
                    this.isDisliked = false
                } else {
                    this.isDisliked = true
                }
            } catch(e) {
                this.error = "Internal Server Error"
            }
        }
    },
    async created() {
        
        
    }
}
</script>

<style scoped>
.awnser {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
}

.response-user {
    display: flex;
    align-items: center;
    gap: 10px;
}

.response-user-img img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.response-username h3 {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
}

.response-content p {
    margin: 10px 0;
    font-size: 14px;
}

.comment-response-interact {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}

.comment-response-interact div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 5px;
    cursor: pointer;
}

.like, .dislike {
    font-size: 14px;
}
</style>