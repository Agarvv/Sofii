<template> 
 <div class="wrapper">
  <div class="container"> 
  <LoadingComponent v-if="loading"/>
  <ErrorComponent v-if="error" :error="error"/> 
 <VideoCard :video="video"/>
    <UploadComment type="VIDEO" :id="$route.params.video_id"/> 
     <div class="comments">
          <div class="comment-section">
            <div v-for="(comment, index) in video.video_comments" class="comment">
             <VideoComment :comment="comment"/>
            </div> 
          </div>
        </div>
    </div>
  </div> 
</template>

<script>
// video vard
import VideoCard from './VideoCard.vue';
import VideoComment from './VideoComment'
import UploadComment from './UploadComment'
import ErrorComponent from './ErrorComponent'
import LoadingComponent from './LoadingComponent'
import { mapGetters, mapActions } from 'vuex';
import { getVideo } from '../services/videoService'

    export default {
        name: 'SingleVideoPage',
        components: {
            VideoCard,
            VideoComment,
            UploadComment,
            LoadingComponent,
            ErrorComponent
        },
        data() {
            return {
                video: {},
                comment: "",
                comment_awnser: "",
                commentsById: {},
                awnsersById: {},
                error: "",
                loading: true
            }
        },
        computed: {
            ...mapGetters(['user'])
        },
        methods: {
            
            ...mapActions(['fetchUser']),
            
            async getVideo(user, id) {
                try {
                    console.log('id', id)
                    const data = await getVideo(id,user)
                    this.video = data.video
                    console.log("All went ok: ",  this.video)
                    video.video_comments.forEach((comment) => {
                        this.commentsById[comment.id] = comment;
                        comment.awnsers.forEach((awnser) => {
                            this.awnsersById[awnser.id] = awnser;
                        })
                    })

                    console.log('final cbid', this.commentsById)
                    console.log('final cbawnser', this.awnsersById)
                } catch(e) {
                    console.log('Something went wrtonv', e)
                    this.error = "Something Went Wrong..."
                } finally {
                    this.loading = false
                }
            }
            
        },
        async created() {
            console.log("Route param", this.$route.params.video_id)
            await this.fetchUser()
            if(this.user) {
                await this.getVideo(this.user, this.$route.params.video_id)
            }

              this.$socket.on('videoLiked', newLike => {
                  console.log('new like: ', newLike)
                  if(newLike.video_id === this.video.id) {
                    this.video.video_likes.push(newLike)
                  }
            })

             this.$socket.on('unlikeVideo', like => {
               console.log('Like to remove:', like); 
                
                 if (like.video_id === this.video.id) {
                        console.log('Current likes:', videoTarget.video_likes); 
                         this.video.video_likes = this.video.video_likes.filter(
                            l => l.user_id !== like.user_id);
                        console.log('Updated likes:', videoTarget.video_likes);
                }
           });

            this.$socket.on('savedVideo', saved => {
           console.log('saved received', saved)
        
        if(saved.video_id == this.video.id) {
            this.video.videos_saved.push(saved)
        }
    })
    
    this.$socket.on('unsavedVideo', saved => {
    console.log('saved received', saved)
    
    if (saved.video_id == this.video.id) {
        this.video.videos_saved = this.video.videos_saved.filter(s => s.id !== saved.id);
    }
});
    
            
            this.$socket.on('likeVideoComment', newLike => {
                const commentTarget = this.commentsById[newLike.comment_id]
                if(commentTarget) {
                    commentTarget.comment_likes.push(newLike)
                } else {
                    alert('not found lvc')
                }
            })
            
            this.$socket.on('unlikedVideoComment', newLike => {
          
                const commentTarget = this.commentsById[newLike.comment_id]
                if(commentTarget) {
                    commentTarget.comment_likes = commentTarget.comment_likes.filter(like => like.id !== newLike.id)
                } else {
                    alert('not found uvc')
                }
            })
            
            this.$socket.on('likeVideoCommentAnswer', newLike => {
                const awnserTarget = this.awnsersById[newLike.awnser_id]
                if(awnserTarget) {
                    awnserTarget.awnser_likes.push(newLike)
                } else {
                    alert('not found lvca')
                }
            })
            
            this.$socket.on('unlikedVideoCommentAwnser', newLike => {
                
                const awnserTarget = this.awnsersById[newLike.awnser_id]
                if(awnserTarget) {
                    awnserTarget.awnser_likes = awnserTarget.awnser_likes.filter(like => like.id !== newLike.id)
                } else {
                    alert('not found uvca')
                }
            })
            
            this.$socket.on('dislikeVideoComment', newDislike => {
                const commentTarget = this.commentsById[newDislike.comment_id]
                if(commentTarget) {
                    commentTarget.comment_dislikes.push(newDislike)
                } else {
                    alert('dvc not found')
                }
            })
            
            this.$socket.on('undislikedVideoComment', newDislike => {
                const commentTarget = this.commentsById[newDislike.comment_id]
                if(commentTarget) {
                    commentTarget.comment_dislikes = commentTarget.comment_dislikes.filter(dislike => dislike.id !== newDislike.id)
                } else {
                    alert('uvc not found')
                }
            })
            
            this.$socket.on('dislikeVideoCommentAwnser', newDislike => {
                const awnserTarget = this.awnsersById[newDislike.awnser_id]
                if(awnserTarget) {
                    awnserTarget.awnser_dislikes.push(newDislike)
                } else {
                    alert('dvca not found')
                }
            })
            
            this.$socket.on('undislikedVideoCommentAwnser', newDislike => {
                const awnserTarget = this.awnsersById[newDislike.awnser_id]
                if(awnserTarget) {
                    awnserTarget.awnser_dislikes = awnserTarget.awnser_dislikes.filter(dislike => dislike.id !== newDislike.id)
                } else {
                    alert('uvca not found')
                }
            })
            
            this.$socket.on('newVideoComment', newComment => {
                this.video.video_comments.push(newComment)
                this.commentsById[newComment.id] = newComment
            })
            
            this.$socket.on('newVideoCommentAwnser', newAwnser => {
                const commentTarget = this.commentsById[newAwnser.comment_id]
                if(commentTarget) {
                    commentTarget.awnsers.push(newAwnser)
                    this.awnsersById[newAwnser.id] = newAwnser
                } else {
                    alert('nvca failed')
                }
            })
        }
    }
</script>

<style scoped>
.wrapper {
    width: 100%;
    height: 100vh;
}

.comments {
    position: relative;
}

.upload-comment {
    display: grid;
    grid-template-columns: .1fr 1fr .1fr;
    grid-gap: 10px;
    padding: 10px;
    background: white;
    border-bottom: 1px solid #ccc;
}

.upload-comment div {
    display: flex;
    align-items: center;
    justify-content: center;
}

.post .send-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.upload-comment .user-picture img {
    width: 40px;
    border-radius: 50%;
}

.upload-comment input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
}

.comment-section {
    background: white;
    color: black;
    margin-top: 20px;
    width: 100%;
    height: 100vh;
}

.response-user-img img {
    width: 30px;
    height: 30px;
    object-fit: cover;
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
</style> <!-- 523 -->