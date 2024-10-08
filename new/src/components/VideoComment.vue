<template>
    <div class="comment">
                
              <div class="comment-user-details">
                  
                 
                <div @click="goToPage('/user/' + comment.video_comment_user.id)" class="user-comment-img"> 
                  <img style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;" :src="comment.video_comment_user.profilePicture || '/images/default.jpeg'" alt="User Picture">
                </div>
                <div class="user-comment-username">
                  <h4>{{comment.video_comment_user.username}}</h4>
                </div>
              </div>
              
              
              <div class="user-comment">
                <p>{{comment.comment_content}}</p>
              </div>
              
              
              <div class="comment-interacts">
                <div @click="likeAComment(comment.id)" class="like">
                  <font-awesome-icon icon="thumbs-up"
                  :style="{color: isLiked ? 'blue' : ''}"
                  />
                  <p
                 :style="{color: isLiked ? 'blue' : ''}"
                  >{{comment.comment_likes.length}}</p>
                </div>
                <div @click="toggleAwnserInp(index)" class="awnser">
                  <font-awesome-icon icon="share"/>
                  <p>{{comment.awnsers.length}}</p>
                </div>
                <div @click="dislikeAComment(comment.id)" class="dislike">
                  <font-awesome-icon icon="thumbs-down"
                 :style="{color: isDisliked ? 'blue' : ''}"
                  />
                  <p
                  :style="{color: isDisliked ? 'blue' : ''}"
                  >{{comment.comment_dislikes.length}}</p>
                </div>
              </div>
              
              <div v-show="comment.showAwnserInp" class="comment-awnser-input">
                  
                  <div class="comment-awnser-input-userImg">
                      <img style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" :src="user.user_picture || '/images/default.jpeg'">
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
                    
                  <VideoCommentAwnser :awnser="awnser"/>
                  
                </div> <!-- <-- END OF AWNSERS FOR -->
                
                
              </div>
              
              
            </div> <!-- END OF COMMENT DIC -->
</template>

<script>
import { 
    likeVideoComment,
    dislikeVideoComment,
    awnserToVideoComment
} from '../services/videoService'
import VideoCommentAwnser from './VideoCommentAwnser'
import { mapGetters, mapActions } from 'vuex'


    export default {
        components: {
            VideoCommentAwnser
        },
        name: 'VideoComment',
        props: {
            comment: {}
        },
        data() {
            return {
                error: "",
                comment_awnser: "",
                isLiked: this.comment.isLiked,
                isDisliked: this.comment.isDisliked
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            async likeAComment(comment_id) {
                try {
                    const data = await likeVideoComment(comment_id, this.$route.params.video_id, "VIDEO_COMMENT")
                    console.log('Video Comment Liked: ', data)
                    if(!this.isLiked) {
                        this.isLiked = true
                    } else {
                        this.isLiked = false
                    }
                 } catch(e) {
                    this.error = "Internal Server Error"
                    console.error('ERROR!', e)
                }
            },
            async dislikeAComment(comment_id) {
                try {
                    const data = await dislikeVideoComment(comment_id, this.$route.params.video_id, "VIDEO_COMMENT")
                    console.log('Video Comment Liked: ', data)
                    if(!this.isDisliked) {
                        this.isDisliked = true
                    } else {
                        this.isDisliked = false
                    }
                } catch(e) {
                    this.error = "Internal Server Error"
                    console.error('ERROR!', e)
                }
            },
            async awnserToComment(comment_id) {
                const data = await awnserToVideoComment(comment_id, this.$route.params.video_id, this.comment_awnser, "VIDEO")
            }, 
            toggleAwnserInp(index) {
             this.comment.showAwnserInp = !this.comment.showAwnserInp;
            },
            toggleAwnsers(index) {
              this.comment.showAwnsers = !this.comment.showAwnsers
            },
            goToPage(route) {
                this.$router.push(route)
            }
        },
        async created() {
            this.$socket.on('likeVideoComment', newLike => {
                console.log('newLike', newLike)

                if(newLike.comment_id === this.comment.id) {
                    this.comment.comment_likes.push(newLike)
                } 
            })
            
            this.$socket.on('unlikedVideoComment', newLike => {
                console.log('newLike', newLike)

                if(newLike.comment_id === this.comment.id) {
                    this.comment.comment_likes =
                     this.comment.comment_likes.filter(like => like.id !== newLike.id)
                } 
            })

             this.$socket.on('dislikeVideoComment', newDislike => {
                console.log('newDislike', newDislike)

                if(newDislike.comment_id === this.comment.id) {
                    this.comment.comment_dislikes.push(newDislike)
                } 
            })
            
            this.$socket.on('undislikedVideoComment', newDislike => {
                console.log('newDislike', newDislike)

                if(newDislike.comment_id === this.comment.id) {
                    this.comment.comment_dislikes = 
                    this.comment.comment_dislikes.filter(dislike => dislike.id !== newDislike.id)
                } 
            })


 





        }
    }
</script>

<style scoped>
    .comment {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.comment-user-details {
    display: flex;
    align-items: center;
    gap: 10px;
}

.user-comment-img img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}

.user-comment-username h4 {
    font-size: 18px;
    font-weight: 700;
}

.user-comment {
    display: flex;
    flex-wrap: wrap;
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

.comment-awnser-input-userImg img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.comment-awnser-input-inp input {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: .1px solid black;
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

.comment-responses {
    padding-left: 20px;
}

.comment-responses .response {
    padding: 10px;
}
</style>