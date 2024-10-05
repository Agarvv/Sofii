<template>
<header>
    <h1>Saved Page</h1>
</header>

<LoadingComponent v-if="loading" message="Getting Your Saved Content... Please Wait"/>

<ErrorComponent v-if="error" :error="error"/> 

<div class="wrapper"> 
    <div class="container">
        <h4 style="font-size: 25px">Saved</h4>
        <div  class="container-header">
            <div @click="toggleContentToShow('posts')" class="posts-s">
                <h4>Posts</h4>
                <i class="fa fa-image"></i>
            </div>

            <div @click="toggleContentToShow('videos')" class="videos-s">
                <h4>Videos</h4>
                <i class="fa fa-camera"></i>
            </div>
        </div>
        <div class="saved">
            <div v-if="contentToDisplay == 'posts'"  class="saved-posts">
                            <div class="content_length_zero" v-if="posts.length == 0">
                    <p>You Do Not Have Posts Saved, <a href="/">Go And Explore !</a></p>
                </div>
                <div v-for="post in posts" key="post.saved_post.id" class="post">
                    <PostCard :post="post"/> 
                </div>
            </div>
                <div v-if="contentToDisplay == 'videos'"  class="saved-videos">
                                  <div class="content_length_zero" v-if="videos.length == 0">
                    <p>You Do Not Have Videos Saved, <a href="/watch">Go And Explore !</a></p>
                </div>
                
                <div v-for="video in videos" :key="video.video_id" class="post">
                    <VideoCard :video="video"/> 
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import PostCard from './PostCard'
import VideoCard from './VideoCard'
import ErrorComponent from './ErrorComponent'
import LoadingComponent from'./LoadingComponent'
import { getUserSaveds } from '../services/usersService'
import { mapGetters, mapActions } from 'vuex';



export default {
    components: {
        PostCard,
        VideoCard,
        ErrorComponent,
        LoadingComponent
    }, 
    name: 'SavedPage',
    data() {
    return {
        posts: [
            
        ],
        videos: [
        
        ],
        contentToDisplay: 'posts',
        error: "",
        loading: true
    };
},
computed: {
    ...mapGetters(['user'])
},
    methods: {
        ...mapActions(['fetchUser']),
        
        toggleContentToShow(type) {
            this.contentToDisplay = type
        },
        async serveSavedPage() {
            try {
                const data = await getUserSaveds(this.user)
                this.posts = data.saved.savedPosts
                this.videos = data.saved.savedVideos
            } catch(e) {
                console.log("ERROR", e)
                this.error = "Something Went Wrong..."
            } finally {
                this.loading = false 
            }
        }
    },
    async created() {
        await this.fetchUser()
        await this.serveSavedPage()
    }
};
</script>

<style scoped>
    *{
  padding: 0;
  margin: 0;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
}

header {
    text-align: center;
    padding: 20px;
    background-color: #007bff;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.container {
    width: 80%;
    max-width: 600px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.container-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.container-header div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  gap: 10px;
}

.container-header h4 {
    margin: 0;
    font-size: 18px;
}

.container-header i {
    font-size: 20px;
    color: #007bff;
}

.content_length_zero {
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: gray;
}



@media(max-width: 600px) {
    .container {
        width: 100%;
    }
}
</style>