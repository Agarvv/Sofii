<template>
   <div class="upload-comment">
            <div class="user-picture">
              <img :src="`http://localhost:3000/${usuario.user_picture}`" alt="User Picture">
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
import userMixin from '../mixins/userMixin'
import { postComment } from '../services/postService'

export default {
    mixins: [userMixin],
    name: 'UploadComment',
    data() {
        return {
           comment: ""
        }
    },
    props: {
      type: String,
      id: Number
    },
    methods: {
      async postAComment() {
        const data = await postComment(this.id, this.type, this.comment)
      }
    }
}
</script>

<style scoped>
.upload-comment {
    display: grid;
    grid-template-columns: 1fr 9fr 1fr;
    grid-gap: 10px;
    padding: 10px;
    background: white;
    border-bottom: 1px solid #ccc;
    position: sticky;
    top: 0;
    z-index: 1;
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
