<template>
   <div class="upload-comment">
       
            <div class="user-picture">
              <img src="user.user_picture || '/images/default.jpeg'" alt="">
            </div>
            
            <div class="input">
              <input v-model="comment" type="text" placeholder="Upload A Comment">
            </div>
            <div @click="postAComment()" class="send-button">
              <font-awesome-icon icon="paper-plane"/>
            </div>
   </div>
</template>

<script>
import { postComment } from '../services/postService'
import {
    uploadVideoComment
} from '../services/videoService'
import { mapGetters } from 'vuex';

export default {
    name: 'UploadComment',
    data() {
        return {
           comment: ""
        }
    },
    props: {
        // VIDEO OR POST
      type: String,
      id: Number,
      user: {}
    },
    methods: {
      async postAComment() {
          let data;
          switch(this.type) {
              
              
              case "POST":
                  data = await postComment(this.id, this.type, this.comment)
                  console.log('akdk: ', data)
                  break;
              case "VIDEO":
                  data = await uploadVideoComment("VIDEO", this.id, this.comment)
                  console.log('data drom metjod', data)
                  break;
              default:
                  return
          }
      }
    }
}
</script>

<style scoped>
.upload-comment {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 9fr 1fr;
    grid-gap: 15px;
    padding: 10px;
    background: white;
    border-bottom: 1px solid #ccc;
    position: sticky;
    top: 0;
    z-index: 1;
}

.upload-comment div {
   
    display: flex;
    align-items: center;
    
}

.post .send-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
}

.upload-comment .user-picture img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.upload-comment input {
    width: 100%;
    height: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
}
</style>
