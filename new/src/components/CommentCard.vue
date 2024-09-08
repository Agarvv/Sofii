<template>
       <div  class="comment">
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
</template>

<script>
import userMixin from '../mixins/userMixin'
export default {
    mixins: [userMixin],
    name: 'CommentCard',
    data() {
        return {

        }
    },
    props: {
       comment: {}
    },
    methods: {
    toggleResponses(index) {
      this.post.postComments[index].showResponses = !this.post.postComments[index].showResponses;
    },

    toggleShowAwnserInp(index) {
      this.post.postComments[index].showAwnserInp = !this.post.postComments[index].showAwnserInp;
    }


    }
}
</script>

<style scoped>

</style>